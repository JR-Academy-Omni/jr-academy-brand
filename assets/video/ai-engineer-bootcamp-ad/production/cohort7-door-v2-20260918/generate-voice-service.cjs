const path = require('node:path');
const fs = require('node:fs');
const crypto = require('node:crypto');
const root = process.cwd();
const req = require('node:module').createRequire(path.join(root, 'package.json'));
req('dotenv').config({path: path.join(root, '.env'), quiet: true});
process.env.TS_NODE_PROJECT = path.join(root, 'tsconfig.json');
req('ts-node/register/transpile-only');
req('tsconfig-paths/register');
req('reflect-metadata');
const mongoose = req('mongoose');
const {HttpService} = req('@nestjs/axios');
const {AiSettingsService} = req(path.join(root, 'src/modules/system-settings/services/ai-settings.service.ts'));
const {TtsService} = req(path.join(root, 'src/modules/classroom-engine/services/tts.service.ts'));
const {SystemSettingsSchema} = req(path.join(root, 'src/models/systemSettings.schema.ts'));
const p = __dirname;
const script = JSON.parse(fs.readFileSync(path.join(p, 'script.json')));
const sha = b => crypto.createHash('sha256').update(b).digest('hex');
(async () => {
  await mongoose.connect(process.env.MONGO_URI, {serverSelectionTimeoutMS: 20000, autoIndex: false, autoCreate: false});
  const model = mongoose.model('SystemSettings', SystemSettingsSchema);
  const current = await model.findOne({key: 'ai_settings'});
  if (!current?.aiSettings?.providers?.elevenlabs?.apiKey) throw new Error('ElevenLabs DB configuration unavailable');
  const tts = new TtsService(new AiSettingsService(model, new HttpService()));
  fs.mkdirSync(path.join(p, 'segments'), {recursive: true});
  const manifest = {provider: 'elevenlabs-tts', model: 'eleven_v3', speakerKey: 'amy', voiceId: script.voice.voiceId, scriptRevision: script.revision, scriptSha256: sha(fs.readFileSync(path.join(p, 'script.json'))), generatedThrough: 'backend TtsService with real AiSettingsService and database model', generatedAt: new Date().toISOString(), usageRights: 'JR Academy original advertising narration under configured ElevenLabs account', segments: []};
  for (const s of script.segments) {
    const target = path.join(p, 'segments', s.id + '.mp3');
    if (!fs.existsSync(target)) {
      const r = await tts.synthesize({providerId: 'elevenlabs-tts', modelId: 'eleven_v3', voice: script.voice.voiceId, speed: 1}, s.text);
      fs.writeFileSync(target, Buffer.from(r.audio));
    }
    const bytes = fs.readFileSync(target);
    manifest.segments.push({id: s.id, audioSha256: sha(bytes), textSha256: sha(s.text), bytes: bytes.length});
    fs.writeFileSync(path.join(p, 'voice-receipt.json'), JSON.stringify(manifest, null, 2));
    console.log('voice ready', s.id, bytes.length);
  }
  await mongoose.disconnect();
})().catch(async e => {console.error(e.message); await mongoose.disconnect(); process.exit(1);});
