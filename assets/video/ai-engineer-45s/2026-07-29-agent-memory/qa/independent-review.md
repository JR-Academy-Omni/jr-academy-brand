# Independent Final Review — V6 Pronunciation

**Result: PASS**

Reviewed the final BGM/no-BGM masters, V6 contact sheet, exact final-MP4 frame
extracts, current manifest/technical QA, ElevenLabs generation manifest, IPA
dictionary, Scribe v2 read-back, captions, stream durations, silence boundaries,
decoded frame identity, and black-frame output. This review does **not** approve
or publish the video.

## Blocking findings

None.

## A — Voice, pronunciation, sync, and tail

- **A1 ✓ Voice/model provenance.** Both `MEDIA_MANIFEST.yml` and the ElevenLabs
  segment manifest identify Amy (`bhJUNIXWQQ94l8eI2VUf`) with model
  `eleven_v3`. `systemTtsFallbackAllowed` / `system_tts_fallback_allowed` is
  explicitly `false`; no system-TTS fallback is authorized or recorded.
- **A2 ✓ IPA dictionary retained.** `production/english-tech-terms.pls` is an
  `en-US`, IPA-alphabet PLS dictionary containing all eight controlled entries:
  `Agent Memory`, `Context Window`, `TypeScript`, `Agent`, `Thread`, `Context`,
  `Memory`, and `ID`. Its fresh SHA-256
  `ca615f3df2a768da069ad15d20642474f5b1ad2d02089d0cd25f1d04484e8942`
  matches the media manifest.
- **A3 ✓ Standard target phonemes recorded.** The dictionary specifies
  `/ˈeɪdʒənt/`, `/ˈmɛməri/`, `/θrɛd/`, `/ˈkɑːntɛkst/`,
  `/ˈwɪndoʊ/`, `/ˈtaɪpˌskrɪpt/`, and `/ˌaɪˈdiː/`; multiword entries preserve
  `Agent Memory` and `Context Window` as phrases.
- **A4 ✓ Scribe v2 read-back recognizes every controlled term.** The transcript
  contains: Agent at 1.120–1.659s; Context at 6.839–7.579s; Memory at
  8.559–9.039s; Thread at 9.739–10.159s; Context at 10.340–10.959s; Memory at
  15.559–16.000s; TypeScript at 24.180–25.100s; Context Window across
  28.539–30.279s; Agent at 34.299–34.880s; ID at 35.299–35.759s; Context at
  38.659–39.439s; and Agent Memory across 43.779–44.939s. The fresh transcript
  SHA matches manifest value
  `dbbdb5924bc0a4604ce781d183702082b9b9267d5f64769f9d82945e32e15c15`.
- **A5 ✓ Subtitle synchronization.** Cue boundaries track the Scribe timings:
  cue 3 starts 9.733s versus `Thread` at 9.739s; cue 5 covers
  TypeScript/Context Window/Memory from 22.767–33.367s; cue 6 covers
  Agent/ID/Context from 33.367–42.200s; cue 7 covers Agent Memory and the final
  conclusion from 42.200–48.333s. Exact frames 60–1410 show the correct caption
  paired with the active scene; no cue remains on the final frame 1469.
- **A6 ✓ No narration cutoff.** Scribe’s last spoken word ends at 47.659s.
  The narration master is 47.713s; the no-BGM AAC stream continues to 48.200s;
  the visual timeline continues to 49.000s. The BGM master enters measured
  silence at 48.231s and holds silence through 49.100s. Therefore the final word
  has at least 0.54s audio-stream tail and 1.34s visual hold; no initial or final
  syllable is truncated.
- **A7 ✓ Mix headroom.** Technical QA records `-13.9 LUFS` integrated and
  `-2.0 dBFS` true peak for both versions, with no clipping indication.

## P/F — Claim and scene coverage

- **P1 ✓ Frames 60–240:** the opening says chat history is current-session
  context and not a complete Memory system, matching `SOURCE.md` rather than
  denying that history can contribute to memory.
- **F1 ✓ Frames 330–600:** Thread/Context boundary and the three-layer model
  remain clear and correctly sequenced.
- **F2 ✓ Frames 690–960:** the TypeScript preference example and structured
  Memory comparison remain legible and free of unsupported claims.
- **F3 ✓ Frames 1050 and 1140:** the complete USER → MEMORY → CTX path is visible,
  aligned, and unobstructed.
- **F4 ✓ Frames 1230–1469:** WRITE / RETRIEVE / DELETE, JR mark, and the takeaway
  remain on screen through the closing hold.

## V/Q — Visual and caption integrity

- **Q1 ✓ Frames 60–1410:** captions retain 66px text and a 270px bottom inset;
  all two-/three-line layouts stay inside their panels without clipping or scene
  collisions.
- **Q2 ✓ Frames 60–1469:** the V5 art-directed typography and ≥50px intended
  readable-text floor remain intact. Long English labels and mixed Chinese/English
  captions do not overflow.
- **Q3 ✓ Transition behavior.** Partial cards at frames 330 and 960 are
  intentional entering/exiting states; they resolve to settled, fully visible
  layouts by frames 420 and 1050. No settled card crop, title collision, brand-bar
  collision, mask leak, or unintended overlap was found.
- **Q4 ✓ Brand hold.** `AI ENGINEER` remains readable in scene headers; the JR
  mark and closing takeaway remain stable at frames 1230, 1320, 1410, and 1469.

## B/D — Final files and safety

- **B1 ✓ SHA-256 identity.**
  - BGM:
    `677c0a4c53d49683a76ef99217d250abc2f23d074f5c7f9867f9ae701300220e`
  - no-BGM:
    `22de3e7798ded0005690193a8f77086eae7f62af771862ca2510261b02496107`
  Both fresh hashes exactly match `MEDIA_MANIFEST.yml`.
- **B2 ✓ 49-second timeline.** Both files contain exactly 1470 video frames at
  30fps, 1080×1920. Video duration is 49.000s; containers are correctly recorded
  as 49.100s with BGM and 49.000s without BGM.
- **B3 ✓ Decoded picture identity.** Independent frame-MD5 outputs for both
  masters are byte-identical and hash to
  `d98598f97e9f727141c59a0ac52f5bd892fab905a6e1a18c20c1dc13451cf81b`.
- **B4 ✓ No accidental black frames.** Fresh `blackdetect` runs reported no black
  segment in either final master. Dark frames 60–240, 510–600, and 1050–1469 all
  contain intentional visible content.
- **D1 ✓ Data safety.** Visible values remain schematic/frozen (`user_123`,
  TypeScript preference, illustrative message count). No customer identity,
  secret, credential, internal URL, or live personal data is exposed.

## Unable to verify

- Scribe v2 recognition plus the retained IPA dictionary strongly verifies term
  intelligibility and target pronunciation, but exact accent/naturalness still
  requires a human listening check; it cannot be proven from ASR text alone.
- The local manifests cannot independently prove the remote ElevenLabs request
  or account ownership.
- Individual SFX audibility/action-frame accuracy was not isolated from the mix.
- External provider license terms were not refreshed from the web.

## Final independent decision

**PASS for the supplied V6 masters.** Amy/`eleven_v3`, the retained IPA
dictionary, Scribe recognition of all controlled English terms, subtitle timing,
49-second timeline, narration tail, final hashes, decoded picture identity,
black-frame gate, claim boundary, and no-system-TTS requirement all pass.
Publication/approval remains a separate user gate.
