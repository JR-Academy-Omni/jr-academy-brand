#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REVISION_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
AUDIO_DIR="${REVISION_DIR}/audio"
VOICE_DIR="${AUDIO_DIR}/voice-local-xiaobei"
SFX_DIR="${AUDIO_DIR}/sfx"
MUSIC="${AUDIO_DIR}/music/jr-cinematic-technology-score.mp3"
MASTER_VIDEO="${REVISION_DIR}/jr-home-ai-journey-seedance-v2.mp4"
WEB_VIDEO="${REVISION_DIR}/jr-home-ai-journey-seedance-v2-web.mp4"
SOUNDTRACK_WAV="${AUDIO_DIR}/jr-home-ai-journey-soundtrack-v1.wav"
SOUNDTRACK_MP3="${AUDIO_DIR}/jr-home-ai-journey-soundtrack-v1.mp3"
OUTPUT_MASTER="${REVISION_DIR}/jr-home-ai-journey-seedance-v2-sound.mp4"
OUTPUT_WEB="${REVISION_DIR}/jr-home-ai-journey-seedance-v2-sound-web.mp4"

ffmpeg -y \
  -i "${MUSIC}" \
  -i "${VOICE_DIR}/01.wav" \
  -i "${VOICE_DIR}/02.wav" \
  -i "${VOICE_DIR}/03.wav" \
  -i "${VOICE_DIR}/04.wav" \
  -i "${VOICE_DIR}/05.wav" \
  -i "${VOICE_DIR}/06.wav" \
  -i "${VOICE_DIR}/07.wav" \
  -i "${VOICE_DIR}/08.wav" \
  -i "${VOICE_DIR}/09.wav" \
  -i "${SFX_DIR}/whoosh-cinematic.mp3" \
  -i "${SFX_DIR}/whoosh-short.mp3" \
  -i "${SFX_DIR}/riser.mp3" \
  -i "${SFX_DIR}/impact-bass-1.mp3" \
  -i "${SFX_DIR}/whoosh-short.mp3" \
  -i "${SFX_DIR}/whoosh-cinematic.mp3" \
  -i "${SFX_DIR}/impact-bass-1.mp3" \
  -i "${SFX_DIR}/whoosh-short.mp3" \
  -i "${SFX_DIR}/sparkle.mp3" \
  -i "${SFX_DIR}/chime.mp3" \
  -filter_complex "\
    [0:a]aresample=48000,aformat=sample_fmts=fltp:channel_layouts=stereo,atrim=0:38.541667,asetpts=PTS-STARTPTS,loudnorm=I=-22:TP=-3:LRA=11,volume=0.78,afade=t=in:st=0:d=0.8,afade=t=out:st=37.35:d=1.19[bgm];\
    [1:a]aresample=48000,aformat=sample_fmts=fltp:channel_layouts=stereo,highpass=f=80,lowpass=f=15000,volume=1.12,adelay=550|550[v1];\
    [2:a]aresample=48000,aformat=sample_fmts=fltp:channel_layouts=stereo,highpass=f=80,lowpass=f=15000,volume=1.12,adelay=5200|5200[v2];\
    [3:a]aresample=48000,aformat=sample_fmts=fltp:channel_layouts=stereo,atempo=1.136,highpass=f=80,lowpass=f=15000,volume=1.12,adelay=9850|9850[v3];\
    [4:a]aresample=48000,aformat=sample_fmts=fltp:channel_layouts=stereo,highpass=f=80,lowpass=f=15000,volume=1.12,adelay=13850|13850[v4];\
    [5:a]aresample=48000,aformat=sample_fmts=fltp:channel_layouts=stereo,atempo=1.03,highpass=f=80,lowpass=f=15000,volume=1.12,adelay=18450|18450[v5];\
    [6:a]aresample=48000,aformat=sample_fmts=fltp:channel_layouts=stereo,highpass=f=80,lowpass=f=15000,volume=1.12,adelay=23050|23050[v6];\
    [7:a]aresample=48000,aformat=sample_fmts=fltp:channel_layouts=stereo,atempo=1.24,highpass=f=80,lowpass=f=15000,volume=1.12,adelay=27550|27550[v7];\
    [8:a]aresample=48000,aformat=sample_fmts=fltp:channel_layouts=stereo,atempo=1.105,highpass=f=80,lowpass=f=15000,volume=1.12,adelay=32150|32150[v8];\
    [9:a]aresample=48000,aformat=sample_fmts=fltp:channel_layouts=stereo,atempo=1.10,highpass=f=80,lowpass=f=15000,volume=1.16,adelay=35650|35650[v9];\
    [v1][v2][v3][v4][v5][v6][v7][v8][v9]amix=inputs=9:duration=longest:normalize=0,acompressor=threshold=0.12:ratio=2.5:attack=8:release=140:makeup=1.3,atrim=0:38.541667[voice];\
    [10:a]atrim=0:3.5,asetpts=PTS-STARTPTS,volume=0.20[s1];\
    [11:a]volume=0.42,adelay=4600|4600[s2];\
    [12:a]atrim=7.5:10.0,asetpts=PTS-STARTPTS,volume=0.24,adelay=7500|7500[s3];\
    [13:a]volume=0.45,adelay=9950|9950[s4];\
    [14:a]aresample=48000,aformat=sample_fmts=fltp:channel_layouts=stereo,volume=0.14,adelay=18050|18050[s5];\
    [15:a]atrim=0:2.0,asetpts=PTS-STARTPTS,volume=0.20,adelay=22200|22200[s6];\
    [16:a]volume=0.44,adelay=27350|27350[s7];\
    [17:a]volume=0.32,adelay=32100|32100[s8];\
    [18:a]volume=0.28,adelay=36750|36750[s9];\
    [19:a]volume=0.24,adelay=37000|37000[s10];\
    [s1][s2][s3][s4][s5][s6][s7][s8][s9][s10]amix=inputs=10:duration=longest:normalize=0,aresample=48000,aformat=sample_fmts=fltp:channel_layouts=stereo,atrim=0:38.541667[sfx];\
    [bgm][voice]sidechaincompress=threshold=0.025:ratio=8:attack=15:release=360:makeup=1[ducked];\
    [ducked][voice][sfx]amix=inputs=3:duration=longest:normalize=0,alimiter=limit=0.94,loudnorm=I=-14:TP=-1:LRA=9,asetpts=PTS-STARTPTS,apad=whole_dur=38.541667,atrim=duration=38.541667[mix]" \
  -map "[mix]" \
  -c:a pcm_s24le \
  -ar 48000 \
  "${SOUNDTRACK_WAV}"

ffmpeg -y \
  -i "${SOUNDTRACK_WAV}" \
  -c:a libmp3lame \
  -b:a 256k \
  "${SOUNDTRACK_MP3}"

ffmpeg -y \
  -i "${MASTER_VIDEO}" \
  -i "${SOUNDTRACK_WAV}" \
  -map 0:v:0 \
  -map 1:a:0 \
  -c:v copy \
  -c:a aac \
  -b:a 256k \
  -ar 48000 \
  -movflags +faststart \
  "${OUTPUT_MASTER}"

ffmpeg -y \
  -i "${WEB_VIDEO}" \
  -i "${SOUNDTRACK_WAV}" \
  -map 0:v:0 \
  -map 1:a:0 \
  -c:v copy \
  -c:a aac \
  -b:a 192k \
  -ar 48000 \
  -movflags +faststart \
  "${OUTPUT_WEB}"

printf '%s\n%s\n%s\n' "${OUTPUT_MASTER}" "${OUTPUT_WEB}" "${SOUNDTRACK_MP3}"
