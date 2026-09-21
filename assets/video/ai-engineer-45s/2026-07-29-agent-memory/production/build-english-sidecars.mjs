#!/usr/bin/env node

import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const episodeRoot = path.resolve(here, '..');
const manifest = JSON.parse(
  readFileSync(
    path.join(episodeRoot, 'public/audio/elevenlabs-en/manifest.json'),
    'utf8',
  ),
);
const outDir = path.join(episodeRoot, 'out');
mkdirSync(outDir, {recursive: true});

const timestamp = (seconds) => {
  const milliseconds = Math.round(seconds * 1000);
  const hours = Math.floor(milliseconds / 3600000);
  const minutes = Math.floor((milliseconds % 3600000) / 60000);
  const secs = Math.floor((milliseconds % 60000) / 1000);
  const millis = milliseconds % 1000;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')},${String(millis).padStart(3, '0')}`;
};

let cursor = 0.3;
const cues = manifest.segments.map((segment, index) => {
  const start = cursor;
  const end = start + segment.durationSeconds;
  cursor = end + (segment.pauseAfterSeconds ?? 0);
  return `${index + 1}\n${timestamp(start)} --> ${timestamp(end)}\n${segment.text}\n`;
});

writeFileSync(
  path.join(outDir, 'captions.tiktok.en-AU.srt'),
  `${cues.join('\n')}\n`,
);
writeFileSync(
  path.join(outDir, 'transcript.tiktok.en-AU.txt'),
  `${manifest.segments.map((segment) => segment.text).join('\n\n')}\n`,
);
