# JR Academy / 匠人学院 — Master Design System

> **v5.3 Register System · 2026-07-08** — 官网默认 Register A 精致软风；Neo-Brutalism 收敛为 Register B 物料风格
>
> **学 AI 来匠人 · STUDY AI AT JR ACADEMY**
> 一起成为 AI 时代的匠人 · Be an AI Craftsman.
>
> 专业的 AI 学习平台 · 课程 · 实战 · 就业
>
> ---
>
> 🌐 **在线手册**: <https://jr-academy-omni.github.io/jr-academy-brand/>
>
> 总品牌 UI 规范 / 设计系统，不是产品代码。双击 `index.html` 就能看，或直接访问上面的在线版本。
> JR Academy 是母品牌，UniMate AI / Cert Master / Job Hunter 是子品牌。

---

## AI / Codex / Claude 必读

先读 `DESIGN.md` §0.0 / §0.0A / §0.0B，再决定 register。不要只看 `index.html` 或 `tokens.css` 就把黑边硬阴影套到官网。

### Register A · 精致软风（官网默认）

适用：官网首页、landing、营销页、学习产品页、面向用户的产品 UI。

- 奶油底：`#FFFCF6` / `#FFF7F1`
- 白卡 + 1px 暖灰边：`#F1E8D8`
- 20-28px 圆角 + 柔多层阴影
- 主色：珊瑚 `#FB6A4A`
- AI 标志渐变：`#FF7A4D → #FF4F8F → #9B6BFF`
- 字体：Inter + Noto Sans SC / 思源黑体
- 必须有真实/无字生成插画、高保真产品预览、具体正文、数据/FAQ/互动工具等内容厚度
- 参考：`homepage-soft.html`、`jr-academy-web-zh/src/components/Pages/HomePage/HomeBrandLanding*`

### Register B · Neo-Brutalism（物料）

适用：讲课 deck、海报、zine、campaign 冲击物料、curriculum 课件。

- 暖底 `#fff1e7`
- 3px 黑边 + 直角 + `6px 6px 0 #000` offset 硬阴影
- Bricolage Grotesque + DM Sans + Space Mono
- 高冲击标题、贴纸感、强对比

官网主 UI 禁止大面积使用 Register B。

---

## 目录结构

```
jr-academy-brand/
├── index.html              ← Register B Brand Board（deck / poster / campaign 物料参考）
├── assets.html             ← 完整图片资产库（按 assets/ 全量生成 132 个资产卡片）
├── DESIGN.md               ← 完整设计规范 + AI Implementation Rules
├── _source_design.md       ← 原始设计研究稿（存档）
├── tokens/
│   ├── tokens.json         ← Design tokens 源数据（W3C 格式）
│   └── tokens.css          ← CSS Variables（--jr-*），任何项目 import 即可用
└── assets/
    ├── logo/               ← 当前 Logo + 历史备份
    ├── mascot/             ← 牛小匠官方图、头像、表情、Chibi、动作、子品牌形象
    ├── illustrations/      ← Career Impact / VI Boards 插画
    ├── decorations/        ← 手绘星星、箭头、划线装饰
    └── spec-sheet-*.png    ← 历史 / 当前规格总览图
```

---

## 用法

### 看规范
先读 `DESIGN.md` 的 register 分工。做官网页面看 `homepage-soft.html`；做 deck / poster / campaign 再看 `index.html`。

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
  background: var(--jr-soft-gradient-cta);
  color: white;
  border-radius: var(--jr-soft-radius-pill);
  padding: 0 var(--jr-space-6);
  height: 40px;
  font-weight: 700;
  box-shadow: var(--jr-soft-shadow-md);
}

