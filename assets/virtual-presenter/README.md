# JR Academy Virtual Presenter Library

JR Academy 课程视频与 YouTube 封面的固定虚拟女性讲师。该人物为 AI
生成的虚构成年人，不对应、不克隆、也不冒充任何真实人物。

锁定身份 ID：`jr-academy-presenter-amy-v1`

## Canonical Identity

- 母图：`jr-academy-virtual-presenter-master-v1.png`
- 机器可读身份规范：`IDENTITY.yml`
- 文件、用途与 SHA-256：`ASSET_MANIFEST.md`
- 透明人物素材：`cutouts/`
- 可重新抠图的绿幕源文件：`source-chroma/`
- 全库预览：`previews/pose-library-contact-sheet-v1.png`
- 年龄表达：约 30 岁
- 人物表达：华人女性技术讲师，专业、沉稳、亲切
- 固定特征：椭圆脸、深棕色眼睛、侧分齐肩黑发、银色耳钉
- 固定服装：珊瑚红西装外套、象牙白圆领上衣
- 摄影风格：真实商业摄影、自然皮肤纹理、克制表情与动作

## Usage Rules

1. 先从 `cutouts/` 选择已有姿势，禁止每次重新生成人物。
2. 素材库没有合适动作时，才允许用母图作为 image reference 新增姿势。
3. 可改变手势、机位和背景，不得改变脸型、发型、年龄表达和核心服装。
4. Amy 或其他女声作为主配音时，封面和数字人使用该女性讲师。
5. 不得给她真实姓名、履历、学员身份或讲师经历；对外披露 AI 合成内容时按平台要求选择 `Yes`。
6. 新素材必须运行 `build_cutouts.py`，登记 manifest，并检查脸、手、透明边缘和不同背景合成效果。

## Approved Derivatives

- `jr-academy-virtual-presenter-ccar-f-thumbnail-v2.png`
  - 1280 x 720
  - 文案：`Claude 证书` / `到底考什么？`
  - 对应课程资产：
    `curriculum/cca-f-cert-pack/public/assets/ccar-f-youtube-deep-dive-thumbnail-v2.png`
