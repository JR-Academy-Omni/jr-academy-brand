#!/usr/bin/env node

import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const API_URL = 'https://openspeech.bytedance.com/api/v3/tts/unidirectional';
const RESOURCE_ID = 'seed-tts-2.0';
const SPEAKER = 'zh_male_taocheng_uranus_bigtts';
const SAMPLE_RATE = 24000;

const lines = [
  {
    id: '01',
    text: '用户看到的，只是一句回答。',
    start: 0.2,
    end: 2.55,
    speechRate: -5,
    loudnessRate: -4,
    deliveryTempo: 1.1,
    direction: '电影广告开场。低声、克制、带悬念，像屏幕背后藏着更大的世界。前半句轻，最后“一句回答”落稳。',
  },
  {
    id: '02',
    text: '但真正决定它能不能成为产品的，是屏幕后面整套 AI 系统。',
    start: 3.0,
    end: 7.4,
    speechRate: 8,
    loudnessRate: 1,
    deliveryTempo: 1.12,
    direction: '从克制开始明显打开，带发现感和推进感。强调“真正决定”“成为产品”和“整套 AI 系统”。',
  },
  {
    id: '03',
    text: 'Context 要装得准确，RAG 要找到证据，Agent 必须在关键时刻，调用正确的工具。',
    start: 8.0,
    end: 14.25,
    speechRate: 17,
    loudnessRate: 4,
    deliveryTempo: 1.3,
    direction: '节奏加快，像系统逐层点亮。Context、RAG、Agent 分别加重；“必须在关键时刻”要有紧迫感，结尾坚定。',
  },
  {
    id: '04',
    text: '而把模型、数据和工具，真正变成产品的人——就是 AI Engineer。',
    start: 15.0,
    end: 19.75,
    speechRate: 5,
    loudnessRate: 10,
    deliveryTempo: 1.22,
    direction: '这是第一次情绪爆发。前半句蓄力，在“人”之后做有力停顿；“就是 AI Engineer”像揭晓主角身份，昂扬、坚定、令人振奋。',
  },
  {
    id: '05',
    text: '会调用 API，只是开始。让 AI 稳定、可信、真正交付，才是这个时代稀缺的工程能力。',
    start: 20.0,
    end: 25.8,
    speechRate: 19,
    loudnessRate: 7,
    deliveryTempo: 1.08,
    direction: '保持高能量但不喊叫。“只是开始”短促停顿；稳定、可信、真正交付逐级加重，在“这个时代稀缺”上给出价值感。',
  },
  {
    id: '06',
    text: '在匠人学院，用三个月、上百节课和真实项目，从 Context、RAG、MCP，一路做到 Agent、Multi-Agent 与 Evals。',
    start: 26.0,
    end: 33.55,
    speechRate: 20,
    loudnessRate: 8,
    deliveryTempo: 1.0,
    direction: '明亮、自信、速度略快，像正式发布一条清晰的成长路径。“三个月、上百节课、真实项目”有节奏地递进，最后一路向上。',
  },
  {
    id: '07',
    text: '如果你已经会写代码，别只做 AI 的使用者。成为把 AI 做成产品的人。',
    start: 34.0,
    end: 38.0,
    speechRate: 25,
    loudnessRate: 14,
    deliveryTempo: 1.07,
    direction: '第二次、也是全片最大的情绪抬升。直接对听众说，带鼓舞和召唤感。“别只做”果断；最后“成为把 AI 做成产品的人”坚定、有冲劲、让人想立刻行动。',
  },
  {
    id: '08',
    text: '匠人学院 AI Engineer Bootcamp。',
    start: 38.0,
    end: 40.0,
    speechRate: 18,
    loudnessRate: 11,
    deliveryTempo: 1.18,
    direction: '高潮后的品牌落版，沉稳、骄傲、有余韵。分别强调“匠人学院”和“AI Engineer Bootcamp”，结尾干净坚定。',
  },
];

const apiKey = process.env.DOUBAO_TTS_KEY;
const appId = process.env.DOUBAO_TTS_APP_ID;

if (!apiKey) {
  throw new Error('DOUBAO_TTS_KEY is required');
}

const here = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.resolve(here, '../audio/seed-tts-taocheng-emotional');
await fs.mkdir(outputDir, { recursive: true });

function decodeChunks(body) {
  const chunks = [];
  let depth = 0;
  let start = -1;

  for (let index = 0; index < body.length; index += 1) {
    if (body[index] === '{') {
      if (depth === 0) start = index;
      depth += 1;
      continue;
    }

    if (body[index] !== '}') continue;
    depth -= 1;

    if (depth !== 0 || start < 0) continue;

    const raw = body.slice(start, index + 1);
    start = -1;

    let chunk;
    try {
      chunk = JSON.parse(raw);
    } catch {
      continue;
    }

    if (chunk.code === 0 && chunk.data) {
      chunks.push(Buffer.from(chunk.data, 'base64'));
      continue;
    }

    if (chunk.code && chunk.code !== 20000000) {
      throw new Error(`Seed-TTS ${chunk.code}: ${chunk.message || 'unknown error'}`);
    }
  }

  if (chunks.length === 0) {
    throw new Error(`Seed-TTS returned no audio: ${body.slice(0, 500)}`);
  }

  return Buffer.concat(chunks);
}

async function synthesize(line) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': apiKey,
      ...(appId ? { 'X-Api-App-Id': appId } : {}),
      'X-Api-Resource-Id': RESOURCE_ID,
    },
    body: JSON.stringify({
      user: { uid: 'jr-academy-ai-engineer-ad' },
      req_params: {
        text: line.text,
        speaker: SPEAKER,
        audio_params: {
          format: 'mp3',
          sample_rate: SAMPLE_RATE,
          speech_rate: line.speechRate,
          loudness_rate: line.loudnessRate,
        },
        additions: JSON.stringify({ context_texts: [line.direction] }),
      },
    }),
  });

  const body = await response.text();
  if (!response.ok) {
    throw new Error(`Seed-TTS HTTP ${response.status}: ${body.slice(0, 500)}`);
  }

  return decodeChunks(body);
}

const manifest = {
  provider: 'Volcengine Seed-TTS 2.0',
  resourceId: RESOURCE_ID,
  speaker: SPEAKER,
  sampleRate: SAMPLE_RATE,
  generatedAt: new Date().toISOString(),
  lines: [],
};

for (const line of lines) {
  const audio = await synthesize(line);
  const filename = `${line.id}.mp3`;
  await fs.writeFile(path.join(outputDir, filename), audio);

  manifest.lines.push({
    ...line,
    filename,
    bytes: audio.length,
    sha256: crypto.createHash('sha256').update(audio).digest('hex'),
  });

  process.stdout.write(`generated ${filename}\n`);
}

await fs.writeFile(
  path.join(outputDir, 'manifest.json'),
  `${JSON.stringify(manifest, null, 2)}\n`,
);

process.stdout.write(`wrote ${outputDir}\n`);
