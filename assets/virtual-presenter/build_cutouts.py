#!/usr/bin/env python3
"""Build transparent presenter cutouts from the versioned chroma sources."""

from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter


ROOT = Path(__file__).resolve().parent
SOURCE_DIR = ROOT / "source-chroma"
OUTPUT_DIR = ROOT / "cutouts"


def build_cutout(source: Path, output: Path) -> None:
    image = Image.open(source).convert("RGB")
    rgb = np.asarray(image).astype(np.float32)
    red, green, blue = rgb[..., 0], rgb[..., 1], rgb[..., 2]

    # The wardrobe contains no green. Green dominance therefore gives a stable
    # matte while retaining dark hair strands better than a single RGB key.
    dominance = green - np.maximum(red, blue)
    removal = np.clip((dominance - 14.0) * 4.5, 0.0, 255.0)
    alpha = (255.0 - removal).astype(np.uint8)
    alpha_image = Image.fromarray(alpha).filter(
        ImageFilter.GaussianBlur(radius=0.45)
    )

    # Remove reflected green from antialiased hair and clothing edges.
    excess = np.maximum(green - np.maximum(red, blue), 0.0)
    spill_weight = np.clip(excess / 32.0, 0.0, 1.0)
    neutral_green = (red + blue) * 0.5
    rgb[..., 1] = green * (1.0 - spill_weight) + neutral_green * spill_weight

    rgba = Image.fromarray(np.clip(rgb, 0, 255).astype(np.uint8))
    rgba.putalpha(alpha_image)
    rgba.save(output, optimize=True)


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    for source in sorted(SOURCE_DIR.glob("*.png")):
        build_cutout(source, OUTPUT_DIR / source.name)
        print(f"built {OUTPUT_DIR / source.name}")


if __name__ == "__main__":
    main()
