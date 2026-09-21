# AI Engineer Bootcamp 40-second advertisement

This folder contains the production source and delivery assets for the
JR Academy AI Engineer Bootcamp one-take advertisement.

## Story structure

1. The user sees one answer.
2. The camera moves through the monitor into the real engineering system.
3. An AI Engineer turns models, data and tools into a product.
4. The camera enters the JR Academy project lab.
5. A learner deploys a working product and the frame resolves to the JR brand.

## Creative acceptance standard

Emotional escalation is a delivery requirement, not optional polish. A version
is not approved merely because the visuals, narration, captions and music are
technically correct.

- The script must contain a real turn from explanation to identity. For this
  campaign, “就是 AI Engineer” is the first emotional peak.
- The final CTA must address the viewer directly and offer an identity to step
  into. The locked line is: “别只做 AI 的使用者。成为把 AI 做成产品的人。”
- The 40-second arc is: restrained hook → hidden-system expansion → technical
  momentum → role reveal → proof of scarce engineering ability → learning path
  → direct identity CTA → clean brand resolve.
- Narration is generated line by line with a distinct delivery direction.
  Energy, conviction and pace must rise across the film; simply increasing the
  master volume does not count as emotional progression.
- Music must share the same two peaks: role reveal around 15 seconds and the
  CTA lift around 34 seconds. It stays audible, uses moderate narration ducking
  and resolves cleanly under the final brand card.
- The delivery master must not burn in line-by-line narration subtitles.
  Narration copy and timings remain editable as sidecar SRT/ASS files. Generated
  footage is never trusted for designed screen copy or the official logo.

Final review has three passes:

1. **Voice only:** the listener can hear the turn, first reveal and final
   invitation without relying on music.
2. **Full mix:** music strengthens both peaks without masking the words.
3. **Picture and text:** the emotional high points land on the intended shots;
   designed labels and brand cards are correct, while narration subtitles
   remain outside the video as editable sidecars.

Reject and revise any version that remains a flat sequence of explanations,
even if it passes codec, duration and loudness checks.

## Production method

- Five sequential Seedance 2.0 clips, approximately eight seconds each.
- Every continuation uses the preceding generated clip's actual last frame.
- Camera direction remains forward; monitor bezels and a glass doorway hide
  physical seams.
- Generated UI contains no trusted copy. Designed course labels, CTA cards and
  the official JR Academy logo are composited from deterministic sources.
- Do not burn narration subtitles into future delivery masters. If caption
  review is useful, export a separately named caption-preview video; never
  replace the clean master.
- Volcengine credentials are loaded from a local file at runtime and are never
  stored in this folder.

## Audio

- Final narration: Volcengine Seed-TTS 2.0, `zh_male_taocheng_uranus_bigtts`
  (“小天 2.0”), generated as eight independent expressive lines and aligned to
  the locked narration windows at 0.2 / 3 / 8 / 15 / 20 / 26 / 34 / 38 seconds.
  Each line has its own Seed-TTS direction, speech rate and loudness: restrained
  opening, system build, job-title reveal, engineering proof, course lift and
  direct CTA.
- Legacy narration: macOS `Tingting` Chinese voice, retained only in the v1/v2
  files for comparison.
- Recommended music: an original 40-second cinematic orchestral/technology
  score generated with Volcengine Audio Generation 1.0. Its timeline moves from
  deep-space restraint to the AI Engineer reveal, engineering momentum and a
  final CTA lift, while explicitly excluding tropical and Latin percussion.
- Legacy music: [“Aitech” by Kevin MacLeod](https://incompetech.com/music/royalty-free/index.html?Search=Search&isrc=USUAN1100336),
  CC BY 4.0, retained in v1-v4 for comparison.
- SFX: the bundled `media-use` typing, key press, whoosh, impact and chime
  assets.
- The final mix keeps the Seed-TTS narration as a separate compressed foreground
  stem and ducks the music beneath it. Music rises through four sections and uses
  moderate rather than aggressive sidechain ducking. It replaces audio only, so
  the approved video frames are not re-encoded.
- Delivery loudness target: -14 LUFS, -1.5 dB true peak.

## Expected delivery

- `jr-ai-engineer-bootcamp-ad-v1.mp4`: 1920×1080, 24 fps, H.264/AAC, 40 seconds.
- `jr-ai-engineer-bootcamp-ad-v2-voice-forward.mp4`: legacy system-voice mix.
- `jr-ai-engineer-bootcamp-ad-v3-seed-tts-taocheng.mp4`: recommended delivery
  with the first Seed-TTS 2.0 narration mix.
- `jr-ai-engineer-bootcamp-ad-v4-seed-tts-dynamic.mp4`: recommended delivery
  with per-line expressive direction, a rising music bed and the exact approved
  video stream.
- `jr-ai-engineer-bootcamp-ad-v5-seed-audio-epic.mp4`: current recommended
  delivery with the expressive Seed-TTS narration and original epic cinematic
  score. The approved H.264 video stream remains byte-identical.
- `jr-ai-engineer-bootcamp-ad-v6-emotional-cta.mp4`: current recommended
  campaign delivery. It rewrites the narration around an identity reveal and
  direct CTA, regenerates all eight Seed-TTS lines with a two-stage emotional
  build, and updates the burned-in Chinese captions to match. This is the final
  legacy captioned version; future delivery masters default to no burned-in
  narration subtitles.
- `raw/`: generated Seedance clips and real last frames.
- `audio/seed-tts-taocheng/`: eight generated Seed-TTS source lines and manifest.
- `audio/seed-tts-taocheng-expressive/`: eight expressive Seed-TTS source lines,
  delivery timing and direction manifest.
- `audio/narration-seed-tts-taocheng.wav`: subtitle-aligned narration stem.
- `audio/ad-mix-v4-seed-tts-taocheng.wav`: final 48 kHz, 24-bit mix master.
- `audio/narration-seed-tts-taocheng-expressive.wav`: dynamic narration stem.
- `audio/ad-mix-v5-seed-tts-dynamic-master.wav`: final dynamic delivery master.
- `audio/source/seed-audio-epic-cinematic-v1.mp3`: original 40-second cinematic
  score, with a generation manifest beside it.
- `audio/ad-mix-v6-seed-audio-epic-master.wav`: final cinematic delivery master.
- `audio/seed-tts-taocheng-emotional/`: identity-reveal/CTA narration sources.
- `audio/narration-seed-tts-taocheng-emotional.wav`: subtitle-aligned emotional
  narration stem.
- `audio/ad-mix-v7-emotional-master.wav`: emotional campaign delivery master.
- `production/`: locked script, prompts, editable narration/sidecar subtitle
  sources, designed text overlays and generation tooling. The Seed-TTS and
  Seed-Audio generators read credentials from runtime environment variables and
  never store them here.
