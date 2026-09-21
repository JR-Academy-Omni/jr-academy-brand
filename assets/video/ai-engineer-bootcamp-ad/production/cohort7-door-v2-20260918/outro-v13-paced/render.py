from pathlib import Path
import subprocess,json,datetime,shutil
p=Path('/Users/lightman/Documents/sites/jr-academy-ai/jr-academy-brand/assets/video/ai-engineer-bootcamp-ad/production/cohort7-door-v2-20260918')
d=p/'outro-v13-paced';d.mkdir(exist_ok=True)
s=p/'outro-v12-seedance/AI-Engineer-Cohort-7-seedance-v12.mp4';v=d/'AI-Engineer-Cohort-7-paced-v13-final.mp4'
def ff(a):subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y']+list(map(str,a)),check=True)
ff(['-t','30','-i',s,'-ss','30','-i',s,'-filter_complex','[0:v]setpts=(PTS-STARTPTS)/1.2,fps=24[fast];[1:v]setpts=PTS-STARTPTS[tail];[0:a]asetpts=PTS-STARTPTS,atempo=1.2,apad,atrim=duration=25[af];[1:a]asetpts=PTS-STARTPTS[at];[fast][af][tail][at]concat=n=2:v=1:a=1[v][a]','-map','[v]','-map','[a]','-c:v','libx264','-threads','4','-preset','fast','-crf','18','-pix_fmt','yuv420p','-c:a','aac','-b:a','192k','-ar','48000','-t','48.5','-movflags','+faststart',v])
ff(['-xerror','-i',v,'-f','null','-'])
ff(['-i',v,'-vf','fps=1/4,scale=480:270,tile=4x3','-frames:v','1',d/'contact.jpg'])
shutil.copy2(p/'outro-v12-seedance/cover.jpg',d/'cover.jpg')
e=json.loads((p/'outro-v12-seedance/entry.json').read_text());e.update(durationSeconds=48.5,description='48.5秒内部审片。开头30秒剧情以1.2倍速压缩为25秒，音频同步变速保持音调；后续课程介绍、十层技术栈与海外六国页保持正常速度。复用既有素材，无新增Seedance生成。未获社媒发布授权。',verifiedAt=datetime.datetime.now(datetime.timezone.utc).isoformat());(d/'entry.json').write_text(json.dumps(e,ensure_ascii=False,indent=2))
(d/'edit.json').write_text(json.dumps({'source':str(s),'introSourceSeconds':30,'introSpeed':1.2,'introOutputSeconds':25,'tailSpeed':1,'durationSeconds':48.5,'audio':'atempo=1.2, preserves pitch','newGeneration':False},indent=2))
print(v)
