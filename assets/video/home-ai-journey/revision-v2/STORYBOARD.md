# JR homepage AI journey v2 storyboard

## Message

`从悉尼出发，打开 JR Box，进入 AI 世界，再把能力带回现实。`

## Identity locks

- 牛小匠不是写实牛头。锁定官方形象：白色人脸面罩、黑色头发轮廓、
  小牛角、黑色墨镜、红色 JR 运动套装；禁止牛鼻、牛嘴、鼻孔和写实牛脸。
- 主角是同一位年轻华人男性。服装可以随世界升级，但脸、年龄和发型不换人。
- “电影级英雄感”只用于构图、服装轮廓和角色能量，不复制任何现有漫威、
  DC、动漫或游戏角色。
- JR Box 使用官方 `assets/logo/jr-box.*`，模型生成画面只提供材质和空间；
  最终 Logo 由确定性合成层覆盖。

## Final 38.54-second continuous route

| Time | Shot | Action | Source |
| --- | --- | --- | --- |
| 00.00–04.69s | Sydney descent | 悉尼港高空俯视，沿珊瑚光线高速下潜到港边建筑 | New Seedance |
| 04.69–09.38s | Enter reality | 穿过玻璃进入房间，找到华人主角、正确人脸版牛小匠与桌上的 JR Box | New Seedance |
| 09.38–13.48s | Open the box | 官方 JR Box 侧板和顶盖展开，镜头穿入盒内并落到 AI 宇宙红色路径 | Official JR Box + New Seedance |
| 13.48–18.17s | Learn AI | 提示、创作、代码、数据、自动化与 Agent 节点沿路径组织起来 | Reuse v1 shot 02 |
| 18.17–22.86s | Pixel coding | 世界变成高速 voxel / coding 城市，主角与牛小匠继续向前 | Reuse v1 shot 03 |
| 22.86–27.55s | Ecosystem gateway | 穿过冷白和暖铜双门，合作身份保持后期确定性叠加 | Reuse v1 shot 04 |
| 27.55–32.24s | Hero identities | 主角与牛小匠双脚站定，镜头半环绕；AI 影像创作者、AI 工程师、AI 创业者三种空间从左右与后方展开，避免重复奔跑 | New Seedance v3 |
| 32.24–36.93s | Reality outcome | 从站定的身份空间直接溶解回悉尼现实工作室，移除原镜头开头的再次奔跑，保留项目成果与城市纵深 | Revised Seedance close |
| 32.24–36.93s | Return to Sydney | 回到悉尼真实创作空间；不同职业的人在 AI 工作台完成真实项目 | New Seedance |
| 36.93–38.54s | Close the box | 悉尼现实空间收拢为官方 JR Box，盒子闭合并落到 JR Academy 品牌签名 | Official JR Box |

## Transition grammar

- 主转场：持续向前的 camera push / zoom-through。
- 隐藏生成接缝：珊瑚像素、镜头过曝、门框遮挡和 JR Box 面板。
- 开场 JR Box 展开，结尾 JR Box 闭合，形成品牌括号。
- JR Box 与最终品牌签名使用官方确定性素材；牛小匠以官方人脸版参考图锁定并逐段视觉验收。
- 真实文案、CTA 与合作方标识不交给模型生成，留给网页 DOM 或后期确定性叠层。

## Outputs

- Master: `jr-home-ai-journey-seedance-v2.mp4`
- Web encode: `jr-home-ai-journey-seedance-v2-web.mp4`
- Master with narration, score and SFX: `jr-home-ai-journey-seedance-v2-sound.mp4`
- Web encode with narration, score and SFX: `jr-home-ai-journey-seedance-v2-sound-web.mp4`
- Audio-only preview: `audio/jr-home-ai-journey-soundtrack-v1.mp3`
- Reproducible assembly: `production/assemble-v2.sh`
- Reproducible sound mix: `production/generate-local-voiceover.sh` and
  `production/assemble-sound.sh`
- Visual QA:
  - `previews/final/contact-sheet.png`
  - `previews/final/box-opening.png`
  - `previews/final/box-closing.png`

无声视觉母片继续保留；声音版已经加入中文旁白、原创电影科技配乐和
九处镜头音效。网页 DOM 文案仍不烧录进画面，留给网站端独立控制。
