from pathlib import Path
import subprocess, json, hashlib

p = Path(__file__).resolve().parent
script = json.loads((p / 'edit-cues.json').read_text())
raw = p / 'generated/cgt-20260918100043-15arm.mp4'
cmd = ['ffmpeg', '-hide_banner', '-loglevel', 'warning', '-y', '-i', str(raw)]
cmd += ['-loop', '1', '-framerate', '24', '-i', str(p / 'overlays/end-card.png')]
overlays = [s for s in script['segments'] if s['id'] != 'brand']
for s in overlays:
    cmd += ['-loop', '1', '-framerate', '24', '-i', str(p / 'overlays' / (s['id']+'.png'))]
for s in script['segments']:
    cmd += ['-i', str(p / 'segments' / (s['id']+'.mp3'))]
f = ['[0:v]trim=duration=30,setpts=PTS-STARTPTS,setsar=1,fps=24[v0]',
     '[1:v]trim=duration=8,setpts=PTS-STARTPTS,format=yuv420p,setsar=1[card]',
     '[v0][card]concat=n=2:v=1:a=0[base]']
prev = 'base'
for idx,s in enumerate(overlays,2):
    out = 'ov'+str(idx)
    f.append(f"[{prev}][{idx}:v]overlay=enable='between(t,{s['start']},{min(s['end'],29.9)})':eof_action=repeat[{out}]")
    prev = out
f += [f'[{prev}]format=yuv420p[vout]']
tracks = []
for idx,s in enumerate(script['segments'],2+len(overlays)):
    out='n'+str(idx)
    f.append(f'[{idx}:a]aresample=48000,volume=0.65,adelay={int(s["start"]*1000)}:all=1[{out}]')
    tracks.append('['+out+']')
f += [''.join(tracks)+f'amix=inputs={len(tracks)}:normalize=0,apad,atrim=duration=38,asplit=2[voice][control]',
      '[0:a]asplit=2[ab][at]',
      '[ab]atrim=duration=30,asetpts=PTS-STARTPTS[bgmain]',
      '[at]atrim=start=21:end=30,asetpts=PTS-STARTPTS[bgtail]',
      '[bgmain][bgtail]acrossfade=d=1:c1=tri:c2=tri,volume=0.5,afade=t=out:st=35:d=3[bg]',
      '[bg][control]sidechaincompress=threshold=0.025:ratio=5:attack=30:release=300[duck]',
      '[duck][voice]amix=inputs=2:normalize=0,alimiter=limit=0.95,atrim=duration=38[aout]']
(p/'render-filter.txt').write_text(';\n'.join(f))
out=p/'AI-Engineer-Cohort-7-door-v2-review.mp4'
cmd += ['-filter_complex_script',str(p/'render-filter.txt'),'-map','[vout]','-map','[aout]',
        '-c:v','libx264','-preset','fast','-crf','18','-c:a','aac','-b:a','192k','-ar','48000',
        '-t','38','-movflags','+faststart',str(out)]
subprocess.run(cmd,check=True)
receipt={'duration':38,'video':out.name,'sha256':hashlib.sha256(out.read_bytes()).hexdigest(),
         'cueSha256':hashlib.sha256((p/'edit-cues.json').read_bytes()).hexdigest(),
         'audio':'Native Seedance instrumental/ambience mixed with backend ElevenLabs Amy eleven_v3 narration',
         'status':'pending_final_review'}
(p/'render-receipt.json').write_text(json.dumps(receipt,indent=2))
print(out)
