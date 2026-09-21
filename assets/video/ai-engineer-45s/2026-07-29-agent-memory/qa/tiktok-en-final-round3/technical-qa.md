# TikTok English technical QA — round 3

- Result: PASS
- Final masters: `out/agent-memory-tiktok-en-bgm.mp4` and `out/agent-memory-tiktok-en-no-bgm.mp4`
- Video: H.264, 1080×1920, 30 fps, 45.500 s
- Audio: AAC, 48 kHz, stereo
- BGM master: -14.1 LUFS integrated, -1.8 dBFS true peak
- No-BGM master: -14.0 LUFS integrated, -1.8 dBFS true peak
- Decoded video parity: exact (`video-parity.diff` is empty)
- Black-frame scan: no `black_start` events
- Closing regression scan: frames 1167–1173 are stable with no alternating corruption
- Voice policy: PASS; ElevenLabs `eleven_v3`, `en`, system fallback disabled
- BGM SHA-256: `3e8a99f2012567b3f733b9eed4804ed2a8a73e4acacd2fe5291ef5f4c45874f9`
- No-BGM SHA-256: `2b9cc680541c25ac905344202e039c3d19ebea29a52fcd59e3eb2be2987e6c71`

Evidence is in this directory: ffprobe JSON, loudness logs, black-frame log,
decoded frame hashes, contact sheet, closing consecutive-frame sheet, and SHA-256 list.
