# Seedance JPEG input-format repair preflight review

Decision: PASS
Reviewed at: 2026-09-18T05:59:08.801066+00:00
No task submitted by reviewer: yes
Package fingerprint: sha256:4d921e8332eea03e4db30d0b174b72d8c794bbdd157e802f2a61cae247568b73

## Blockers

None for this exact single-task input-format repair. Server acceptance is not yet verified and is not implied by PASS.

## Exact task

- Manifest: package-jpeg.json.
- Endpoint / model: ep-20260812221158-hb576 / doubao-seedance-2-5-260628.
- Mode: first_last_frame; 1 task, 1 output, one abstract-sculpture assembly experiment.
- Parameters: 8 seconds, adaptive ratio, 1080p output, generate_audio true, watermark false. Seed omitted/provider default.
- Output directory: /Users/lightman/Documents/sites/jr-academy-ai/jr-academy-brand/assets/video/ai-engineer-bootcamp-ad/production/cohort7-door-v2-20260918/seedance-stack-test-v1/generated.
- Prompt: PROMPT.txt, SHA-256 265041d49b73063b4833c2ed645891776c61b4ca3b10c99561ffda47fbe68932.
- Live model constraints and input roles remain as documented in the previous independent preflight: 4–30 seconds, 1080p and first/last adaptive supported; first_frame and last_frame are documented CLI roles; local images can be inlined. No physical-property route/floor-plan claim exists.

## Inputs and roles

| Preview | Role | Dimensions / bytes | SHA-256 |
|---|---|---|---|
| [first.jpg](first.jpg) | first_frame | 1280 × 720 / 187900 | eb83ee3be467152f56f792938b90d77d8d857bc30d669cdac403fa2217d45b52 |
| [last-three.jpg](last-three.jpg) | last_frame | 1280 × 720 / 217162 | 5c62117b9deafcc18f8f1dcab787f21bde8193e1e723abdb065524e28b1e8e08 |

Both files decode as JPEG/mjpeg. Parent converted the reviewed PNGs to standard JPEG, quality setting q3, and resized to 1280 × 720. These are new input bytes and are independently fingerprinted; the previous PNG fingerprint does not apply. No provider URLs are used by this request.

## Visual review and cross-input consistency

Both JPEGs were directly viewed after conversion. Their creative content agrees with the previously reviewed PNGs: one coral/orange module above the circular base in the first frame; exactly three orange/rose/purple modules with gaps and central connections in the last. No platform was added/lost, no text appears, and the base is excluded from the count.

| Feature | First | Last | Review |
|---|---|---|---|
| Identity/material | Orange glass module, silver rim | Same module family, rose/purple upper layers | Consistent |
| Camera | Frontal corner close-up, low angle | Wider frontal corner | Fits retreat; actual camera rise remains to be tested |
| Light/time | Warm sunlight from left | Warm sunlight from left | Consistent |
| Base/fixtures | Round mechanical base and central coupling | Same motifs | Fine details remain generative, not fixed-scene geometry |
| Background | Towers and curved structures | Same motifs, some layout differences | Accepted abstract concept test only |
| Doors/windows/furniture | No traversed interior | No traversed interior | Not applicable |

No playable input video exists. Normal/reverse playback, floor-plan overlays and threshold checkpoints are inapplicable to this image-only sculpture test. The final generated video still requires motion, layer-count and continuity QA.

## Prompt and timing review

The exact prompt is unchanged. Actions total 8 seconds: first seating 0–1.5, second module 1.5–3.5, third 3.5–5.5, settle/hold 5.5–8. Upper modules enter from above; central seating retains platform air gaps. Requested real camera rise/retreat and reflection/parallax are executable creative requests, not guaranteed by the keyframes. There is no room transition or property sales-view claim. Audio requests mechanical/air SFX only, no speech/music; later narration remains governed ElevenLabs audio.

## Exact dry-run verification

Parsed comparison passed for jpeg-dry-run.json against package-jpeg.json and PROMPT.txt: exact prompt text, endpoint, first:@ absolute first.jpg followed by last:@ absolute last-three.jpg, and all parameters. Original endpoint/model/mode/count/prompt/parameters/price equal the earlier package. Dry-run is client_preview, partial, network blocked; role materialization and routing happen during execution. This proves construction, not server decoding or acceptance.

## Rejected request and recovery reconciliation

- Inspected submission-raw.stderr: invalid image format at content[1], request ID 0217897108938808d3e4b01d6ad52cd92e5ce15c4762460da0220. The native request also failed, so product-CLI serialization is not established as the root cause. Provider URL fetching/decoding remains a hypothesis; JPEG inline repair removes both URL fetching and large PNG transport from this exact attempt.
- Inspected fresh task-list-after-raw.json: total 1, only historical succeeded cgt-20260918100043-15arm. No new generated task is present. Process inspection found no running create process. No returned task ID/usage exists for this rejected request. No explicit zero-billing receipt is available, and none is claimed.
- This is a reviewed input-format repair of the same authorized logical test, not an extra generated output or a retry of a failed generated video. Further rejection requires reconciliation and another review; no automatic retry authority is created.

## Price evidence

price-refreshed.json records IsOverdue=false, State=Available and base Available. Unit price 0.077 CNY per 1000 NV2V1080Completion tokens; total estimate unavailable. Official website documentation was unavailable during original preparation; current CLI metadata is the recorded provider source.

## Approval gate

Existing user approval for the one-test scope plus the subsequent resume request remain applicable. No repeated approval question is required for this pre-creation input-format correction. This PASS is a technical decision, not new user authorization. Exact package reference phrase: approve one 8-second seedance-stack-test-v1 JPEG test, fingerprint 4d921e8332eea03e4db30d0b174b72d8c794bbdd157e802f2a61cae247568b73.

Reviewer submitted no task. Any change to input bytes, prompt, roles, endpoint/model, parameters, counts or price basis invalidates this PASS.
