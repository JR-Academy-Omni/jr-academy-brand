# Virtual Presenter Asset Manifest

Locked identity: `jr-academy-presenter-amy-v1`

| File | Use | Size | SHA-256 |
|---|---|---:|---|
| `cutouts/headshot-neutral-square-v1.png` | Avatar / headshot | 1024x1024 | `9302dde435a0b5d31e7a660103651f44b5152718a37648d1718f652e809d722f` |
| `cutouts/pose-neutral-half-v1.png` | Default thumbnail / slide presenter | 1024x1536 | `480d8188b7b927db27b0dc50e3bf62abc38be39528c0ccc70bc0300553a31dcf` |
| `cutouts/pose-neutral-full-v1.png` | Full-body composition reference | 916x1718 | `b5a4f0780e868a86ce5f388bf24233bde50b488da0b577cdf14ab4f5069c3cea` |
| `cutouts/pose-point-left-v1.png` | Presenter on right, pointing to left copy | 1122x1402 | `93585fe9470ad27aef7951661e6ac2960805d238b0abd4826ed7b556d4ff34f7` |
| `cutouts/pose-point-right-v1.png` | Presenter on left, pointing to right copy | 1122x1402 | `938a8831158907b48932d6958107af2eeb783b9146e2c80c57fa988e1df68e94` |
| `cutouts/pose-present-left-v1.png` | Presenter on right, open-palm left | 1122x1402 | `dba4304a3d868ce08e661e449dcff555548e27edd13a3e955e8136abcbf987e9` |
| `cutouts/pose-present-right-v1.png` | Presenter on left, open-palm right | 1122x1402 | `747f2bd7dd0959408bbe030d7f27475a594e7383f0b7800377890d255d755f95` |
| `cutouts/pose-arms-crossed-v1.png` | Authority / expert positioning | 1122x1402 | `e5d9f2b5ae1ec94083748d2390193cf4d241a0e54b2856a999bb215c62b1dc72` |
| `cutouts/pose-hold-laptop-v1.png` | Technology / course product visual | 1024x1536 | `f3f20e5824082be41ec8c0568a4fd484295ccb80056aa925a6768c20f6f0678c` |

All files above are RGBA PNGs. Versioned green-screen originals remain under
`source-chroma/`; regenerate transparent outputs with:

```bash
python3 assets/virtual-presenter/build_cutouts.py
```

Visual QA contact sheet:
`previews/pose-library-contact-sheet-v1.png`.