.soft-card {
  background: var(--jr-soft-surface);
  border: 1px solid var(--jr-soft-line);
  border-radius: var(--jr-soft-radius-lg);
  box-shadow: var(--jr-soft-shadow-md);
}
```

CSS 前缀 `--jr-*` 跟 `--um-*` / `--cm-*` / `--jh-*` 完全隔离，四个品牌可同 import。

---

## 品牌 DNA（一句话）

> **AI 时代的全球华人学习陪伴品牌** — 不是普通教育平台 UI，而是有明确 IP 记忆点的 AI 学习陪伴型品牌系统。

官网四条不可妥协：**奶油底 · 珊瑚/AI 渐变 · 牛小匠品牌 IP · 真实内容厚度**。

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

- ❌ 官网主 UI 大面积 3px 黑边、直角、offset 硬阴影
- ❌ 官网主标题使用 Bricolage Grotesque
- ❌ 官网卡片只有纯色块 + icon，没有插画/产品预览/具体正文
- ❌ 生成图里出现文字、伪 logo、伪按钮文案
- ❌ 大块 bg 用 Red（红/珊瑚只做 CTA、强调、渐变）
- ❌ 蓝色作主 CTA（那是 Job Hunter 子品牌的）
- ❌ 旧冷灰蓝底 `#F7F8FC` / `#F8FBFF`
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

## 版本状态 / 历史记录

**v5.3 已完成（2026-07-08）**：
- [x] 官网默认 Register A 精致软风，Neo-Brutalism 收敛为 Register B 物料风格
- [x] `tokens.css` 新增 `--jr-soft-*` 官网 token
- [x] README / DESIGN.md / 根项目 agent 规则统一 Register A 判断口径
- [x] 明确 `index.html` 主要作为 Register B Brand Board，官网看 `homepage-soft.html`

**v4.2 已完成（2026-05-24）**：
- [x] Brand Board 13 panel finalize（暖白底 + 红编号胶囊 + 黑色 CTA + 8px 圆角）
- [x] emoji → lucide SVG 全替换（6 处）
- [x] 牛小匠头像风格统一（hero 用 official 全身，其他场景按语义选 chibi/heads）
- [x] `--jr-icon-*` token namespace + DESIGN.md §0.5 Icon System

**v4.3 已完成（2026-06-02）**：
- [x] 上半部分重排为新版 13 模块品牌板
- [x] 主 Logo 换为设计师正式 Logo 文件，cube 旧版保留在资产库
- [x] 下半部分按 `assets/` 当前文件全量展示 132 个资产卡片（含 spec sheet、backup、_inbox、吉祥物、Chibi、子品牌 mascot、插画）
- [x] 新增 `assets.html` 独立完整资产页，像 Cert Master 的设计稿参考页一样单独承载所有图片

**v4.4 已完成（2026-06-02）**：
- [x] 上半部分扩展为 18 模块标准设计系统
- [x] `学 AI 来匠人` 单独标语素材改为正式图片资产
- [x] 新增 Motion / Spacing / Elevation / States / Implementation Rules 模块
- [x] Motion 示例支持 entrance、hover lift、feedback pop、loading progress 和 `prefers-reduced-motion`

**v4.4+ roadmap**：
- [ ] Dashboard 示例 panel（学习中心 / Admin 后台 / 数据可视化标准布局）
- [ ] Mobile 示例 panel（H5 / 小程序 / RN 布局规范）
- [ ] dark mode token（`--jr-paper-dark` / `--jr-panel-dark` 一套）
- [ ] TypeScript `tokens.ts`（给 React/TS 项目直接 import）
- [ ] Style Dictionary 多端输出（Tailwind preset / iOS swift / Android xml）
- [ ] Logo 5 件套终稿（JR Box / 横版 / 紧凑 / Avatar / App Icon — 当前 10 个版本待精选）
- [ ] Style Dictionary 配置 — 输出 Tailwind preset / iOS / Android

---

## Deploy

GitHub Pages auto-deploy via `.github/workflows/deploy.yml` — push to `main` 自动构建发布。

- **在线访问**: <https://jr-academy-omni.github.io/jr-academy-brand/>
- **Repo**: <https://github.com/JR-Academy-AI/jr-academy-brand>

---

## 维护

- 源 spec 图：放 `assets/mascot/spec-sheet.png`
- 原始设计稿：`_source_design.md`
- 最近更新：2026-05-24

任何 token 改动**三处同步**：`DESIGN.md` → `tokens.json` → `tokens.css`。
冲突时以 `DESIGN.md` 为准。
