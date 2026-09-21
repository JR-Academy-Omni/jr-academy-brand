# Remotion outro revision QA
- 1920x1080, 24fps, 192-frame (8s) Remotion composition. TypeScript check passed; full render completed.
- Final 912 frames / 38 seconds. First 720 decoded video frame hashes exactly match previous master.
- Final MP4 fully decoded without errors. Sampled each second of final encoded outro; inspected full-resolution final layout. No clipping or overlap.
- New narration is 7.6 seconds with 0.15s lead-in, backend TtsService / ElevenLabs / eleven_v3 / amy. No speed-up. All original narration before 30 seconds retained.
- Unprompted ASR confirms complete new script, with homophone transcript discrepancies preserved in final-audio-asr.json. No claim of human listening approval.
- Outro integrated loudness -16.5 LUFS, true peak -3.9 dBFS; original instrumental bed continues with ducking and tail fade.
- Source copy boundaries documented in COPY-SOURCES.md. 全球唯一 omitted; 三年打磨 supplied by user.
- Registry updates original logical entry rather than duplicating the same master.
