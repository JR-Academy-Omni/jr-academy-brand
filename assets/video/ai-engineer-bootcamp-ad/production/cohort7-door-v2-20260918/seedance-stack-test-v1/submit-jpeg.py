from pathlib import Path
import json,os,subprocess
p=Path(__file__).parent
assert 'Decision: PASS' in (p/'PREFLIGHT_JPEG_REVIEW.md').read_text()
assert not (p/'submission-jpeg.json').exists()
e=os.environ.copy();e.update(ARKCLI_NO_UPDATE_NOTIFIER='1',ARKCLI_CALLER_TYPE='ai_agent',ARKCLI_CALLER_NAME='codex',ARKCLI_SKILL_NAME='arkcli-gen')
with (p/'submission-jpeg.json').open('w') as o,(p/'submission-jpeg.stderr').open('w') as err:r=subprocess.run(json.loads((p/'jpeg-args.json').read_text()),env=e,stdout=o,stderr=err)
print('exit',r.returncode);print((p/'submission-jpeg.json').read_text());print((p/'submission-jpeg.stderr').read_text())
