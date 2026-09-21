# Seedance preflight review

Decision: PASS  
Reviewed at: 2026-09-17T16:42:00+10:00  
No task submitted: yes  
Package fingerprint: sha256:14c2dcf7673827855783719ae7ae288a06fb890e31a4416cace4c3d0ce252adf

## Blockers

- None. The price basis is recorded as `unavailable` because the live catalog did not expose an unambiguous charge item for this text-to-video chain. This is disclosed for approval; no free quota is assumed.

## Exact task

- Endpoint / resolved model: `ep-20260722120442-whqf6` / `doubao-seedance-2-0-260128` (`doubao-seedance-2-0`, version `260128`)
- Mode: text-to-video generation for task 1, then sequential last-frame chaining for tasks 2–5
- Task count / output count: 5 / 5
- Parameters: 720p, 16:9, 8 seconds per task, `generate_audio=false`, `watermark=false`, `return_last_frame=true`; each successful last frame becomes the next task's first frame
- Output directory: `../raw/cohort-7-seedance`

## Inputs and roles

| Input | Role | Provenance | Same-scene result | SHA-256 |
|---|---|---|---|---|
| None for task 1 | No input | Text-only opening; no local image is uploaded | Task 1 establishes the visual world from the prompt; tasks 2–5 receive only the prior successful provider last frame at runtime | N/A |

## Video review evidence

- Normal-speed playback: Not applicable; this is a text-only chain before generation.
- Reverse playback: Not applicable; no reference video supplied.
- Whole-video checkpoints: Task 1 is a text-only opening; tasks 2–5 are chained from the preceding successful last frame returned by the provider.
- Dense turn/threshold checkpoints: Prompt ledger covers kiosk approach, rejection scans, locked-door reveal, corridor threshold, physical project-evidence handoff and final exit beat; final frame-level QA remains required after generation.
- Route overlay: Not applicable to a literal architectural walkthrough; the ad route is a staged employment-lobby-to-training-room narrative.
- Persistent-landmark audit: Graduate cream shirt/black backpack/olive folder; engineer charcoal jacket/cardboard box/old badge; cold blue lobby shifting to warm amber/coral training corridor.

## Cross-input consistency

| Feature | Reference video | Other input | Result |
|---|---|---|---|
| Character identity | None | Repeated text descriptions and chained last frames | Best-effort continuity; no reference image is uploaded |
| Wardrobe and props | None | Repeated text descriptions in every prompt | Cream shirt/black backpack/olive folder and charcoal jacket/cardboard box are persistent prompt anchors |
| Camera and aspect | None | Prompt camera directions and provider parameters | 16:9 landscape master is explicit |
| Environment and colour | None | Prompt continuity locks and chained last frames | Cold rainy lobby shifts to warm AI Engineer training space by story beat |
| Readable text and logos | None | Prompt negatives | No generated signage, captions or logos; compositing is deferred to post |

## Prompt review

- Supported role semantics only: yes; task 1 uses text only and tasks 2–5 use the provider-returned `first_frame` chain input.
- Route physically present: yes for the staged ad beats; text-only identity and continuity are best-effort and are not guaranteed by a reference image.
- Timing valid: yes; five 8-second tasks, with one primary motion/action beat per task and chained last-frame handoff.
- No instruction/input contradiction: yes; screen-led experiments are rejected, whole-room storyboard boards remain review references, and the active prompts use physical project evidence without competing spatial inputs.
- Factual source of truth: the user-approved Cohort 7 creative brief; no employment statistic or guaranteed-outcome claim is embedded in the generation prompts.

## Provider and price evidence

- Live endpoint resolution: `arkcli resources resolve ep-20260722120442-whqf6` resolved a running `doubao-seedance-2-0-260128` endpoint in `cn-beijing`; supported video inputs/outputs, 720p, 16:9, 4–15 second duration, audio toggle, watermark toggle and last-frame return.
- Non-billable dry-run: request construction was validated locally; no provider create-task call was made.
- Price or unavailable status: `unavailable`; `arkcli pricing models --model doubao-seedance-2-0` returned charge items but no unambiguous text-to-video chain mapping. The current free-quota lookup did not list `doubao-seedance-2-0`; no free generation is assumed.
- Failure billing status or unavailable: unavailable before submission; no task ID or usage receipt exists.

## Approval gate

No Seedance task may be created until the user approves this exact fingerprint.

Exact approval phrase: `批准提交 Seedance package fingerprint 14c2dcf7673827855783719ae7ae288a06fb890e31a4416cace4c3d0ce252adf（5 tasks，5 outputs，720p，16:9，8s，no audio，watermark false，纯文字首段）`
