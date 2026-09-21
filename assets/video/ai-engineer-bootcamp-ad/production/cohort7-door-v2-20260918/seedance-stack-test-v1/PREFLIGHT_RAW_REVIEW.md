# Seedance native-request serialization-repair preflight review

Decision: PASS
Reviewed at: 2026-09-18T05:49:03.666478+00:00
No task submitted by reviewer: yes
Package fingerprint: sha256:b4962f75bb382d9e74b1cd83bdeb4733fce273fb604dfc568ba4068c7f1f83cf

## Blockers

- None. The former billing blocker is cleared by inspected `price-refreshed.json`: model `doubao-seedance-2-5`, `IsOverdue=false`, `State=Available`, base subservice Available. The price remains 0.077 CNY per 1000 NV2V1080Completion tokens; total estimate remains unavailable.
- Prompt and both image SHA-256 hashes match the independent prior visual review; roles, endpoint, model, motion timing and parameters are unchanged. Fingerprint was regenerated after the account-evidence update. All prior creative/provider checks were re-evaluated against the unchanged exact request and still pass for one abstract sculpture experiment.

## Exact task

- Endpoint / resolved model: `ep-20260812221158-hb576` / `doubao-seedance-2-5-260628`.
- Mode: first/last-frame image-to-video; abstract engineered sculpture, not a literal property walkthrough.
- Task count / output count: 1 / 1. No retries or full ten-layer production authorized by this package.
- Parameters: duration 8 seconds; adaptive ratio; 1080p; generate_audio true; watermark false. Seed omitted, provider default/random applies.
- Output directory: `/Users/lightman/Documents/sites/jr-academy-ai/jr-academy-brand/assets/video/ai-engineer-bootcamp-ad/production/cohort7-door-v2-20260918/seedance-stack-test-v1/generated`.
- Version: seedance-stack-test-v1.
- Exact local previews: [first frame](first.png), [last frame](last-three.png). No generated/reference video exists for this image-to-video test.

## Inputs and roles

| Input | Role | Provenance | Same-scene result | SHA-256 |
|---|---|---|---|---|
| first.png | first_frame | Parent records standalone generated keyframe from approved concept | Synthetic concept, no fixed-scene provenance claim | 370c111002a12f888862a8d78c19b3bdcf162f912251a555b7f087e4d34f5a5d |
| last-three.png | last_frame | Parent records generation from first frame | Same design motifs; generative continuity is best effort | 42426974f0fb9ce62231ddf49808b3b5d2ea7d4bdbf8ec7cc71af11d57c0086c |

Both images inspected directly at 1672 × 941. HTTPS provider URLs now replace inline image transport. Both exact URLs were fetched independently with HTTP 200; downloaded bytes match locked local SHA-256 hashes. The fingerprint binds the URLs as well as image bytes.

- first_frame: https://jr-image.s3.ap-southeast-2.amazonaws.com/video-publishing/ai-engineer-cohort7/2026-09-18-stack-test-inputs/first.png
- last_frame: https://jr-image.s3.ap-southeast-2.amazonaws.com/video-publishing/ai-engineer-cohort7/2026-09-18-stack-test-inputs/last-three.png

## Video review evidence

- Normal/reverse playback and video checkpoints: not applicable; no input video.
- Route/floor-plan/doorway checkpoints: not applicable; abstract sculpture and simple camera rise/backward movement, no room traversal or spatial sales claim.
- Persistent landmarks inspected: front rounded module corner, warm left-side sun, metallic circular base, centre couplings, surrounding tall glass towers and curved side structures.

## Cross-input consistency

| Feature | First frame | Last frame | Result |
|---|---|---|---|
| Subject/count | One coral/orange module hovering above base | Exactly three separated modules: orange, rose, purple | Fits one-to-three test; base is excluded |
| Camera pose | Low frontal corner close-up | Wider frontal corner view | Consistent with backward camera movement; rise is a requested interpolation, not proven by stills |
| Time/light | Warm sunlight left | Warm sunlight left | Consistent |
| Material | Translucent orange glass, silver metal rim | Same family, upper tiers rose/purple | Consistent |
| Base/fixtures | Circular metal base and central coupling | Circular base and central couplings | Consistent motifs; fine fixture geometry differs between generated stills |
| Scale | Large module fills most width | Modules narrower in frame | Plausible pull-back; exact rigid dimensions cannot be proven from images |
| Background | Towers, curved architecture | Similar motifs; some tower layout differs | Acceptable only as acknowledged abstract concept test; not same-scene geometric proof |
| Doors/windows/furniture | No traversed room or furniture | No traversed room or furniture | Not applicable |

Creative consistency review passes for this limited experiment. It does not certify immutable geometry or generated motion. The final frame shows central connections with air gaps, so the first seating action should connect at the central interface rather than flatten the whole platform onto the base.

## Prompt review

- Exact prompt: [PROMPT.txt](PROMPT.txt), SHA-256 `265041d49b73063b4833c2ed645891776c61b4ca3b10c99561ffda47fbe68932`.
- First/last-frame roles are explicit, with no invented material-only reference semantics.
- Action ledger: 0–1.5 s first seating; 1.5–3.5 s second arrival; 3.5–5.5 s third arrival; 5.5–8 s settle/hold. Total is exactly 8 s and is plausible at normal speed for this abstract mechanism.
- New upper modules can enter from above; central couplings and independent platforms appear in the endpoint. No impossible threshold traversal requested.
- Camera instruction requests actual rise and retreat plus changing reflections/parallax, not image crop animation. Exact motion remains to be verified on generated output.
- Three-module endpoint agrees with prompt and DESIGN.md. No ten-layer claim or four-layer miscount.
- Audio is mechanical/air SFX only, no music or speech. Existing governed ElevenLabs narration is a later mix, not supplied to Seedance here.
- Native images are approximately 16:9; actual API ratio remains required `adaptive`. Prompt 16:9 describes composition, not a separate parameter override.

