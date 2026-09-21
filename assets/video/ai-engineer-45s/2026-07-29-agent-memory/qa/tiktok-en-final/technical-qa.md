# TikTok English final technical QA

- Final BGM SHA-256: `cecb0c7f254ab4bf6647afabf34e23e35bc0ee3afe2eadcab901956fe1f32a86`
- Final no-BGM SHA-256: `23c9b49c8fc728a25a312b998c83e5abe760a12b657e7159f114be688bc59823`
- Video: H.264, 1080×1920, 30 fps, 45.500 seconds.
- Audio: AAC, 48 kHz, stereo. BGM master is -14.1 LUFS / -1.8 dBFS peak; no-BGM is -14.0 LUFS / -1.8 dBFS peak.
- Voice: ElevenLabs `eleven_v3`, Amy `bhJUNIXWQQ94l8eI2VUf`, English; voice-policy validator passed.
- Captions: burned English captions follow the final narration manifest; `out/captions.tiktok.en-AU.srt` and the transcript are generated from the same measured segment boundaries.
- Visual parity: decoded frame-MD5 files are identical; `bgm-vs-no-bgm-difference.log` is empty.
- Black-frame scan: clear.
- Final encoded evidence: `contact-sheet.png` and `stills/` were extracted from the final BGM MP4.

Result: `technical-qa-passed`.
