# JR Academy / 匠人学院 — Master Design System

> **v4.2 Brand Board · 2026-05-24** — 24 panel 完整设计系统 + 牛小匠资产库 + Voice & Tone + Brand Family
>
> **学 AI 来匠人 · STUDY AI AT JR ACADEMY**
> 一起成为 AI 时代的匠人 · Be an AI Craftsman.
>
> 专业的 AI 学习平台 · 课程 · 实战 · 就业
>
> ---
>
> 🌐 **在线手册**: <https://jr-academy-ai.github.io/jr-academy-brand/>
>
> 总品牌 UI 规范 / 设计系统，不是产品代码。双击 `index.html` 就能看，或直接访问上面的在线版本。
> JR Academy 是母品牌，UniMate AI / Cert Master / Job Hunter 是子品牌。

---

## AI / Codex / Claude 必读

当前 `index.html` 是唯一视觉 source of truth。所有 AI 写 JR Academy 主品牌前端时，必须按这个 Brand Board 来：

- 暖白页面底：`#FFFCF6`
- 暖白卡片：`#FFFDF8`
- 浅橙细边：`#F3D8B5`
- 大面板 16px 圆角，产品卡/按钮/输入框 8px 圆角
- 黑色主按钮：`#0D0F12` 背景 + 白字
- 红色只做编号、强调、danger、少量进度高亮：`#FF4D4F`
- AI/学习 tag/focus 用紫色：`#7B61FF`
- 成功用绿色 `#22C55E`，警告/成就用黄色 `#FFC84D`
- 不再使用旧冷灰蓝背景、旧大蓝紫主调、全 pill 按钮、重黑粗边大阴影

任何项目落地前先对照 `index.html` 的 13 个模块：
Brand / Colors / Typography / Buttons / Inputs / Chips / Icons / Navigation / Cards / Feedback / Progress / Table / Product Section Cards.

---

## 目录结构

```
jr-academy-brand/
├── index.html              ← Brand Board（13 个模块，AI 写 UI 的视觉准绳）
├── DESIGN.md               ← 完整设计规范 + AI Implementation Rules
├── _source_design.md       ← 原始设计研究稿（存档）
├── tokens/
│   ├── tokens.json         ← Design tokens 源数据（W3C 格式）
│   └── tokens.css          ← CSS Variables（--jr-*），任何项目 import 即可用
└── assets/
    ├── logo/               ← Logo 5 件套（TODO — logo 还在设计中）
    ├── mascot/             ← 牛小匠 11 视图 + 8 动作（TODO）
    ├── illustrations/      ← 4 大场景插画（探索方向 / 提升能力 / 链接机会 / 成长未来）
    ├── banners/            ← Hero banner / 推广 banner
    └── _inbox/             ← 待分类
```

---

## 用法

### 看规范
双击 `index.html`，13 个模块：
Brand / Colors / Typography / Buttons / Inputs / Chips / Icons / Navigation / Cards / Feedback / Progress / Table / Product Section Cards.

### 读设计决策
`DESIGN.md` — 完整 13 节规范，包含：
- 品牌定位（母品牌 vs 三个子品牌）
- 牛小匠 IP 详解（11 视图 + 8 动作）
- 用色决策树
- 组件规范
- Voice & Tone
- **四品牌隔离规则**

### 在产品里用 tokens

```css
@import url('path/to/jr-academy-brand/tokens/tokens.css');

.cta-primary {
  background: var(--jr-black);
  color: white;
  border-radius: var(--jr-radius-sm);
  padding: 0 var(--jr-space-6);
  height: 40px;
  font-weight: 700;
}

.progress {
  background: var(--jr-purple); /* 学习进度用紫，不要用 Coral */
}
```

CSS 前缀 `--jr-*` 跟 `--um-*` / `--cm-*` / `--jh-*` 完全隔离，四个品牌可同 import。

---

