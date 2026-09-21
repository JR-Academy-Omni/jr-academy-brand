# JR Academy homepage AI journey

Seedance source chain and v1 motion master for the proposed scroll-driven
homepage hero.

## Current outputs

- `jr-home-ai-journey-seedance-v1.mp4` — 30.25-second H.264 master,
  1280×720 at 24 fps, no audio.
- `jr-home-ai-journey-seedance-v1-web.mp4` — fast-start web encode of the same
  master.
- `jr-home-ai-journey-poster.jpg` — opening reality-frame poster.
- `previews/master/contact-sheet.png` — twelve-frame visual audit sheet.
- `raw/` — six native Seedance clips, their actual continuation frames and a
  sanitized task manifest.

## Direction

`Reality → AI cosmos → pixel coding world → AI ecosystem gateway → real project → real-world impact`

- Generated footage contains no approved partner logo or JR logo. Any
  model-rendered interface shapes are illustrative only and are not trusted
  product UI or copy.
- OpenAI/Anthropic identity graphics remain deterministic post-production layers.
- The official mascot stays in the red JR tracksuit throughout its 3D, pixel and
  AR forms.
- Each continuation starts from the prior clip's actual Seedance last frame.

## Generation

Credentials are loaded at runtime and must remain outside this repository.

```bash
python3 production/generate_seedance_chain.py \
  --credentials /absolute/path/to/huoshan.txt \
  --prompts production/seedance-prompts.json \
  --output-dir raw \
  --first-frame references/shot-01-reality-entry.png \
  --stop-after 1
```

Resume from the previous locally downloaded last frame:

```bash
python3 production/generate_seedance_chain.py \
  --credentials /absolute/path/to/huoshan.txt \
  --prompts production/seedance-prompts.json \
  --output-dir raw \
  --first-frame references/shot-01-reality-entry.png \
  --start-at 2
```

Native clips are generated without audio at 1280×720, 16:9. Keep the raw files
unchanged; previews, upscaling, text, partner marks and sound belong in separate
production outputs.

## Website integration boundary

This v1 is a motion master, not a claim layer. Keep these elements in HTML/CSS or
deterministic post-production:

- `学 AI，来匠人` headline, supporting copy and CTA.
- Official JR Academy logo.
- Any OpenAI or Anthropic identity and the exact, currently verified
  relationship wording.
- Real product UI captures.

The model-generated UI visible in the final reality section must remain
background texture, be softened under the hero grade, or be replaced with a
verified product capture before production launch.