## Provider and price evidence

- Parent live metadata: endpoint Running/invocable, paygo, resolved model above; duration 4–30 seconds, 1080p, adaptive first/last ratio, audio true and watermark false supported.
- Official website documentation fetch failed HTTP 500 according to parent; current CLI metadata is the available source. Reviewer did not repeat provider network calls.
- Inspected `dry-run-https.json`: client_preview, dry_run true, network blocked, fidelity partial. Endpoint, prompt, references and parameters match package. Runtime role/asset materialization and credentials/routing remain outside dry-run validation; this is construction evidence, not server acceptance.
- Price: 0.077 CNY / 1000 NV2V1080Completion tokens, parent live query 2026-09-18. Total estimate unavailable. Do not claim a fixed total.
- Failure billing policy: unavailable. No submission or failure was produced by this review.

## Approval gate

The parent records prior user authorization for clean standalone frames and one first-layer seating/stacking test. A new permission question is not required merely to repeat that scope. The user subsequently reported charging the account and explicitly asked to resume. That existing authorization covers this unchanged one-task scope; no repeated approval question is required. This technical PASS is not new authorization and grants no retry permission. No task was submitted by this reviewer.

Exact package reference phrase for any separate approval record: “批准 seedance-stack-test-v1 HTTPS 传输修复，一次 8 秒测试，fingerprint b4962f75bb382d9e74b1cd83bdeb4733fce273fb604dfc568ba4068c7f1f83cf。” This is a reference phrase only, not a new user request. Any later input, prompt, role, endpoint, model, parameter, count or price-basis change invalidates this PASS and requires re-fingerprinting and review before create.

## Transport recovery evidence

- Exact reviewed manifest: `package-https.json`. Only provider delivery changes to HTTPS; prompt, image bytes, roles, endpoint/model, parameters, one task/one output and pricing are unchanged from the creative review.
- Parent reports the inline POST stalled for over ten minutes with a non-draining TCP send queue, then was interrupted with SIGINT and exited 1. Reviewer inspected zero-byte `submission.json` and `submission.stderr`; neither contains a task ID or returned usage. Empty output alone was not treated as proof.
- Reviewer inspected `task-list-reconcile.json`, `task-list-reconcile-2.json`, and `task-list-after-interrupt.json`: each has total 1 and only the pre-existing succeeded task `cgt-20260918100043-15arm`. That historical task has usage; it is not attributed to this interrupted create. No new task or returned usage for the stack test is evidenced.
- Reviewer process inspection found no running arkcli create process or the stack-test submit.py process.
- Reviewer independently fetched first.png (1,821,556 bytes) and last-three.png (2,024,017 bytes) from the exact provider URLs. Both returned HTTP 200 and matched the earlier image hashes.
- HTTPS dry-run text exactly matches PROMPT.txt; reference URL order/roles, endpoint and every requested parameter match the manifest. Dry-run remains partial client construction evidence, not server acceptance.
- Decision: PASS for transport recovery of the same previously authorized logical task. This is not authorization for a second generated output, model retry, or expanded production. Existing user approval and resume instruction remain applicable; no repeated approval question is needed. No task was submitted by this reviewer.

## Native serialization repair review

- Decision: PASS for the exact `raw-request.json` under the same authorized single logical test; no change to creative scope, output count, input bytes/URLs, roles, endpoint, model or parameters.
- Inspected `submission-https.stderr`: deterministic parameter validation error, invalid image format at content[0], request ID `02178971059496791b94d62e219899eaebadcce7b395a23dd2cdf`. `submission-https.json` is empty and has no returned task ID or usage. The error does not by itself prove product-CLI serialization is the root cause; this repair makes the native content structure explicit.
- Fresh `task-list-after-validation.json` has total 1 and only the historical task `cgt-20260918100043-15arm`. No new task was created according to this read-back. Current local process inspection found no running create process. No returned usage exists for this validation rejection; an explicit billing receipt of zero is not available and is not claimed.
- Exact parsed-object comparison passed: raw request equals endpoint plus the original prompt text, first_frame/last_frame image_url objects with the locked HTTPS URLs, and all five parameters. No unexpected fields or omitted parameters. Raw dry-run contains exactly one registered `arkruntime.create_content_generation_task` action and its payload equals raw-request.json exactly; network is blocked, fidelity logical.
- Official bundled CLI reference `/Users/lightman/.agents/skills/arkcli-gen/references/arkcli-gen.md` line 247 explicitly documents this registered raw API route for low-level diagnosis and controlled submission/polling; line 152 documents explicit first_frame/last_frame roles. Native image_url structure matches that documented route.
- The original visual, motion, pricing and HTTPS byte-readback review still applies. This report supplements it by binding the exact serialized request and dry-run in `PREFLIGHT_RAW_FINGERPRINT.json`.
- No task has been submitted by this reviewer. Prior authorization covers the same logical test after this pre-creation validation repair; no new approval question or extra output is authorized. Any further rejection must be reconciled and reviewed rather than automatically retried.

Exact raw request SHA-256: `b638897150700115a76b6fc4830a064fc3e6dd42e40b2e6b038626d03ec8a07a`.
