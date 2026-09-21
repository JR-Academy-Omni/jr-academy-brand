#!/usr/bin/env python3

import json
import sys

import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, find_peaks, hilbert, sosfiltfilt


audio_path = sys.argv[1]
output_path = sys.argv[2]
sr, samples = wavfile.read(audio_path)

if samples.ndim == 2:
    samples = samples.mean(axis=1)
samples = samples.astype(np.float64)
samples /= max(1.0, np.max(np.abs(samples)))

band = butter(4, [40, 160], btype="bandpass", fs=sr, output="sos")
kick = sosfiltfilt(band, samples)
envelope = np.abs(hilbert(kick))
smooth = butter(2, 8, btype="lowpass", fs=sr, output="sos")
envelope = sosfiltfilt(smooth, envelope)

peaks, properties = find_peaks(
    envelope,
    distance=int(sr * 0.55),
    prominence=np.percentile(envelope, 70) * 0.22,
)
peak_times = peaks / sr

intervals = np.diff(peak_times)
period_seed = float(np.median(intervals[(intervals > 0.62) & (intervals < 0.78)]))
phase_candidates = np.mod(peak_times, period_seed)
angles = phase_candidates / period_seed * 2 * np.pi
phase_seed = float(np.angle(np.mean(np.exp(1j * angles))) % (2 * np.pi) / (2 * np.pi) * period_seed)

indices = np.rint((peak_times - phase_seed) / period_seed).astype(int)
design = np.vstack([indices, np.ones_like(indices)]).T
(period, phase), *_ = np.linalg.lstsq(design, peak_times, rcond=None)
grid_for_peaks = phase + indices * period
residual = peak_times - grid_for_peaks

first_index = int(np.floor((0 - phase) / period))
last_index = int(np.ceil((len(samples) / sr - phase) / period))
grid_indices = np.arange(first_index, last_index + 1)
grid = phase + grid_indices * period
grid = grid[(grid >= 0) & (grid <= len(samples) / sr)]

payload = {
    "source": audio_path,
    "sample_rate": int(sr),
    "detected_kick_count": int(len(peak_times)),
    "bpm": float(60.0 / period),
    "phase_seconds": float(phase),
    "period_seconds": float(period),
    "max_detected_kick_residual_ms": float(np.abs(residual).max() * 1000),
    "beat_frames_30fps": [int(round(time * 30)) for time in grid],
}

with open(output_path, "w", encoding="utf-8") as output:
    json.dump(payload, output, ensure_ascii=False, indent=2)
    output.write("\n")

print(json.dumps(payload, ensure_ascii=False, indent=2))
