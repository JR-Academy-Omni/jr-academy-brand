# AI Engineer 45s — Agent Memory V5

49 秒、1080×1920、30fps 的 Remotion 竖屏技术图解。V6 以 JR Academy
AI News 的编辑视觉为质量基线：奶油纸张与深色技术场交替、大号结论、真实数据关系、
克制圆角与软阴影；不再使用旧版硬描边卡片拼贴。

## 一句话判断

聊天历史是 Memory 的输入原料，不是完整的 Agent Memory 系统；工程上还要管理
写入、检索和删除。

## 六个镜头

| 帧 | 镜头 | 证明内容 |
|---:|---|---|
| 0–291 | History / live input | 消息堆叠只是当前上下文 |
| 292–509 | Thread boundary | 换 Thread 后历史可能不可用 |
| 510–682 | Three lifetimes | 任务状态、短期记忆、长期记忆 |
| 683–1000 | 127 → 1 | 重放大量消息与结构化偏好的成本差异 |
| 1001–1265 | Retrieval | user ID → Memory → Context |
| 1266–1469 | Takeaway | 写入、检索、删除才构成系统 |

## 音频

- 旁白：ElevenLabs Amy，`eleven_v3`，分六段定向生成。
- 英文术语：通过 IPA 发音词典固定 `Agent / Thread / Context / Memory /
  TypeScript / ID` 等读音；Scribe v2 回听已正确识别全部术语。
- 密钥：只从 JR Academy Admin AI Settings 读取，不写入任何产物。
- 系统 TTS：禁止；`systemTtsFallbackAllowed: false`。服务不可用时脚本直接失败。
- BGM：复用 AI News 已生成的 Volcengine Seed Audio 原创电影科技配乐，并拉伸为
  49 秒；原始生成参数与哈希见 AI News provenance。
- 交付：带 BGM 与无 BGM 两个母带；无 BGM 版保留旁白和 SFX。

## 运行

```bash
npm install
node production/generate-elevenlabs-narration.mjs
npx remotion render src/index.ts AgentMemory out/master-bgm.mp4 \
  --props='{"withBgm":true}'
npx remotion render src/index.ts AgentMemory out/master-no-bgm.mp4 \
  --props='{"withBgm":false}'
```

## 安全区

核心标题和关系图位于横向 54px 以上的安全区；所有可读文字不低于 50px。
中文主标题使用 Noto Serif SC Black，技术标签与数字使用 ZCOOL QingKe
HuangYou，正文使用 Noto Sans SC 系列，形成技术杂志式字体层级。场景标题为
68–150px，烧录中文字幕为 66px，位于底部 270px、最小高度 170px，适配竖屏
平台 UI。封面使用第 90 帧。
