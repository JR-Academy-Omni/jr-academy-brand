# Technical QA — V6 Controlled English Pronunciation

- Composition: `AgentMemory`, 1080×1920, 30fps, 1470 frames.
- Container duration: 49.100 seconds with BGM, 49.000 seconds without BGM;
  visual timeline: 49.000 seconds.
- Video: H.264, 1080×1920, 30fps.
- Audio: AAC, 96kHz, stereo.
- BGM mix: -13.9 LUFS integrated, -2.0 dBFS measured true peak.
- No-BGM mix: -13.9 LUFS integrated, -2.0 dBFS measured true peak.
- `blackdetect`: no accidental black segment reported.
- BGM and no-BGM video streams: identical frame-MD5 digest
  `d98598f97e9f727141c59a0ac52f5bd892fab905a6e1a18c20c1dc13451cf81b`.
- TypeScript `tsc --noEmit`: passed.
- Final MP4 contact sheet: `qa/v6-pron-contact-sheet.png`.
- Voice: ElevenLabs Amy / `eleven_v3`; narration duration 47.713 seconds.
- English pronunciation: an ElevenLabs IPA dictionary fixes Agent, Agent Memory,
  Thread, Context, Context Window, Memory, TypeScript and ID. A fresh ElevenLabs
  Scribe v2 read-back recognized every controlled English term.
- Narration manifest explicitly sets `systemTtsFallbackAllowed: false`.
- Typography: every intended readable text element is at least 50px. Chinese scene
  titles use Noto Serif SC Black; technical labels and numbers use ZCOOL QingKe
  HuangYou; captions remain a heavy sans-serif at 66px.
- Captions: 66px, bottom inset 270px, 170px minimum caption panel height.
- `out/cover.png` rendered from frame 90.

Status: `technical-qa-passed`. Independent visual/audio review remains a separate gate.