## 品牌 DNA（一句话）

> **AI 时代的全球华人学习陪伴品牌** — 不是普通教育平台 UI，而是有明确 IP 记忆点的 AI 学习陪伴型品牌系统。

四条不可妥协：**黑色主 CTA · 红色编号/强调 · 牛小匠品牌 IP · 暖白底 + 浅橙细边**。

---

## 子品牌生态

```
JR Academy (匠人学院 · 母品牌)    ← 本仓库
├── UniMate AI / 牛小匠课代表    — 大学生学习陪伴
├── Cert Master / 考证匠         — 考证 (注会 / 一建 / 法考)
└── Job Hunter / 求职匠          — 求职 (JD 分析 / 简历 / 面试)
```

总品牌 ↔ 子品牌的隔离规则见 `DESIGN.md §13`。

---

## 红线（看到立即打回）

- ❌ 大块 bg 用 Red（红只做编号 / 强调 / danger）
- ❌ Purple 当主 CTA（紫是 AI / 学习 tag / focus）
- ❌ 蓝色作主 CTA（那是 Job Hunter 子品牌的）
- ❌ 旧冷灰蓝底 `#F7F8FC` / `#F8FBFF`
- ❌ 全 pill 按钮（普通按钮必须 8px）
- ❌ 默认 20px/24px 大圆角产品卡片
- ❌ 牛小匠去掉品牌识别特征
- ❌ 一屏用两套不同 outfit 的牛小匠
- ❌ 旧吉祥物 + 牛小匠混用
- ❌ "您 / 智能化 / 宝子"

---

## 牛小匠 11 视图

Front · Side · Back · Sitting · Laptop · Tablet · Wave · Like · Thinking · Teaching · Celebration

## 高频 8 动作

开心 · 思考 · 点赞 · 讲解 · 努力 · 庆祝 · 疑问 · 加油

---

## 待补 (TODO)

**v4.2 已完成（2026-05-24）**：
- [x] Brand Board 13 panel finalize（暖白底 + 红编号胶囊 + 黑色 CTA + 8px 圆角）
- [x] emoji → lucide SVG 全替换（6 处）
- [x] 牛小匠头像风格统一（hero 用 official 全身，其他场景按语义选 chibi/heads）
- [x] 资产库 panel 合并 37→24（mascot/chibi/sub-brand/illustration 分组聚焦）
- [x] `--jr-icon-*` token namespace + DESIGN.md §0.5 Icon System

**v4.3+ roadmap**：
- [ ] Dashboard 示例 panel（学习中心 / Admin 后台 / 数据可视化标准布局）
- [ ] Mobile 示例 panel（H5 / 小程序 / RN 布局规范）
- [ ] 互动 demo（hover / focus / active 动态演示）
- [ ] dark mode token（`--jr-paper-dark` / `--jr-panel-dark` 一套）
- [ ] TypeScript `tokens.ts`（给 React/TS 项目直接 import）
- [ ] Style Dictionary 多端输出（Tailwind preset / iOS swift / Android xml）
- [ ] Logo 5 件套终稿（JR Box / 横版 / 紧凑 / Avatar / App Icon — 当前 10 个版本待精选）
- [ ] Style Dictionary 配置 — 输出 Tailwind preset / iOS / Android

---

## Deploy

GitHub Pages auto-deploy via `.github/workflows/deploy.yml` — push to `main` 自动构建发布。

- **在线访问**: <https://jr-academy-ai.github.io/jr-academy-brand/>
- **Repo**: <https://github.com/JR-Academy-AI/jr-academy-brand>

---

## 维护

- 源 spec 图：放 `assets/mascot/spec-sheet.png`
- 原始设计稿：`_source_design.md`
- 最近更新：2026-05-24

任何 token 改动**三处同步**：`DESIGN.md` → `tokens.json` → `tokens.css`。
冲突时以 `DESIGN.md` 为准。
