#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REVISION_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
JOURNEY_DIR="$(cd "${REVISION_DIR}/.." && pwd)"
BRAND_VIDEO_DIR="$(cd "${JOURNEY_DIR}/../brand-intro" && pwd)"

OUTPUT_MASTER="${REVISION_DIR}/jr-home-ai-journey-seedance-v2.mp4"
OUTPUT_WEB="${REVISION_DIR}/jr-home-ai-journey-seedance-v2-web.mp4"

# The 0.35-second overlaps preserve the continuous-camera feeling while hiding
# small Seedance boundary differences. The opening JR Box beat reverses only
# the panel-assembly portion, so it opens without revealing the end-card first.
ffmpeg -y \
  -i "${REVISION_DIR}/raw-opening/00-sydney-descent.mp4" \
  -i "${REVISION_DIR}/raw-opening/01-enter-room-open-box.mp4" \
  -i "${BRAND_VIDEO_DIR}/jr-academy-brand-intro-v1.mp4" \
  -i "${REVISION_DIR}/raw-opening/02-box-to-ai-cosmos.mp4" \
  -i "${JOURNEY_DIR}/raw/02-ai-learning-route.mp4" \
  -i "${JOURNEY_DIR}/raw/03-pixel-coding-world.mp4" \
  -i "${JOURNEY_DIR}/raw/04-ai-ecosystem-gateway.mp4" \
  -i "${REVISION_DIR}/raw-closing-v3/05-hero-identities-stationary.mp4" \
  -i "${REVISION_DIR}/raw-closing/06-sydney-outcome-box-close.mp4" \
  -i "${BRAND_VIDEO_DIR}/jr-academy-brand-intro-v1.mp4" \
  -filter_complex "\
    [0:v]fps=24,scale=1280:720:flags=lanczos,setsar=1,format=yuv420p,setpts=PTS-STARTPTS[v0];\
    [1:v]fps=24,scale=1280:720:flags=lanczos,setsar=1,format=yuv420p,setpts=PTS-STARTPTS[v1];\
    [2:v]trim=start=0:end=0.95,reverse,fps=24,scale=1280:720:flags=lanczos,setsar=1,format=yuv420p,setpts=PTS-STARTPTS[v2];\
    [3:v]trim=start=1.2,fps=24,scale=1280:720:flags=lanczos,setsar=1,format=yuv420p,setpts=PTS-STARTPTS[v3];\
    [4:v]fps=24,scale=1280:720:flags=lanczos,setsar=1,format=yuv420p,setpts=PTS-STARTPTS[v4];\
    [5:v]fps=24,scale=1280:720:flags=lanczos,setsar=1,format=yuv420p,setpts=PTS-STARTPTS[v5];\
    [6:v]fps=24,scale=1280:720:flags=lanczos,setsar=1,format=yuv420p,setpts=PTS-STARTPTS[v6];\
    [7:v]fps=24,scale=1280:720:flags=lanczos,setsar=1,format=yuv420p,setpts=PTS-STARTPTS[v7];\
    [8:v]trim=start=1.0,setpts=PTS-STARTPTS,tpad=stop_mode=clone:stop_duration=1.0,fps=24,scale=1280:720:flags=lanczos,setsar=1,format=yuv420p[v8];\
    [9:v]fps=24,scale=1280:720:flags=lanczos,setsar=1,format=yuv420p,setpts=PTS-STARTPTS[v9];\
    [v0][v1]xfade=transition=fade:duration=0.35:offset=4.691667[x1];\
    [x1][v2]xfade=transition=fade:duration=0.35:offset=9.383334[x2];\
    [x2][v3]xfade=transition=circleopen:duration=0.35:offset=9.983334[x3];\
    [x3][v4]xfade=transition=fade:duration=0.35:offset=13.475001[x4];\
    [x4][v5]xfade=transition=fade:duration=0.35:offset=18.166668[x5];\
    [x5][v6]xfade=transition=fade:duration=0.35:offset=22.858335[x6];\
    [x6][v7]xfade=transition=fade:duration=0.35:offset=27.550002[x7];\
    [x7][v8]xfade=transition=fade:duration=0.35:offset=32.241669[x8];\
    [x8][v9]xfade=transition=fade:duration=0.35:offset=36.933336,fade=t=out:st=38.20:d=0.36[vout]" \
  -map "[vout]" \
  -an \
  -c:v libx264 \
  -preset slow \
  -crf 16 \
  -pix_fmt yuv420p \
  -movflags +faststart \
  "${OUTPUT_MASTER}"

ffmpeg -y \
  -i "${OUTPUT_MASTER}" \
  -an \
  -c:v libx264 \
  -preset slow \
  -crf 24 \
  -maxrate 5M \
  -bufsize 10M \
  -pix_fmt yuv420p \
  -movflags +faststart \
  "${OUTPUT_WEB}"

printf '%s\n%s\n' "${OUTPUT_MASTER}" "${OUTPUT_WEB}"
