#!/usr/bin/env python3
"""Generate the JR homepage Seedance chain from a local first frame.

Credentials stay outside the repository. The generator accepts the existing
Huoshan credential text file, uses its Ark endpoint, and stores only sanitized
request/result metadata.
"""

from __future__ import annotations

import argparse
import base64
import json
import mimetypes
import re
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
DEFAULT_ENDPOINT_ID = "ep-20260722120442-whqf6"
PROJECT_NAME = "default"
POLL_INTERVAL_SECONDS = 15


def read_credentials(path: Path) -> tuple[str, str]:
    fields: dict[str, str] = {}
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#"):
            continue
        match = re.match(r"^([^:=：]+)\s*[:=：]\s*(.*)$", line)
        if match:
            key, value = match.groups()
            fields[key.strip()] = value.strip().strip("[]").strip()

    return fields["AccessKeyId"], fields["SecretAccessKey"]


def temporary_api_key(
    access_key: str, secret_key: str, endpoint_id: str
) -> str:
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
                    "ResourceIds": [endpoint_id],
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


def data_url(path: Path) -> str:
    mime_type = mimetypes.guess_type(path.name)[0] or "image/png"
    encoded = base64.b64encode(path.read_bytes()).decode("ascii")
    return f"data:{mime_type};base64,{encoded}"


def strip_query(url: str) -> str:
    parsed = urlsplit(url)
    return urlunsplit((parsed.scheme, parsed.netloc, parsed.path, "", ""))


def sanitized_payload(payload: dict[str, Any]) -> dict[str, Any]:
    clean = json.loads(json.dumps(payload))
    for item in clean["content"]:
        if item["type"] != "image_url":
            continue
        url = item["image_url"]["url"]
        item["image_url"]["url"] = (
            "<local-reference-image-redacted>"
            if url.startswith("data:")
            else strip_query(url)
        )
    return clean


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
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_bytes(response.content)


def create_and_wait(
    headers: dict[str, str],
    endpoint_id: str,
    shot: dict[str, Any],
    first_frame_url: str | None,
    last_frame_url: str | None,
    reference_image_urls: list[str],
) -> tuple[dict[str, Any], dict[str, Any]]:
    content: list[dict[str, Any]] = [{"type": "text", "text": str(shot["prompt"])}]
    if first_frame_url:
        content.append(
            {
                "type": "image_url",
                "image_url": {"url": first_frame_url},
                "role": "first_frame",
            }
        )
    content.extend(
        {
            "type": "image_url",
            "image_url": {"url": reference_image_url},
            "role": "reference_image",
        }
        for reference_image_url in reference_image_urls
    )
    if last_frame_url:
        content.append(
            {
                "type": "image_url",
                "image_url": {"url": last_frame_url},
                "role": "last_frame",
            }
        )
    payload = {
        "model": endpoint_id,
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
    first_frame: Path | None,
    start_at: int,
    stop_after: int | None,
    endpoint_id: str,
) -> None:
    access_key, secret_key = read_credentials(credentials_path)
    api_key = temporary_api_key(access_key, secret_key, endpoint_id)
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }
    shots = json.loads(prompts_path.read_text(encoding="utf-8"))
    output_dir.mkdir(parents=True, exist_ok=True)

    manifest_path = output_dir / "seedance-chain.json"
    manifest: list[dict[str, Any]] = []
    if manifest_path.exists():
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))

    selected = shots[start_at - 1 :]
    if stop_after is not None:
        selected = selected[:stop_after]

    if start_at == 1:
        current_first_frame_url = data_url(first_frame) if first_frame else None
    else:
        previous_id = shots[start_at - 2]["id"]
        previous_last_frame = output_dir / f"{previous_id}-last-frame.png"
        if not previous_last_frame.exists():
            raise RuntimeError(
                f"Missing previous last frame: {previous_last_frame}"
            )
        current_first_frame_url = data_url(previous_last_frame)

    for shot in selected:
        reference_image_urls: list[str] = []
        for reference_image in shot.get("reference_images", []):
            reference_path = Path(str(reference_image))
            if not reference_path.is_absolute():
                reference_path = prompts_path.parent / reference_path
            if not reference_path.exists():
                raise RuntimeError(
                    f"Missing reference image: {reference_path}"
                )
            reference_image_urls.append(data_url(reference_path))
        last_frame_url: str | None = None
        if shot.get("last_frame_image"):
            last_frame_path = Path(str(shot["last_frame_image"]))
            if not last_frame_path.is_absolute():
                last_frame_path = prompts_path.parent / last_frame_path
            if not last_frame_path.exists():
                raise RuntimeError(
                    f"Missing target last frame: {last_frame_path}"
                )
            if reference_image_urls:
                raise RuntimeError(
                    "A shot cannot mix last_frame_image with "
                    "reference_images"
                )
            last_frame_url = data_url(last_frame_path)
        payload, result = create_and_wait(
            headers,
            endpoint_id,
            shot,
            current_first_frame_url,
            last_frame_url,
            reference_image_urls,
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
            "request": sanitized_payload(payload),
            "result": sanitized_result(result),
        }
        manifest = [item for item in manifest if item["id"] != shot["id"]]
        manifest.append(record)
        manifest_path.write_text(
            json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        current_first_frame_url = result["content"]["last_frame_url"]
        print(f"{shot['id']}: downloaded {video_path}", flush=True)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--credentials", type=Path, required=True)
    parser.add_argument("--prompts", type=Path, required=True)
    parser.add_argument("--output-dir", type=Path, required=True)
    parser.add_argument("--first-frame", type=Path)
    parser.add_argument("--start-at", type=int, default=1)
    parser.add_argument("--stop-after", type=int)
    parser.add_argument("--endpoint-id", default=DEFAULT_ENDPOINT_ID)
    args = parser.parse_args()
    run(
        args.credentials,
        args.prompts,
        args.output_dir,
        args.first_frame,
        args.start_at,
        args.stop_after,
        args.endpoint_id,
    )


if __name__ == "__main__":
    main()
