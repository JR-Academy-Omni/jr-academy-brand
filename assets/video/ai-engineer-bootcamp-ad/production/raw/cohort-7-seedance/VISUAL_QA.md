# AI Engineer Cohort 7 · Seedance text-only chain visual QA

Decision: BLOCKED_FOR_DELIVERY  
Reviewed at: 2026-09-17T16:28:00+10:00  
Package fingerprint: sha256:14c2dcf7673827855783719ae7ae288a06fb890e31a4416cace4c3d0ce252adf  
Task count / output count: 5 / 5  
Rough cut: `cohort-7-text-only-chain-rough-cut.mp4`  
No publication or video-registry registration: yes

## Technical checks

- All five provider tasks returned `succeeded` and have task IDs in `seedance-chain.json`.
- Each segment is H.264, 1280×720, 24 fps and approximately 8.04 seconds.
- The concatenated rough cut is 40.208 seconds and plays through without a decode error.
- Last-frame downloads exist for all five tasks and were used for runtime chaining.

## Visual findings

| Segment | Expected beat | Observed result | Gate |
|---|---|---|---|
| 01 | Two people enter the rainy employment lobby and approach the recruitment gates | The opening lobby and gate approach are present; the final frame is a gate close-up suitable for the next handoff | Pass for beat coverage |
| 02 | Diploma and old badge are rejected, then both face a cold locked door | The opening gate continues, but an inserted badge contains malformed generated text and the ending becomes an elevator-door composition with the characters largely absent | Blocked: prop/text artefact and wrong door semantics |
| 03 | Attendant turns a brass key and opens a hidden frosted-glass door | The segment starts from the elevator-door frame and resolves into a generic warm hallway; the key-turn and hidden-door action are not reliably visible | Blocked: threshold action and spatial continuity missing |
| 04 | Physical enterprise AI evidence is reviewed, failed test is corrected and audit record is filed | Physical stamping and staging-folder imagery appears, but character participation and the complete correction action are not stable across frames | Blocked for continuity; usable as an isolated insert only |
| 05 | The pair carry the project binder through green gates into sunrise | The final exit composition is present, but the recurring pair and binder identity are not reliably preserved from segment 04 | Blocked: character/prop continuity |

## Root cause

The text-only chain removes the reference images but asks the model to preserve named people, props and exact lobby topology from prose alone. The provider successfully creates five videos, but it does not guarantee identity, door type, prop text or spatial continuity across the runtime last-frame handoff.

## Disposition

- Preserve all five MP4s, last frames, task IDs and the rough cut as a failed visual experiment.
- Do not publish, schedule or register this rough cut as a verified video.
- Do not retry under the current fingerprint. Any correction needs a new package review and a new fingerprint.
- The next viable direction is a controlled per-shot visual plan with one approved opening/keyframe plate per major location, or a simpler single-location concept that does not depend on exact identity and topology continuity.
