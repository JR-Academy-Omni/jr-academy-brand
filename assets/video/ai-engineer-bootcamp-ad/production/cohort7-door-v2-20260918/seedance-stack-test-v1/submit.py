from pathlib import Path
import subprocess,os,json
p=Path(__file__).parent
assert 'Decision: PASS' in (p/'PREFLIGHT_REVIEW.md').read_text(), 'Preflight must PASS'
assert not (p/'submission.json').exists(), 'Submission receipt exists; reconcile instead'
j=json.loads((p/'package.json').read_text())
e=os.environ.copy();e.update(ARKCLI_NO_UPDATE_NOTIFIER='1',ARKCLI_CALLER_TYPE='ai_agent',ARKCLI_CALLER_NAME='codex',ARKCLI_SKILL_NAME='arkcli-gen')
a=['arkcli','+gen','--model',j['endpoint'],'--modality','video','--input','first:@'+str(p/'first.png'),'--input','last:@'+str(p/'last-three.png'),'--duration','8','--ratio','adaptive','--resolution','1080p','--generate-audio=true','--watermark=false','--save-to',str(p/'generated'),'--format','json',(p/'PROMPT.txt').read_text()]
with (p/'submission.json').open('w') as out,(p/'submission.stderr').open('w') as err:
 r=subprocess.run(a,env=e,stdout=out,stderr=err)
print('exit',r.returncode);print((p/'submission.json').read_text());print((p/'submission.stderr').read_text())
