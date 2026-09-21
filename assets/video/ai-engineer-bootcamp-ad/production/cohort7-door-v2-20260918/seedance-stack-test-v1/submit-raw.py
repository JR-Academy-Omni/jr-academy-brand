from pathlib import Path
import json,os,subprocess
p=Path(__file__).parent
assert 'Decision: PASS' in (p/'PREFLIGHT_RAW_REVIEW.md').read_text()
assert not (p/'submission-raw.json').exists()
e=os.environ.copy();e.update(ARKCLI_NO_UPDATE_NOTIFIER='1',ARKCLI_CALLER_TYPE='ai_agent',ARKCLI_CALLER_NAME='codex',ARKCLI_SKILL_NAME='arkcli-gen')
with (p/'submission-raw.json').open('w') as o,(p/'submission-raw.stderr').open('w') as err:r=subprocess.run(['arkcli','api','arkruntime.create_content_generation_task','--params',(p/'raw-request.json').read_text(),'--format','json'],env=e,stdout=o,stderr=err)
print('exit',r.returncode);print((p/'submission-raw.json').read_text());print((p/'submission-raw.stderr').read_text())
