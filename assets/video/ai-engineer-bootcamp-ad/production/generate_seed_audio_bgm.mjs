#!/usr/bin/env node

import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const API_URL = 'https://openspeech.bytedance.com/api/v3/tts/create';
const MODEL = 'seed-audio-1.0-multilingual';
const TARGET_DURATION_SECONDS = 40;

const prompt = [
  '生成一首总时长严格为40秒的原创电影感科技广告配乐。',
  '纯器乐，无对白、无人声歌词、无可识别的现有旋律；可以使用非常遥远、无歌词的人声合唱作为氛围纹理。',
  '整体气质：宏大、庄严、克制、充满宇宙尺度与工程力量，不要欢乐，不要轻佻，不要恐怖。',
  '配器：深沉的低频持续音、低音弦乐、克制的机械脉冲、温暖钢琴单音、圆号、宽阔弦乐、低沉电影鼓和远处合唱。',
  '明确排除：拉丁或南美节奏、桑巴、萨尔萨、雷鬼、马林巴、木琴、原声吉他、尤克里里、手鼓、热带打击乐、流行舞曲鼓点。',
  '时间轴：',
  '0至7秒，深空低频和稀疏钢琴脉冲，神秘但不阴暗，留出旁白空间。',
  '7至15秒，低音弦乐与规律脉冲逐渐加入，表现镜头进入庞大AI系统。',
  '15至20秒，岗位揭示时第一次抬升，圆号与宽阔和声出现，但不要盖住旁白。',
  '20至34秒，保持稳定、可信、向前推进的工程感，加入克制的电影鼓和弦乐层次。',
  '34至38秒，行动号召时形成第二次、更强的上升。',
  '38至40秒，以干净、有力量的开放五度品牌和弦收束，短尾音，不拖沓。',
  '混音要求：宽广电影声场，低频有重量，中频给男声旁白留空间，动态逐段提升，不要全程轰鸣。',
].join('');

const apiKey = process.env.DOUBAO_TTS_KEY;
if (!apiKey) throw new Error('DOUBAO_TTS_KEY is required');

const here = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.resolve(here, '../audio/source');
const outputPath = path.join(outputDir, 'seed-audio-epic-cinematic-v1.mp3');
const manifestPath = path.join(outputDir, 'seed-audio-epic-cinematic-v1.json');

await fs.mkdir(outputDir, { recursive: true });

const requestId = crypto.randomUUID();
const response = await fetch(API_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Api-Key': apiKey,
    'X-Api-Request-Id': requestId,
  },
  body: JSON.stringify({
    model: MODEL,
    text_prompt: prompt,
    audio_config: {
      format: 'mp3',
      sample_rate: 48000,
      pitch_rate: 0,
      speech_rate: 0,
      loudness_rate: 0,
    },
    watermark: {},
  }),
});

const body = await response.json();
if (!response.ok) {
  throw new Error(`Seed-Audio HTTP ${response.status}: ${JSON.stringify(body).slice(0, 800)}`);
}

let audio;
if (body.audio) {
  audio = Buffer.from(body.audio, 'base64');
} else if (body.url) {
  const download = await fetch(body.url);
  if (!download.ok) throw new Error(`Audio download HTTP ${download.status}`);
  audio = Buffer.from(await download.arrayBuffer());
} else {
  throw new Error(`Seed-Audio returned no audio: ${JSON.stringify(body).slice(0, 800)}`);
}

await fs.writeFile(outputPath, audio);
await fs.writeFile(
  manifestPath,
  `${JSON.stringify(
    {
      provider: 'Volcengine Audio Generation 1.0',
      model: MODEL,
      generatedAt: new Date().toISOString(),
      targetDurationSeconds: TARGET_DURATION_SECONDS,
      reportedDurationSeconds: body.duration,
      originalDurationSeconds: body.original_duration,
      prompt,
      filename: path.basename(outputPath),
      bytes: audio.length,
      sha256: crypto.createHash('sha256').update(audio).digest('hex'),
    },
    null,
    2,
  )}\n`,
);

process.stdout.write(
  `wrote ${outputPath}\nreported duration ${body.duration ?? 'unknown'}s\n`,
);
