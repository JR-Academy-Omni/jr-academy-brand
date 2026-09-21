#!/usr/bin/env node

import {createRequire} from 'node:module';
import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const episodeRoot = path.resolve(here, '..');
const workspaceRoot = path.resolve(episodeRoot, '../../../../..');
const backendRoot = path.join(workspaceRoot, 'jr-academy');
const requireFromBackend = createRequire(path.join(backendRoot, 'package.json'));
const {MongoClient} = requireFromBackend('mongodb');
const audioPath = path.join(
  episodeRoot,
  'public/audio/narration-elevenlabs.wav',
);
const outputPath = path.join(
  episodeRoot,
  'qa/pronunciation-transcript.json',
);

const env = readFileSync(path.join(backendRoot, '.env'), 'utf8');
const mongoUri = env.match(/^MONGO_URI=(.+)$/m)?.[1]?.trim();
if (!mongoUri) throw new Error('MONGO_URI is missing from jr-academy/.env');

const client = new MongoClient(mongoUri);
await client.connect();

try {
  const settings = await client
    .db()
    .collection('systemsettings')
    .findOne({key: 'ai_settings'});
  const apiKey = settings?.aiSettings?.providers?.elevenlabs?.apiKey;
  if (!apiKey) {
    throw new Error('ElevenLabs apiKey is not configured in admin AI Settings');
  }

  const form = new FormData();
  form.append(
    'file',
    new Blob([readFileSync(audioPath)], {type: 'audio/wav'}),
    path.basename(audioPath),
  );
  form.append('model_id', 'scribe_v2');
  form.append('language_code', 'zho');
  form.append('tag_audio_events', 'false');
  form.append('diarize', 'false');

  const response = await fetch(
    'https://api.elevenlabs.io/v1/speech-to-text',
    {
      method: 'POST',
      headers: {'xi-api-key': apiKey},
      body: form,
    },
  );
  if (!response.ok) {
    throw new Error(
      `ElevenLabs Scribe error (${response.status}): ${await response.text()}`,
    );
  }
  const transcript = await response.json();
  mkdirSync(path.dirname(outputPath), {recursive: true});
  writeFileSync(outputPath, `${JSON.stringify(transcript, null, 2)}\n`);
  console.log(transcript.text);
} finally {
  await client.close();
}
