#!/usr/bin/env python3
"""Generate a sequential Seedance video chain using each clip's real last frame."""

from __future__ import annotations

import argparse
import json
import os
import re
import shlex
import time
from pathlib import Path
from typing import Any
from urllib.parse import urlsplit, urlunsplit

import requests
from volcengine.ApiInfo import ApiInfo
from volcengine.Credentials import Credentials
from volcengine.ServiceInfo import ServiceInfo
from volcengine.base.Service import Service


ARK_BASE_URL = "https://ark.cn-beijing.volces.com/api/v3"
ENDPOINT_ID = "ep-20260722120442-whqf6"
PROJECT_NAME = "default"
POLL_INTERVAL_SECONDS = 15


def load_credentials(path: Path) -> None:
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#"):
            continue
        match = re.match(r"^([^:=：]+)\s*[:=：]\s*(.*)$", line)
        if not match:
            continue
        key, value = match.groups()
        parsed = shlex.split(value, comments=False, posix=True)
        os.environ[key.strip()] = parsed[0] if parsed else ""


def temporary_api_key(access_key: str, secret_key: str) -> str:
    service = Service(
        ServiceInfo(
            "open.volcengineapi.com",
            {"Accept": "application/json", "Content-Type": "application/json"},
            Credentials(access_key, secret_key, "ark", "cn-beijing"),
            10,
            30,
            scheme="https",
        ),
        {
            "GetApiKey": ApiInfo(
                "POST",
                "/",
                {"Action": "GetApiKey", "Version": "2024-01-01"},
                {},
                {},
            )
        },
    )
    response = json.loads(
        service.json(
            "GetApiKey",
            {},
            json.dumps(
                {
                    "DurationSeconds": 3600,
                    "ResourceType": "endpoint",
                    "ResourceIds": [ENDPOINT_ID],
                    "ProjectName": PROJECT_NAME,
                }
            ),
        )
    )
    if "Result" not in response:
        raise RuntimeError(
            "Unable to create a temporary Ark API key: "
            + json.dumps(response, ensure_ascii=False)
        )
    return response["Result"]["ApiKey"]


def strip_query(url: str) -> str:
    parsed = urlsplit(url)
    return urlunsplit((parsed.scheme, parsed.netloc, parsed.path, "", ""))


def sanitized_result(result: dict[str, Any]) -> dict[str, Any]:
    clean = json.loads(json.dumps(result))
    for key in ("video_url", "last_frame_url", "file_url"):
        value = clean.get("content", {}).get(key)
        if value:
            clean["content"][key] = strip_query(value)
    return clean


def download(url: str, destination: Path) -> None:
    response = requests.get(url, timeout=600)
    response.raise_for_status()
    destination.write_bytes(response.content)


def create_and_wait(
    headers: dict[str, str],
    shot: dict[str, Any],
    first_frame_url: str | None,
) -> tuple[dict[str, Any], dict[str, Any]]:
    content: list[dict[str, Any]] = [
        {"type": "text", "text": str(shot["prompt"])}
    ]
    if first_frame_url:
        content.append(
            {
                "type": "image_url",
                "image_url": {"url": first_frame_url},
                "role": "first_frame",
            }
        )

    payload = {
        "model": ENDPOINT_ID,
        "content": content,
        "resolution": "720p",
        "ratio": "16:9",
        "duration": int(shot["duration"]),
        "generate_audio": False,
        "watermark": False,
        "return_last_frame": True,
    }
    response = requests.post(
        f"{ARK_BASE_URL}/contents/generations/tasks",
        headers=headers,
        json=payload,
        timeout=180,
    )
    if not response.ok:
        raise RuntimeError(
            f"Seedance create failed ({response.status_code}): {response.text}"
        )
    task_id = response.json()["id"]
    print(f"{shot['id']}: submitted {task_id}", flush=True)

    while True:
        response = requests.get(
            f"{ARK_BASE_URL}/contents/generations/tasks/{task_id}",
            headers=headers,
            timeout=60,
        )
        response.raise_for_status()
        result = response.json()
        status = result["status"]
        print(f"{shot['id']}: {status}", flush=True)
        if status == "succeeded":
            return payload, result
        if status in {"failed", "cancelled"}:
            raise RuntimeError(
                json.dumps(result.get("error", result), ensure_ascii=False)
            )
        time.sleep(POLL_INTERVAL_SECONDS)


def run(
    credentials_path: Path,
    prompts_path: Path,
    output_dir: Path,
    start_at: int,
    stop_after: int | None,
    first_frame_url: str | None,
    previous_task_id: str | None,
) -> None:
    load_credentials(credentials_path)
    api_key = temporary_api_key(
        os.environ["AccessKeyId"], os.environ["SecretAccessKey"]
    )
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }
    shots = json.loads(prompts_path.read_text(encoding="utf-8"))
    output_dir.mkdir(parents=True, exist_ok=True)

    chain_manifest: list[dict[str, Any]] = []
    manifest_path = output_dir / "seedance-chain.json"
    if manifest_path.exists():
        chain_manifest = json.loads(manifest_path.read_text(encoding="utf-8"))

    selected = shots[start_at - 1 :]
    if stop_after is not None:
        selected = selected[:stop_after]

    current_first_frame_url = first_frame_url
    if previous_task_id:
        response = requests.get(
            f"{ARK_BASE_URL}/contents/generations/tasks/{previous_task_id}",
            headers=headers,
            timeout=60,
        )
        response.raise_for_status()
        previous_result = response.json()
        if previous_result["status"] != "succeeded":
            raise RuntimeError(
                f"Previous task is not succeeded: {previous_result['status']}"
            )
        current_first_frame_url = previous_result["content"]["last_frame_url"]
    for shot in selected:
        payload, result = create_and_wait(
            headers, shot, current_first_frame_url
        )
        video_path = output_dir / f"{shot['id']}.mp4"
        last_frame_path = output_dir / f"{shot['id']}-last-frame.png"
        download(result["content"]["video_url"], video_path)
        download(result["content"]["last_frame_url"], last_frame_path)

        record = {
            "id": shot["id"],
            "task_id": result["id"],
            "model": result.get("model"),
            "video": str(video_path),
            "last_frame": str(last_frame_path),
            "request": {
                **payload,
                "content": [
                    item
                    if item["type"] == "text"
                    else {
                        **item,
                        "image_url": {
                            "url": strip_query(item["image_url"]["url"])
                        },
                    }
                    for item in payload["content"]
                ],
            },
            "result": sanitized_result(result),
        }
        chain_manifest = [
            existing for existing in chain_manifest if existing["id"] != shot["id"]
        ]
        chain_manifest.append(record)
        manifest_path.write_text(
            json.dumps(chain_manifest, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        current_first_frame_url = result["content"]["last_frame_url"]
        print(f"{shot['id']}: downloaded {video_path}", flush=True)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--credentials", type=Path, required=True)
    parser.add_argument("--prompts", type=Path, required=True)
    parser.add_argument("--output-dir", type=Path, required=True)
    parser.add_argument("--start-at", type=int, default=1)
    parser.add_argument("--stop-after", type=int)
    parser.add_argument("--first-frame-url")
    parser.add_argument("--previous-task-id")
    args = parser.parse_args()
    run(
        args.credentials,
        args.prompts,
        args.output_dir,
        args.start_at,
        args.stop_after,
        args.first_frame_url,
        args.previous_task_id,
    )


if __name__ == "__main__":
    main()
