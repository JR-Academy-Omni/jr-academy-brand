#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REVISION_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
VOICE_DIR="${REVISION_DIR}/audio/voice-local-xiaobei"

# HyperFrames requires Node 22+; Homebrew Node is kept ahead of the repo's
# Node 20 toolchain only for this isolated local TTS invocation.
export PATH="/Users/lightman/.venvs/hyperframes-kokoro/bin:/opt/homebrew/bin:${PATH}"

mkdir -p "${VOICE_DIR}"

speak() {
  local id="$1"
  local text="$2"
  local speed="$3"

  npx -y hyperframes tts "${text}" \
    --voice zf_xiaobei \
    --lang zh \
    --speed "${speed}" \
    --output "${VOICE_DIR}/${id}.wav"
}

speak 01 "从悉尼出发，打开一只盒子。" 0.94
speak 02 "你进入的，不只是一门课。" 0.92
speak 03 "把想法，变成能力。进入 A I 世界。" 1.08
speak 04 "学创作、代码、数据与智能体。" 1.02
speak 05 "把知识，写成真正能运行的作品。" 1.02
speak 06 "连接全球领先的，A I 生态。" 1.03
speak 07 "成为 A I 创作者、A I 工程师，或创业者。" 1.18
speak 08 "再把 A I，带回真实世界。" 0.98
speak 09 "匠人学院。打开盒子，开启未来。" 1.16

printf '%s\n' "${VOICE_DIR}"
