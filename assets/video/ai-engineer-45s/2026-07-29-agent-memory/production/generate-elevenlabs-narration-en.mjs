#!/usr/bin/env node

import {execFileSync} from 'node:child_process';
import {createRequire} from 'node:module';
import {existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const episodeRoot = path.resolve(here, '..');
const workspaceRoot = path.resolve(episodeRoot, '../../../../..');
const backendRoot = path.join(workspaceRoot, 'jr-academy');
const requireFromBackend = createRequire(path.join(backendRoot, 'package.json'));
const {MongoClient} = requireFromBackend('mongodb');
const script = JSON.parse(readFileSync(path.join(here, 'elevenlabs-script-en.json'), 'utf8'));
const segmentDir = path.join(episodeRoot, 'public/audio/elevenlabs-en');
const finalPath = path.join(episodeRoot, 'public/audio/narration-elevenlabs-en.wav');
const manifestPath = path.join(segmentDir, 'manifest.json');
const force = process.argv.includes('--force');

const duration = (file) => Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', file], {encoding: 'utf8'}).trim());

async function synthesize(apiKey, segment) {
  const raw = path.join(segmentDir, `${segment.id}.raw.mp3`);
  const output = path.join(segmentDir, `${segment.id}.wav`);
  if (!force && existsSync(output)) return output;
  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${script.voice.voiceId}?output_format=mp3_44100_128`, {
    method: 'POST',
    headers: {'xi-api-key': apiKey, 'Content-Type': 'application/json; charset=utf-8'},
    body: JSON.stringify({
      text: segment.text,
      model_id: script.voice.model,
      language_code: script.voice.languageCode,
      voice_settings: {
        stability: script.voice.stability,
        similarity_boost: script.voice.similarityBoost,
        style: script.voice.style,
        use_speaker_boost: script.voice.useSpeakerBoost,
      },
    }),
  });
  if (!response.ok) throw new Error(`ElevenLabs error for ${segment.id} (${response.status}): ${await response.text()}`);
  try {
    writeFileSync(raw, Buffer.from(await response.arrayBuffer()));
    execFileSync('ffmpeg', ['-y', '-i', raw, '-af', `silenceremove=start_periods=1:start_duration=0.03:start_threshold=-42dB:stop_periods=-1:stop_duration=0.14:stop_threshold=-42dB,atempo=${script.voice.tempo}`, '-ar', '48000', '-ac', '2', '-c:a', 'pcm_s24le', output], {stdio: 'ignore'});
  } finally {
    if (existsSync(raw)) unlinkSync(raw);
  }
  return output;
}

const env = readFileSync(path.join(backendRoot, '.env'), 'utf8');
const mongoUri = env.match(/^MONGO_URI=(.+)$/m)?.[1]?.trim();
if (!mongoUri) throw new Error('MONGO_URI is missing from jr-academy/.env');
mkdirSync(segmentDir, {recursive: true});
const client = new MongoClient(mongoUri);
await client.connect();

try {
  const settings = await client.db().collection('systemsettings').findOne({key: 'ai_settings'});
  const apiKey = settings?.aiSettings?.providers?.elevenlabs?.apiKey;
  if (!apiKey) throw new Error('ElevenLabs apiKey is not configured in admin AI Settings');
  const generated = [];
  for (const segment of script.segments) {
    const output = await synthesize(apiKey, segment);
    generated.push({...segment, file: path.basename(output), durationSeconds: duration(output)});
    console.log(`${segment.id}: ${generated.at(-1).durationSeconds.toFixed(3)}s`);
  }
  const inputs = [];
  const filters = [];
  const labels = [];
  let inputIndex = 0;
  for (const segment of generated) {
    inputs.push('-i', path.join(segmentDir, segment.file));
    filters.push(`[${inputIndex}:a]asetpts=PTS-STARTPTS[s${inputIndex}]`);
    labels.push(`[s${inputIndex}]`);
    inputIndex += 1;
    if (segment.pauseAfterSeconds > 0) {
      inputs.push('-f', 'lavfi', '-t', String(segment.pauseAfterSeconds), '-i', 'anullsrc=r=48000:cl=stereo');
      filters.push(`[${inputIndex}:a]asetpts=PTS-STARTPTS[p${inputIndex}]`);
      labels.push(`[p${inputIndex}]`);
      inputIndex += 1;
    }
  }
  filters.push(`${labels.join('')}concat=n=${labels.length}:v=0:a=1,alimiter=limit=0.94[out]`);
  execFileSync('ffmpeg', ['-y', ...inputs, '-filter_complex', filters.join(';'), '-map', '[out]', '-ar', '48000', '-ac', '2', '-c:a', 'pcm_s24le', finalPath], {stdio: 'ignore'});
  const manifest = {
    provider: script.provider,
    engine: 'ElevenLabs Text to Speech API',
    voice: script.voice,
    generatedAt: new Date().toISOString(),
    source: 'JR Academy admin AI Settings',
    segments: generated,
    finalFile: path.relative(episodeRoot, finalPath),
    finalDurationSeconds: duration(finalPath),
    finalTempoMultiplier: 1,
    systemTtsFallbackAllowed: false,
  };
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`final: ${manifest.finalDurationSeconds.toFixed(3)}s`);
} finally {
  await client.close();
}
