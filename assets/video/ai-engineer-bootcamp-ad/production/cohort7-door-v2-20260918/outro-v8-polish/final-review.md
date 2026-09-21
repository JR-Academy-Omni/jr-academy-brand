# Independent visual review — V8 outro

Reviewed 2026-09-18. Scope: the 8-second revision only. Frame numbers are zero-based outro frames; add 720 for the 38-second master. Evidence: DESIGN.md, Composition.tsx, official SVG, exact SplitTextStagger demo, gallery-reference.json, supplied contact sheet, f178 at full resolution, and frames extracted directly from outro-review.mp4. Probe confirms 1920×1080, 24fps, 192 video frames. Audio review and exports belong to the producing task.

## Findings

P1 ✓ f48/f106/f145/f178 communicate project building, agent collaboration, production harness and AI Engineer cohort 7. P2/F1 ✓ All four scoped scenes appear. P3 ? Course-owner claims including three years and 13 weeks were not independently researched. P4/F3 ✓ Damped module assembly, routed packets, drawn tick, locking boundary and official brand finale match the recorded refinement. F2 ✓ Guided-project payoff repeats as the explicit DESIGN exception.

V1/V3/V4 ✓ Cream/lime/dark palette and coral paths remain consistent. No neon, glow spam or fake live UI. V2 ✓ Eased packet motion and damped assembly are supported by deterministic code; fixed frame extracts show controlled landing. No camera motion or random jitter.

S1/S3 ✓ Split-text rise uses 115% → −10% → 0, cubic then quadratic easing, 11.2+4.8 frames and 1.6-frame stagger, matching the demo's 30→24fps adaptation. Baseline omission and shorter text are explicitly recorded adaptations. S2/S6 ? Gallery preview was not available to this review; dynamic reference fidelity is unverified. No claim of exact reproduction. S4/S5 ✓ Glyph masks, cubic coordinates and brand integration are coherent.

B1/B2 ✓ Four scene boundaries remain 72/120/156 with earlier overlapping transitions. B3/R1 ✓ Official final logo settles at f163 and remains still through f191: 29 frames, 1.208 seconds. B4 ✓ No missing scene within the reviewed scope.

D1/D2 ✓ No personal/customer credentials or internal addresses visible. D3/D4/D5: existing-page screenshot requirements do not apply to these clearly diagrammatic scenes; text/assets render fully.

Q-logo ✓ f178 shows the official JR/匠人学院 lockup without stretching or cropping. Source viewBox 433×156; 485×175 box uses object-fit: contain, preserving ratio. Header also uses contain. Finale title, logo, cohort label, outlined 07, payoff and bottom lines are separate and fit the canvas.

Q-path ✓ Flow packet point arrays exactly equal their corresponding cubic path endpoints/control points. Straight input and selected routing packet stay on their lines. f80/f106 and direct transition extracts show no stray packet or broken path.

Q-transition — initial finding, resolved on readback: f71 and f118: header loses contrast for one frame on each transition. The header's light condition is f>=72 && f<119, while cream covers it by f71 and dark covers it by f118. Evidence: qa/reviewer-header-71-118.jpg (first row f71, second f118). Change interval to f>=71 && f<118, or render each header within its scene mask, then re-render and inspect these frames. These are small but concrete defects in the requested logo polish.

Q-transition ✓ f66–72, f114–120, f156–163 otherwise show clean wipe/iris geometry without tearing or malformed content. Cropped next-scene labels inside an expanding iris are intentional transitional exposure. Evidence: qa/reviewer-transitions.jpg, rows 1/2/3 correspond to the first seven frames of each listed interval; final row starts with f163.

## Aesthetic checklist

R2 ✓ Nonlinear easing; module group has a settled interval before the first wipe. R3 exception: opening is 3 seconds; technical scenes remain short impressions per DESIGN. R4 ✓ No beat-driven screen pumping.
Q1 ✓ Diagrammatic UI is not presented as a real existing product page. Q2 N/A: no rasterized 3D page text. Q3 ✓ Stable camera. Q4 ✓ No sweeping glow. Q5 ✓ One layered product assembly as opening subject. Q6 ✓ Technical labels are front-facing. Q7/Q8 recorded direction supersedes orbit/showcase montage: fixed diagram camera and minimal brand finale. Q9 N/A: no insertion into a real webpage. Q10 N/A: no document mock. Q11 ✓ Main title/payoff and auxiliary lines fit and are legible in supplied frames; tiny English logo subline is part of the official brand artwork. Exact pixel-height measurement of every auxiliary label not performed.
C1/C2 ✓ Text names concrete course subjects and project outcome. C3 N/A: no in-world 3D text annotation. Process P1 ✓ Rendered frames independently inspected. P2 ? No Gallery movie was available. P3 N/A: no ambiguous feedback reinterpretation. P4 ✓ Assembly/workflow/routing/brand each serves a distinct purpose.

## Required fixes

None outstanding. The producer corrected the header interval to 71<=f<118. Independent readback of the updated f71/f118 images confirms black logo on cream and white logo on dark, both legible (qa/reviewer-header-fixed.jpg). Updated Composition.tsx confirms the condition. The dark iris now starts at radius 0 rather than 104px, eliminating the initial circular content pop. Original reviewer-transition and header evidence is retained as pre-fix evidence, not the current output.

## Suggested improvements

- None additional within this approved 8-second layout. Extending technical reading time would change scope.

## Unable to verify

- Gallery reference movie fidelity, complete real-time audiovisual playback, rendered SFX alignment/audibility/clipping, BGM/no-BGM frame identity, audio rights, registry/public upload and full-master first-30-second identity were not independently checked here. Parent task owns these checks; this report is not a claim of complete production/public acceptance.
