#!/usr/bin/env python3

import json
import sys

import librosa
import numpy as np


audio_path = sys.argv[1]
output_path = sys.argv[2]
y, sr = librosa.load(audio_path, sr=None, mono=True)
_, beats = librosa.beat.beat_track(y=y, sr=sr, tightness=400, units="time")
indices = np.arange(len(beats))
design = np.vstack([indices, np.ones_like(indices)]).T
(period, phase), *_ = np.linalg.lstsq(design, beats, rcond=None)
residual = beats - (phase + indices * period)
grid = phase + np.arange(-2, 200) * period
grid = grid[(grid >= 0) & (grid <= len(y) / sr)]
payload = {
    "source": audio_path,
    "sample_rate": int(sr),
    "beat_count": int(len(beats)),
    "bpm": float(60 / period),
    "phase_seconds": float(phase),
    "period_seconds": float(period),
    "max_residual_ms": float(np.abs(residual).max() * 1000),
    "beat_frames_30fps": [int(round(value * 30)) for value in grid],
}
with open(output_path, "w", encoding="utf-8") as output:
    json.dump(payload, output, indent=2)
    output.write("\n")
print(json.dumps(payload, indent=2))
