import {createHash} from 'node:crypto';
import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const script = JSON.parse(await readFile(join(here, 'script.json'), 'utf8'));
const login = await fetch('http://localhost:3010/dev/login', {
  method: 'POST',
  headers: {'content-type': 'application/json'},
  body: JSON.stringify({kind: 'user', id: '68a464d275c81540a7667b4d', app: 'cert', mode: 'copy'}),
});
if (!login.ok) throw new Error(`Dev-console login returned ${login.status}`);
const {token} = await login.json();
if (!token) throw new Error('Dev-console token unavailable');
await mkdir(join(here, 'segments'), {recursive: true});
const receipts = [];
for (const segment of script.segments) {
  try { await readFile(join(here, 'segments', `${segment.id}.mp3`)); console.log('already generated', segment.id); continue; } catch {}
  const response = await fetch('http://localhost:3010/classroom-engine/tts/synthesize', {
    method: 'POST',
    headers: {authorization: `Bearer ${token}`, 'content-type': 'application/json'},
    body: JSON.stringify({
      providerId: script.voice.provider,
      modelId: script.voice.model,
      voice: script.voice.voiceId,
      speed: script.voice.tempo,
      text: segment.text,
    }),
  });
  if (!response.ok) throw new Error(`TtsService ${segment.id} returned ${response.status}: ${await response.text()}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  await writeFile(join(here, 'segments', `${segment.id}.mp3`), bytes);
  console.log('generated', segment.id, bytes.length);
  receipts.push({id: segment.id, status: response.status, bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex')});
}
await writeFile(join(here, 'receipt.json'), `${JSON.stringify({
  provider: script.voice.provider,
  model: script.voice.model,
  speakerKey: script.voice.speakerKey,
  voiceId: script.voice.voiceId,
  scriptRevision: script.revision,
  generatedAt: new Date().toISOString(),
  usageRights: 'JR Academy production narration under configured ElevenLabs account',
  segments: receipts,
}, null, 2)}\n`);
