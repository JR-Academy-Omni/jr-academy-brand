# JR Academy / 匠人学院 — Design System (Master Brand)

> **总品牌设计规范文档**。目标读者：Claude / 设计师 / 前端 / 内容运营。
> JR Academy 是母品牌，UniMate AI / Cert Master / Job Hunter 都是它的子产品 — 子产品的设计系统在各自仓库，本文件只定义**总品牌**（官网 / Dashboard / AI 职业诊断 / 社区）的视觉标准。
>
> 配套文件：
> - `index.html` — 18 模块标准设计系统 + 资产摘要
> - `assets.html` — 完整图片资产库
> - `tokens/tokens.json` — W3C Design Tokens 源数据
> - `tokens/tokens.css` — `--jr-*` CSS 变量
> - `README.md` — 仓库使用说明
> - `_source_design.md` — 原始设计研究稿（存档）
>
> Last updated: 2026-06-02 · **v4.4 Brand Board**

---

## 0. AI Implementation Rules（所有 AI 写代码必须先读）

`jr-academy-brand/index.html` 是当前视觉 source of truth。任何 AI / Codex / Claude / 设计实现，必须按这张 Brand Board 写 UI，不能再沿用旧 UI Kit。

### 0.1 当前品牌风格

| 维度 | 规范 |
|------|------|
| 页面底色 | 暖白 `#FFFCF6`，可叠很轻的黄色点阵；不要冷灰蓝底 |
| 卡片 | 暖白 `#FFFDF8`，1px 浅橙边 `#F3D8B5`，大区块圆角 16px，产品/控件卡片圆角 8px |
| 编号标题 | 红色胶囊 `#FF4D4F` + 白字，例如 `01`、`02` |
| 主按钮 | 黑色 `#0D0F12` 背景，白字，8px 圆角，右箭头 |
| 次按钮 | 暖白/透明底，黑色 1px 边，8px 圆角 |
| Tags | 紫色浅底 `#F1EEFF` + 紫色文字；状态 pill 用蓝/绿/灰/红浅底 |
| 装饰 | 少量黄色 sparkle、黑色手绘箭头/线条；只放 hero/品牌板/空状态，不进数据表 |
| 字体 | 中文 Source Han Sans / 思源黑体；英文 Inter |
| 字号 | H1 32px Bold；H2 24px Bold；H3 18px Semibold；Body 14px；Caption 12px |

### 0.2 禁止继续使用的旧风格

- 禁止把 `#FF4D4F` 当大面积主 CTA 以外的底色；红色主要用于编号、强调、danger、progress highlight。
- 禁止冷灰蓝大底：`#F7F8FC`、`#F8FBFF` 不能作为新版主背景。
- 禁止旧皇家蓝/旧蓝紫主调：`#5B4BFF`、`#6843FF`、`#6366F1` 不能作为主品牌色，统一换成 `#7B61FF`。
- 禁止大面积 20px/24px 圆角产品卡片；基础控件和卡片默认 8px，只有 Brand Board 大面板可 16px。
- 禁止重 neo-brutalism 黑粗边 + 大硬阴影作为默认风格；新版是轻边框、暖白卡片、轻阴影。
- 禁止把按钮做成全 pill；普通按钮 8px，只有 tag/status/avatar 使用 pill。

### 0.3 AI 写代码时的最小落地清单

1. 先 import/use `tokens/tokens.css` 或把等价 token 映射到项目 design tokens。
2. 页面背景用 `--jr-surface-canvas`。
3. 卡片用 `--jr-surface-panel + --jr-border-warm + --jr-radius-panel/--jr-radius-card`。
4. 主操作按钮用黑底 `--jr-black`，不是红底。
5. AI/学习类 tag、focus、进度辅助色用 `--jr-purple`。
6. 成功/完成用 `--jr-green`，警告/成就用 `--jr-yellow`，错误/强调用 `--jr-red`。
7. **Icon 用 lucide 24×24 + 2px stroke + currentColor**，禁用 emoji 占位（详见 §15 Icon System）。
8. 修改后打开 `jr-academy-brand/index.html` 对照 01-18 模块自检。

### 0.4 v4.1 → v4.2 Changelog（2026-05-24）

本次 polish 修复了 5 类视觉一致性问题：

1. **Emoji → Lucide SVG（6 处）**：panel 01 brand 4 个 pill 图标（📖→book / ⚡→zap / 📈→trending-up / 🤝→users）、panel 04 删除按钮（🗑→trash-2）、panel 09 功能卡（🤖→bot）全部换成 inline SVG。
2. **牛小匠头像统一（panel 01）**：从 `heads/01-default.png` 改用 `official/01-hero-fullbody.png`，hero 场景用全身形象更有张力。
3. **资产库 panel 合并（20 → 11）**：14 logo / 15 装饰（shapes+highlights+scatter）/ 16-19 牛小匠分类（官方+表情/头像+半身+服装/工作+生活+变体/Chibi 全套）/ 20 子品牌 / 21-22 插画 / 23 品牌定位+Voice / 24 Do-Don't+Family — 减少视觉散乱。
4. **Icon Token 命名空间**：`tokens.css` + `tokens.json` 新增 `--jr-icon-*` / `component.icon` 一套（size / size-sm / size-lg / stroke / color / radius）。
5. **DESIGN.md §15 Icon System** 新增章节，明确 lucide 来源、token 引用、`.icon-grid--lucide` 用法。

v4.4+ roadmap（不在本次范围）：Dashboard / Mobile 示例 panel、dark mode token、TypeScript `tokens.ts`、Style Dictionary 多端输出。

### 0.5 Icon System (v4.2 新增)

**来源**：[lucide.dev](https://lucide.dev/) — MIT 协议，约 1500+ icon，跨产品免费用。

**规范**：

| 维度 | 规则 | Token |
|------|------|-------|
| viewBox | 严格 `0 0 24 24` | — |
| 尺寸默认 | 24×24 | `--jr-icon-size: 24px` |
| 尺寸小 | 18×18（pill / tag / inline） | `--jr-icon-size-sm: 18px` |
| 尺寸大 | 32×32（hero / feature） | `--jr-icon-size-lg: 32px` |
| 描边 | `stroke-width="2"`，无填充 | `--jr-icon-stroke: 2` |
| 色彩 | `stroke="currentColor"`，靠父级 `color` 控色 | `--jr-icon-color: currentColor` |
| 端头 | `stroke-linecap="round" stroke-linejoin="round"` | — |
| 圆角变体 | `.icon-grid--lucide` + `border-radius: 50%` | `--jr-icon-radius: 4px` |
| 填充变体 | `star/flag/heart` 等 solid glyph 用 `fill="#FFC84D"` | — |

**禁用**：

- ❌ emoji 当 icon（💡⚡🤖🗑 等）— 高清屏模糊，不能换色，无法统一品牌
- ❌ Font Awesome / Material Icons — 字体依赖大，跟 lucide 视觉不一致
- ❌ 自定义 SVG 不遵守 24×24 viewBox / 2px stroke — 跟 lucide 配合时大小不一致

**用法示例**：

```html
<!-- 标准用法 -->
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
     stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="..."/>
</svg>

<!-- 跨产品复用 — 用 token 控制尺寸 -->
<svg style="width: var(--jr-icon-size); height: var(--jr-icon-size)"
     viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  ...
</svg>
```

**导出工作流**：在 lucide.dev 复制 SVG → 粘贴到代码 → 把 `<svg>` 属性补全（`fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`）→ inline 到 HTML。

**当前 brand board 用了哪些 lucide icon**：home / book-open / cap (graduation-cap) / clipboard / users / cpu / trending-up / award / message-circle / settings / star / download / share / calendar / help-circle / book-open / zap / trash-2 / bot — 共 19 个，全部 inline 在 `index.html` panel 01 / 04 / 07 / 09。

---

## 目录

1. [品牌定位](#1-品牌定位)
2. [品牌 DNA](#2-品牌-dna)
3. [Mascot 系统 · 牛小匠](#3-mascot-系统--牛小匠)
4. [Color 系统](#4-color-系统)
5. [Typography 系统](#5-typography-系统)
6. [Spacing · Radius · Shadow](#6-spacing--radius--shadow)
7. [Logo 系统](#7-logo-系统)
8. [组件规范](#8-组件规范)
9. [Voice & Tone](#9-voice--tone)
10. [Motion](#10-motion)
11. [Do / Don't 红线](#11-do--dont-红线)
12. [Asset 目录映射](#12-asset-目录映射)
13. [四品牌隔离规则](#13-四品牌隔离规则)
14. [装饰元素 · Decorations](#14-装饰元素--decorations)
15. [Chibi 资产批次 · 2026-05-13](#15-chibi-资产批次--2026-05-13)

---

## 1. 品牌定位

**JR Academy / 匠人学院** — 全球华人 AI 学习第一站。

| 维度 | 内容 |
|------|------|
| **一句话** | 学 AI 来匠人 |
| **English** | STUDY AI AT JR ACADEMY. |
| **子口号** | 一起成为 AI 时代的匠人· Be an AI Craftsman. |
| **场景** | AI 职业诊断 / Bootcamp / 学习路径 / 课程中心 / 成长测评 / 社区 |
| **目标用户** | 全球华人 — 学生 / 转行者 / 求职者 / 职场人，都通过 JR 主站入口 |
| **三关键词** | **AI 时代感** + **可信赖教育** + **年轻陪伴感** |

### 子产品三角

JR Academy 是**总品牌**（母品牌），下面有 3 个独立的 AI 产品：

```
JR Academy (匠人学院 · 总品牌)
├── UniMate AI / 牛小匠课代表       — 大学生学习陪伴
├── Cert Master / 考证匠           — 考证 (注会 / 一建 / 法考)
└── Job Hunter / 求职匠            — 求职 (JD 分析 / 简历 / 面试)
```

总品牌负责：**官网入口 / Dashboard / AI 职业诊断 / 社区活动 / 跨产品成长路径**。
子产品负责：**各自垂直场景的完整体验**。

### 总品牌不做什么

- 不做单一垂直场景（学习 → UniMate；考证 → Cert Master；求职 → Job Hunter）
- 不做内容生产（视频教程 / 题库等放在子产品）
- 不做交易（订单 / 支付都在子产品里）

---

## 2. 品牌 DNA

### 一句话
**AI 时代的全球华人学习陪伴品牌** — 不是普通教育平台 UI，而是有明确 IP 记忆点的 AI 学习陪伴型品牌系统。

### 三关键词

1. **AI 时代感** — 面向 AI 学习、职业成长、技能升级
2. **可信赖的教育品牌** — 界面清晰、结构专业、学习路径明确
3. **年轻、有陪伴感** — 通过牛小匠降低学习压力，增强陪伴感

### 牛小匠承担的 3 角色

1. **品牌识别角色** — 让用户一眼记住 JR Academy
2. **学习陪伴角色** — 诊断 / 课程 / 任务 / 反馈中陪伴用户
3. **成长激励角色** — 通过可爱、积极、有行动力的形象鼓励持续学习

### 四条不可妥协（看到就打回）

| 铁律 | Why |
|------|-----|
| **Coral Red `#FF4D4F`** 做主 CTA | 品牌红 — 红 JR 连帽衫是牛小匠的核心识别 |
| **牛小匠 + 红 JR 连帽衫 + 墨镜 + JR 胸标** | 缺一不可 — 服装色 / 墨镜 / 胸标是品牌资产 |
| **JR Box（盒子 logo）+ 学 AI 来匠人口号** | 这是品牌叙事核心，不要改动 |
| **米白 `#FAFAFA`** 大面积 bg | 教育产品的专业感来自干净 + 暖白底（不要纯白冷灰） |

### 跟主要竞品的差别

| 品牌 | 主色 | 角色 | 调性 |
|------|------|------|------|
| 极客时间 | 蓝 | 无 | 严肃技术 |
| 得到 | 黄 | 无 | 知识付费 |
| 网易公开课 | 红 | 无 | 综合大平台 |
| **JR Academy** | **Coral `#FF4D4F`** | **牛小匠 IP** | **AI 时代 + 陪伴感** |

---

## 3. Mascot 系统 · 牛小匠

### 3.1 IP 设定

| 属性 | 内容 |
|------|------|
| 中文名 | 牛小匠 |
| 英文 | Niu Xiaojiang |
| 角色身份 | JR Academy AI 学习伙伴 / 职业成长陪伴官 |
| 出身 | 匠人学院 IP 体系核心角色 |

### 3.2 视觉特征（不可妥协）

- 黑白小牛 / 小匠人形象
- 小牛角 — 圆润可爱，**不能凶猛**
- 黑色头发或牛头轮廓，整体偏圆
- **戴黑色墨镜** — 增强酷感和记忆点
- **穿红色 JR 连帽衫**（hoodie）或红色运动套装
- **胸前 `JR` 标识** — 品牌锚点
- 表情积极、自信、友好
- 线条圆润 — 适合 UI、贴纸、头像、课程卡片、小图标

### 3.3 风格方向

| ✅ Do | ❌ Don't |
|-------|---------|
| 柔和 / 轻量 / 现代插画感 | 写实 / 厚重 / 3D 化 |
| 表情亲和 | "黑酷"风 / 严肃 |
| 红色衣服 + 干净色 | 衣服换色 / 复杂 pattern |
| 适合 hero / 引导 / 提示 / 反馈 | 攻击性表情 / 凶猛牛角 |

### 3.4 必备 11 视图

| View | 用途 |
|------|------|
| Front 正面 | 默认头像 / Avatar |
| Side 侧面 | 走动 / 引导 |
| Back 背面 | 引导下一步 / "跟我来" |
| Sitting 坐姿 | 学习提示 / 课程页 |
| Laptop 拿电脑 | Coding / 在线学习 |
| Tablet 拿平板 | 移动学习 / 笔记 |
| Wave 挥手 | 欢迎 / 引导卡 |
| Like 点赞 | 完成 / 鼓励 |
| Thinking 思考 | AI 诊断 / 问题引导 |
| Teaching 讲解 | 课程页 / AI 助手 |
| Celebration 庆祝 | 证书 / 徽章 / 活动 |

### 3.5 高频动作（8 个 — 这是 §3.4 11 视图里更**情绪化**的子集）

| 动作 | 使用场景 |
|------|---------|
| 开心 | 任务完成 / 学习成功 |
| 思考 | AI 诊断 / 问题引导 |
| 点赞 | 完成课程 / 获得成就 |
| 讲解 | 课程页 / AI 助手说明 |
| 努力 | 学习中 / 进度提醒 |
| 庆祝 | 证书 / 徽章 / 活动 |
| 疑问 | FAQ / 错误输入 / 解释 |
| 加油 | 学习计划 / 打卡 / 提醒 |

### 3.6 选择决策树

```
用户在干嘛？
├── 完成 / 庆祝
│   ├── 任务完成 → 开心 / Like
│   └── 拿证书 → 庆祝 / Celebration
│
├── 学习中
│   ├── 电脑前 → Laptop
│   ├── 移动端 → Tablet
│   └── 一般 → 努力
│
├── 引导 / 教学
│   ├── 欢迎 → Wave
│   └── 解释 → Teaching
│
├── 卡住
│   ├── AI 诊断中 → Thinking
│   └── 不懂 / FAQ → 疑问
│
└── 不知道用哪个 → Front 默认正面
```

### 3.7 红线

- ❌ **不要去掉红 JR 连帽衫**（核心识别）
- ❌ **不要去掉胸前 JR 标**
- ❌ **不要去掉墨镜**（除非真的影响表情识别）
- ❌ **不要让墨镜遮挡导致表情完全不可识别**
- ❌ 不要画得过于写实 / 3D
- ❌ 不要使用过于攻击性 / 凶猛的牛角形态
- ❌ 不要混用旧吉祥物与牛小匠
- ❌ 不要在同一页面用两套不同风格的牛小匠
- ❌ 子产品的不同 outfit 牛**不要跟总品牌混**（参考 §13）

---

## 4. Color 系统

> v2 更新（2026-05-13）：拆分 Primary 2 档 / Accent 3 档 / Neutral 7 档；bg 从冷灰 `#F3F4F6` 升级到米白 `#FAFAFA`；加深红 `#E63946` 做 Active 态。

### 4.1 Primary · 主色（2 档）

| 名称 | Hex | CSS Var | 用途 |
|------|-----|---------|------|
| **珊瑚红** | `#FF4D4F` | `--jr-coral`      | Default / Hover · 主 CTA |
| 深红     | `#E63946` | `--jr-coral-deep` | Active / Pressed · 强调 |

### 4.2 Accent · 辅色（3 档）

| 名称 | Hex | CSS Var | 用途 |
|------|-----|---------|------|
| 紫罗兰 | `#7861FF` | `--jr-purple` | 学习进度 / AI / **Info（用紫不用蓝）** |
| 明黄   | `#FFC94D` | `--jr-yellow` | 成就 / 警告 / 提醒 |
| 薄荷绿 | `#22C55E` | `--jr-mint`   | Success / 完成 / 正向反馈 |

### 4.3 Neutral · 中性色（7 档 + 黑白）

| Hex | CSS Var | 用途 |
|-----|---------|------|
| `#0D0F12` | `--jr-ink`      | 深黑 — 主文字 / Logo |
| `#1F1F1F` | `--jr-ink-1`    | 一级标题 |
| `#333333` | `--jr-ink-2`    | 深灰 — 次正文 / 导航 |
| `#666666` | `--jr-slate`    | 中灰 — 辅助文字 |
| `#999999` | `--jr-mist`     | 浅灰 — placeholder / disabled |
| `#D5D5D5` | `--jr-fog`      | 流灰 — border / divider（暖调，比冷灰好看） |
| `#D1D5DB` | `--jr-fog-2`    | 浅 fog — 备选边框 |
| **`#FAFAFA`** | **`--jr-canvas`** | **米白 — 页面默认 bg（v2 升级）** |
| `#F3F4F6` | `--jr-canvas-2` | 浅灰 bg — input / 次背景 |
| `#FFFFFF` | `--jr-white`    | 白色 — 卡片 / 模态 |

### 4.4 Logo Gradient（仅 logo 用）

> JR Box logo 使用渐变 `#FF7E3B → #FF3B6F`（橙 → 粉）。**UI 组件简化为实色 `#FF4D4F` 珊瑚红**。

| 用途 | Token |
|------|-------|
| Logo 渐变起 | `--jr-logo-orange` `#FF7E3B` |
| Logo 渐变止 | `--jr-logo-pink`   `#FF3B6F` |

### 4.3 Wash（10% 浅色，chip / alert bg）

| 名称 | Hex | CSS Var |
|------|-----|---------|
| Coral wash | `#FFEEEE` | `--jr-wash-coral` |
| Purple wash | `#EFEBFF` | `--jr-wash-purple` |
| Yellow wash | `#FFF6DA` | `--jr-wash-yellow` |
| Mint wash | `#D6F4E5` | `--jr-wash-mint` |

### 4.4 Semantic（用法语义）

| 用途 | 等于 |
|------|------|
| `--jr-success` | `--jr-mint` |
| `--jr-warning` | `--jr-yellow` |
| `--jr-danger` | `--jr-coral` |
| **`--jr-info`** | **`--jr-purple`**（不用蓝！— 蓝是 Job Hunter 的） |

### 4.5 用色决策树

```
要表达什么？
├── 主 CTA / 重点动作 → Coral Red (#FF4D4F)
├── 学习进度 / AI / 信息 → Royal Purple (#7861FF)
├── 完成 / 成功 → Mint Green (#22C55E)
├── 成就 / 警告 / 提醒 → Sunglow Yellow (#FFC94D)
├── 中性正文 / 卡片 / 边框 → Neutral 七档
└── chip / alert 浅底 → Wash 四档
```

### 4.6 红线

- ❌ 不要让蓝色出现做主 CTA（蓝是 Job Hunter 子产品的）
- ❌ Coral Red 不要用作大面积 bg（CTA 专属）
- ❌ Royal Purple 当 AI / 信息标识，不要当主 CTA
- ❌ 不要在一屏同时堆 ≥3 种 Brand 色作 CTA
- ❌ 牛小匠服装别改色（红就是红）

---

## 5. Typography 系统

### 5.1 字体族

| 角色 | 字体 | CSS Var |
|------|------|---------|
| 主字体 | `'Plus Jakarta Sans', 'Source Han Sans SC', '思源黑体', 'PingFang SC', 'Microsoft YaHei', ...` | `--jr-font-sans` |
| 等宽 | `'JetBrains Mono', 'SF Mono', Menlo, ...` | `--jr-font-mono` |

**英文 Plus Jakarta Sans** — 圆润、几何、年轻；
**中文思源黑体（Source Han Sans）** — 标准 / 现代 / 易读 / 开源。

### 5.2 字号尺度（v2 升级 · 6 级 + 按钮 3 档）

| Level | Size | Weight | 用途 |
|-------|------|--------|------|
| **H1** | **48px** | Bold (700) | 大标题 / Hero（v2 升级 from 32） |
| **H2** | **32px** | Bold (700) | 页面标题（v2 升级 from 24） |
| H3 | 20px | Semibold (600) | 区块标题 |
| Body-1 | 16px | Regular (400) | 正文 |
| Body-2 | 14px | Regular (400) | 课程说明 / 列表 |
| Caption | 12px | Regular (400) | 辅助 / metadata |

#### 按钮字号 Button Text Styles

| 类型 | Size | Weight | 用途 |
|------|------|--------|------|
| 大按钮 | 16px | Bold | 主 CTA / Hero CTA |
| 中按钮 | 14px | Medium | 次要操作 / 表单 |
| 文本按钮 | 14px | Regular | Ghost / 链接式 |

### 5.3 红线

- ❌ 不要把思源黑体换成华文楷体 / 仿宋（专业感丢失）
- ❌ 不要用 ≥4 种字号在同屏
- ❌ Caption 不要 < 12px
- ❌ 不要在中文里混 italic（中文斜体可读性差）

---

## 6. Spacing · Radius · Shadow

### 6.1 Spacing — 4pt 网格（v2 · 13 档）

```
4 / 8 / 12 / 16 / 24 / 32 / 40 / 48 / 56 / 64 / 80 / 96 / 128
```

新增大 spacing 用于 Hero / Section gap / 落地页大节奏。

### 6.1.5 Container Widths · 容器宽度（v2 新增）

| 设备 | px | CSS Var |
|------|-----|---------|
| Mobile | 375px | `--jr-w-mobile` |
| Tablet | 768px | `--jr-w-tablet` |
| Desktop | 1200px | `--jr-w-desktop` |
| Wide | 1440px | `--jr-w-wide` |

| 用途 | 推荐 |
|------|------|
| 内联 gap | 4-8px |
| 表单 padding | 12-16px |
| 卡片 padding | 16-24px |
| Section 之间 | 32-48px |
| 页面顶 / 底 | 64-80px |

### 6.2 Radius — v2 · 9 档

| 名称 | px | CSS Var | 用途 |
|------|-----|---------|------|
| none | 0 | `--jr-radius-none` | 满版 / 列表分隔 |
| xs | 4 | `--jr-radius-xs` | 小 tag |
| sm | 8 | `--jr-radius-sm` | **Button 默认** |
| md | 12 | `--jr-radius-md` | 大按钮 / 大输入框 |
| lg | 16 | `--jr-radius-lg` | **Card 默认** |
| xl | 20 | `--jr-radius-xl` | 大 card |
| 2xl | 24 | `--jr-radius-2xl` | Hero / Modal |
| 3xl | 32 | `--jr-radius-3xl` | 落地页大块 |
| 4xl | 40 | `--jr-radius-4xl` | 营销 banner |
| full | 9999 | `--jr-radius-full` | Pill / chip / avatar |

### 6.3 Shadow

| 名称 | 值 | 用途 |
|------|-----|------|
| sm | `0 1px 2px rgba(17,17,17,0.04)` | inline / divider 替代 |
| md | `0 4px 12px rgba(17,17,17,0.08)` | Card 默认 |
| lg | `0 12px 28px rgba(17,17,17,0.12)` | Modal / Hero |
| **red-glow** | `0 8px 20px rgba(255,77,79,0.32)` | Primary CTA 发光 |
| purple-glow | `0 8px 20px rgba(120,97,255,0.30)` | AI / 学习模块发光 |

---

## 7. Logo 系统

> ⚠️ **当前状态**：Logo 还在设计中，本节为待补 — 资产到位后回来更新。

### 7.1 已确定（spec 草稿）

```text
[ JR Box (盒子)  ]  匠人学院  / JR ACADEMY
                    ─────────────────
                    学 AI 来匠人
                    STUDY AI AT JR ACADEMY
```

- **核心视觉资产**：JR Box（带 JR 字样的 3D 盒子）
- **中文**：匠人学院（标准字体待定）
- **英文**：JR ACADEMY
- **口号**：学 AI 来匠人 / STUDY AI AT JR ACADEMY

### 7.2 Logo 件套

> 2026-05-15 更新到 v2 — JR Box（盒子 + 摇柄 mark）+ 完整中文 lockup（黑.svg / 反白 (2).png）。

| 名称 | 文件 | 用途 |
|------|------|------|
| JR Box · 主 mark ⭐ v2 | `assets/logo/jr-box.svg` / `.png` | favicon / Avatar / 装饰 / loading |
| 完整中文 Logo ⭐ v2 | `assets/logo/logo-zh-full.svg` / `.png` | 官网 header / 邮件签名 / PPT 封面 |
| 反白版（深色 bg）⭐ v2 | `assets/logo/logo-zh-white.png` | Dark mode / 深色 hero / 视频片头 |
| Rounded 圆角变体 | `assets/logo/logo-rounded.svg` | 头像 / 圆角容器内 |
| English Logo | `assets/logo/logo-en.svg` / `logo-en-white.svg` | 英文站 / 国际化 banner |
| App Icon · 红底 / 白底 | `assets/logo/app-icon-red.png` / `app-icon-white.png` | 通用 App 图标 |
| 牛小匠 Avatar | `assets/logo/avatar-mascot-96.png` / `niuxiaojiang-logo.png` | 头像位 / chat avatar |
| 品牌口号 Tagline | `assets/logo/tagline-xueai-laijiangren.png` | Hero / 营销 banner |

### 7.3 Logo 红线

- ❌ 不要拉伸 / 倾斜
- ❌ JR Box 不要变形（盒子是 3D 视觉资产）
- ❌ 口号 "学 AI 来匠人" 不要改字
- ❌ 不要放在低对比度 bg（Coral Red 上别放红 logo）
- ❌ logo 不要加 box-shadow / glow

---

## 8. 组件规范

### 8.1 Buttons

#### Primary
```css
height: 48px; padding: 0 24px;
border-radius: var(--jr-radius-sm); /* 8-12px */
background: var(--jr-coral);
color: white; font-weight: 700;
box-shadow: var(--jr-glow-red);
```
**用于**：开始诊断 / 继续学习 / 立即探索 / 开启盒子

#### Secondary
```css
background: var(--jr-white);
border: 1.5px solid var(--jr-coral);  /* 或 fog */
color: var(--jr-coral);  /* 或 ink-2 */
```

#### 状态规则
- Hover：略微加深背景
- Active：降低亮度 / 增加阴影压感
- Disabled：fog bg + slate text

### 8.2 Chips

| 状态 | 颜色 |
|------|------|
| 重要 | 浅红 bg + 红文字 |
| 进行中 | 浅紫 bg + 紫文字 |
| 已完成 | 浅绿 bg + 绿文字 |
| 草稿 | 浅灰 bg + 灰文字 |
| 自定义 | 白 bg + fog 描边 |

```css
height: 28px; padding: 0 12px;
border-radius: var(--jr-radius-full);
font-size: 12px; font-weight: 600;
```

### 8.3 Cards

```css
background: var(--jr-white);
border-radius: var(--jr-radius-lg); /* 16px */
border: 1px solid var(--jr-fog);
box-shadow: var(--jr-shadow-md);
padding: 16px - 24px;
```

#### Course Card 必须包含
- 课程封面
- 课程标题
- 学习人数
- 学习进度
- 进度条（用 `--jr-purple` fill）

### 8.4 Avatar

| 用途 | 角色 |
|------|------|
| AI 助手入口 | 牛小匠 standard |
| 系统提示 | 牛小匠 thinking |
| 学习陪伴 | 牛小匠 teaching |
| 消息通知 | 牛小匠 wave |
| 空状态 | 牛小匠 questioning |

### 8.5 Alerts

| 类型 | 颜色 | 范例 |
|------|------|------|
| Success | Mint Green | 操作成功！你的学习计划已成功创建 |
| Warning | Sunglow Yellow | 注意：请完善个人资料以获得更准确推荐 |
| Error | Coral Red | 操作失败：网络连接超时，请重试 |
| **Info** | **Royal Purple** | 提示：AI 正在为你生成学习路径... |

### 8.6 Toast

```text
学习打卡成功！
已加入学习计划
删除成功
```

Toast 可搭配牛小匠小头像，提升亲和力 — **但不要在高频操作中滥用**。

### 8.7 Progress Bar

- 学习进度优先用 `--jr-purple` fill
- 长度上方可放百分比 + 牛小匠 tracker

### 8.8 Web Dashboard 结构

三栏布局：

| 区 | 内容 |
|---|------|
| 左侧导航 | Logo + 10 项主菜单 + **左下牛小匠引导卡** |
| 中间主区 | 搜索栏 + Hero Banner + 推荐课程 + 职业测评 + 成长路径 + 能力雷达 |
| 右侧信息 | 学习进度 + 今日任务 + 用户信息 |

左下引导卡范例：
```
开启盒子，
开启未来！
[ 牛小匠挥手 / 点赞 / 拿平板 ]
```

### 8.9 Mobile 首页结构

1. 顶部品牌区
2. Hero 标语（开启盒子 / JR ACADEMY）
3. 牛小匠引导图
4. 主 CTA（开始诊断 →）
5. 快捷入口
6. 继续学习列表
7. 底部 Tab Bar（首页 / 学习 / 社区 / 消息 / 我的）

---

## 9. Voice & Tone

### 9.1 整体调性

**AI 时代的成长教练** — 比同学更专业，比老师更亲和，鼓励行动，少废话。

### 9.2 文案规则

| ✅ 这样写 | ❌ 不要这样 |
|----------|-----------|
| 开始诊断 → | 立即开始您的职业诊断之旅 |
| 你的诊断结果 | 您的个人化诊断报告 |
| 三个月后，看看你跨象限了吗？ | 请定期查看您的学习成长情况 |
| 学习打卡成功！ | 恭喜您完成今日学习任务 |
| 已加入学习计划 | 已为您添加至学习计划列表 |
| 学 AI 来匠人 | 探索 AI，开启智慧人生 |

### 9.3 永远别用

- "您" — 用"你"
- "亲爱的学员" — 太教务系统
- "尊敬的用户" — 太银行
- "智能化 / 数字化 / 赋能" — 政府报告味
- "宝子 / 家人们" — 太抖音
- 子产品的 meme 词（Deadline 战神 / 拿下证 / 离 Offer 近一步）— 留给子产品

### 9.4 关键文案库

| 位置 | 文案 |
|------|------|
| Hero 主标语 | 学 AI 来匠人 / STUDY AI AT JR ACADEMY |
| Hero 副标语 | 在 AI 时代，拥有清晰的职业方向与成长路径 |
| 子口号 | 一起成为 AI 时代的匠人/ Be an AI Craftsman. |
| 主 CTA | 开始诊断 → |
| 引导卡 | 学 AI 来匠人！ |
| 结果鼓励 | 三个月后，看看你跨象限了吗？ |
| Toast | 学习打卡成功！/ 已加入学习计划 |

---

## 10. Motion

### 10.1 Duration

| 名称 | 值 | 用途 |
|------|-----|------|
| fast | 120ms | hover / focus |
| base | 200ms | button / toggle |
| slow | 320ms | 卡片 / modal |

### 10.2 Easing

| 名称 | 值 | 用途 |
|------|-----|------|
| standard | `cubic-bezier(0.2, 0.8, 0.2, 1)` | 默认 |
| spring | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 完成庆祝 / 解锁 |

### 10.3 关键动效

- 按钮 hover：略微加深
- 卡片 hover：translateY(-2px) + shadow sm → md
- 进度更新：300-400ms 缓动
- 牛小匠入场：spring + scale(0.9 → 1)
- 任务完成：可叠加小 confetti（克制）

### 10.4 红线

- ❌ 不要 ≥1s 的核心动画
- ❌ 不要让牛小匠持续抖动 / 旋转
- ❌ 不要在 Dashboard 大面积动画（影响阅读）

---

## 11. Do / Don't 红线

### 11.1 视觉

| ✅ Do | ❌ Don't |
|-------|---------|
| bg = `--jr-canvas` 米白 `#FAFAFA` 或 白 | bg 满屏 Coral Red |
| 主 CTA = Coral Red 实色胶囊 / 圆角矩形 | 紫 / 蓝色作主 CTA |
| 牛小匠红 JR 连帽衫 + 墨镜 + JR 胸标 | 缺任意一件 |
| 一屏 ≤2 个牛小匠 | 满屏复读 |
| 进度条用 Royal Purple | 进度条用 Coral Red |
| Card 圆角 16px | 矩形 / 大圆角 ≥24px |

### 11.2 字体

| ✅ Do | ❌ Don't |
|-------|---------|
| 思源黑体 + Plus Jakarta Sans | 楷体 / 仿宋 |
| H1 32px Bold | H1 用 Medium |
| Body ≥ 14px | 中文正文 < 14px |
| Caption 用 Medium | Caption 用 Bold（视觉过重） |

### 11.3 文案

| ✅ Do | ❌ Don't |
|-------|---------|
| 「开启盒子」 | "您的智慧学习之旅" |
| 「学习打卡成功」 | "恭喜您完成今日任务" |
| 「三个月后看看你跨象限了吗？」 | "请关注学习成长情况" |
| 用「你」 | 用「您」 |

### 11.4 跟子产品别混

| ✅ JR Academy | ❌ 别用 |
|---------------|---------|
| 牛小匠 + 红 JR 连帽衫 + 墨镜 | UniMate AI 学生装 / Job Hunter 蓝西装 / Cert Master 企鹅 |
| Coral Red `#FF4D4F` | UniMate `#FF7A66` / Cert `#FFC52A` / Job `#5F7CFB` |
| Royal Purple 做 AI 标识 | 蓝色（Job Hunter 的）做 AI 标识 |
| 学 AI 来匠人 | 子产品的各自 tagline |
| CSS 前缀 `--jr-*` | `--um-*` / `--cm-*` / `--jh-*` |

### 11.5 Code review 自检

PR diff 出现以下立即打回：

- 大块 `bg: var(--jr-coral)` → ❌ Coral 是 CTA 专属
- 进度条 fill 是 Coral → ❌ 应该是 Purple
- 牛小匠没墨镜 / 没 JR 胸标 / 没红衣 → ❌
- 引入 `@mui/material` / `antd` → ❌
- 出现 UniMate / Cert / Job 的 token → ❌
- 文案出现"您 / 智能化 / 宝子" → ❌

---

## 12. Asset 目录映射

```
jr-academy-brand/
├── index.html                ← 18 模块标准设计系统 + 资产摘要
├── assets.html               ← 完整图片资产库（按 assets/ 全量生成 132 个资产卡片）
├── DESIGN.md                 ← 本文件（完整规范）
├── README.md                 ← 仓库使用说明
├── _source_design.md         ← 原始设计稿存档
├── tokens/
│   ├── tokens.json           ← W3C Design Tokens
│   └── tokens.css            ← --jr-* CSS Variables
├── assets/
│   ├── logo/                 ← 当前 Logo + 历史备份
│   ├── mascot/               ← 牛小匠官方图、头像、表情、Chibi、动作、子品牌形象
│   ├── illustrations/        ← Career Impact / VI Boards 插画
│   ├── decorations/          ← 手绘星星、箭头、划线装饰
│   └── spec-sheet-*.png      ← 历史 / 当前规格总览图
└── .github/workflows/
    └── deploy.yml            ← GitHub Pages auto-deploy
```

### 文件命名建议

#### Mascot

```text
mascot-niuxiaojiang-front.png
mascot-niuxiaojiang-side.png
mascot-niuxiaojiang-back.png
mascot-niuxiaojiang-wave.png
mascot-niuxiaojiang-like.png
mascot-niuxiaojiang-thinking.png
mascot-niuxiaojiang-teaching.png
mascot-niuxiaojiang-celebration.png
mascot-niuxiaojiang-laptop.png
mascot-niuxiaojiang-avatar.png
```

#### UI

```text
jr-dashboard-web-niuxiaojiang.png
jr-mobile-home-niuxiaojiang.png
jr-mobile-learning-niuxiaojiang.png
jr-design-system-niuxiaojiang.png
jr-career-diagnostic-niuxiaojiang.png
```

---

## 13. 四品牌隔离规则

JR Academy 是**母品牌**，下面三个子品牌各自独立。**隔离规则严格**：

| 维度 | **JR Academy (爹 / 母)** | UniMate AI | Cert Master | Job Hunter |
|------|--------------------------|------------|-------------|------------|
| Mascot | **牛小匠 + 红 JR 连帽衫 + 墨镜 + JR 胸标** | 牛小匠 + 学生装 | 企鹅（独立 IP） | 牛 + 蓝西装 + 墨镜 + 公文包 |
| 主色 | **Coral Red `#FF4D4F`** | Coral `#FF7A66` | 考证黄 `#FFC52A` | Periwinkle `#5F7CFB` |
| Info 色 | **Royal Purple `#7861FF`** | Purple `#8B5CF6` | 天空蓝 `#5AA7FF` | 天空蓝（Primary） |
| Bg | **米白 `#FAFAFA`** | 暖白 `#FFFEF7` | 背景灰 `#F5F6F8` | 暖白 `#FFFEF7` |
| 字体 | **Plus Jakarta Sans + 思源黑体** | Plus Jakarta + PingFang + Caveat | PingFang SC | PingFang SC |
| 网格 | **4pt** | 8pt | 4pt | 4pt |
| 圆角偏好 | **lg=16, xl=24（最克制）** | lg=24, xl=40（最圆） | lg=16, xl=24 | xl=22, xxxl=36 |
| 调性 | **AI 时代教育 + 成长激励** | 学生 meme + 游戏化 | 备考严肃 | 专业 AI 陪伴 |
| Tagline | **学 AI 来匠人** | 陪你冲 deadline | 你的 AI 考证搭子 | 你的 AI 求职助手 |
| CSS 前缀 | **`--jr-*`** | `--um-*` | `--cm-*` | `--jh-*` |

### 牛小匠家族 IP 谱系

```
牛小匠（家族 IP）
├── JR Academy 总品牌版    — 红 JR 连帽衫 + 墨镜 + JR 胸标（最正式）
├── UniMate AI 子品牌版    — 学生装 / 卫衣（更随性）
└── Job Hunter 子品牌版    — 蓝西装 + 墨镜 + 公文包（最职场）
```

**Cert Master 用企鹅，跟牛小匠完全独立**。

### 隔离实施

- CSS 变量前缀彻底分开（`--jr-*` / `--um-*` / `--cm-*` / `--jh-*`），可同时 import
- 母品牌 logo / Box / 牛小匠标准像放在 JR Academy repo
- 子品牌的 mascot outfit 变体放在各自 repo，但要 reference 总品牌 mascot 规范

### 一屏只能存在一套品牌

- 官网 / Dashboard / AI 诊断页 → JR Academy (`--jr-*`)
- UniMate AI 产品页 → UniMate AI (`--um-*`)
- Cert Master 产品页 → Cert Master (`--cm-*`)
- Job Hunter 产品页 → Job Hunter (`--jh-*`)

**禁止跨品牌混用**（除非是品牌矩阵展示页面，明确标注）。

---

## 14. 装饰元素 · Decorations

### 资产库（14 个）

| 类别 | 元素 | CSS class | 主色 | 用途 |
|------|------|-----------|------|------|
| Shapes | Sparkle 4-pt | `.deco-sparkle-4` | 黄 `#FFC84D` | 散落灵动感、hero 装饰 |
| Shapes | Sparkle 5-pt | `.deco-sparkle-5` | 红 `#FF4D4F` | 同上，跟 Career Impact Diagnostic 一致 |
| Shapes | Dot | `.deco-dot` | 任选 | 散落小点 |
| Shapes | Ring | `.deco-ring` | 任选 | 散落空心圆 |
| Shapes | Soft Blob | `.deco-blob` | 黄 / 红 / 紫 | hero / 卡片背景柔光 |
| Arrows | Arrow Straight | `.deco-arrow-straight` | 黑 `#0D0F12` | CTA 引导、列表指向 |
| Arrows | Arrow Curved | `.deco-arrow-curved` | 红 `#FF4D4F` | 跨段连接、手写感强调 |
| Arrows | Scribble | `.deco-scribble` | 紫 `#7B61FF` | 涂鸦曲线点缀 |
| Highlights | Highlighter | `.deco-highlight` | 黄 `#FFC84D` | 关键词背景高亮（`学 AI 来匠人` 的 AI 用此元素） |
| Highlights | Wave Underline | `.deco-wave-wrap` | 黄 `#FFC84D` | 关键词下划波浪线 |
| Highlights | Hand-Drawn Circle | `.deco-circle-wrap` | 红 `#FF4D4F` | 手绘圈住关键短语 |
| Highlights | Dashed Divider | `.deco-dashed` | 灰 / 黄 / 红 | 区块虚线分隔 |
| Accents | Bubble Quote | `.deco-bubble` | 灰 / 黄 / 红浅底 | 引语、tooltip、对话气泡 |
| Accents | Number Badge | `.deco-num` | 黑 / 黄 / 红 / outline | 序号、步骤、checklist |

完整 SVG 源码、CSS 实现、使用范例见 `index.html` panel 16-18 + book-section 10。

### 使用决策树

```
关键词强调
├─ 背景高亮 → Highlighter
├─ 下划线 → Wave Underline
└─ 圈住一段 → Hand-Drawn Circle

引导视线
├─ CTA 内 → Arrow 字符（→）
├─ CTA 外 / 列表 → Arrow Straight
└─ 跨段 / 手写感 → Arrow Curved

hero 灵动感
└─ Sparkle + Dot + Ring 散落组合（参考 index.html panel 18）

序号 / 步骤
└─ Number Badge

引语 / 对话
└─ Bubble Quote

区块装饰
├─ 分隔 → Dashed Divider
└─ 背景柔光 → Soft Blob
```

### 用色规则

| 色 | Token | 用在 |
|----|-------|------|
| 黄 | `--jr-yellow` `#FFC84D` | Sparkle 主色、Highlighter、Wave Underline、提醒 |
| 红 | `--jr-coral` `#FF4D4F` | Arrow 强情绪、Hand Circle、Sparkle 5-pt |
| 紫 | `--jr-purple` `#7B61FF` | Scribble、Ring、AI 标识 |
| 中性灰 | `#6B7280 / #D1D5DB` | Dot 默认、Bubble 默认底色、Dashed 默认 |

**不要引入这 4 色之外的新色**——装饰是品牌的延伸，不能跑色。

### 红线（Don't）

- ❌ 不要在 Dashboard / 数据表格 / 长正文里散落 sparkle —— 装饰污染数据可读性
- ❌ 不要把 Arrow 用作 CTA 主图标 —— CTA 自己写 `→` 字符即可，不要叠 SVG
- ❌ 不要同时叠 Highlighter + Wave Underline + Hand Circle —— 视觉过载
- ❌ 不要给装饰加大阴影 / 厚重描边 —— 保持轻盈，不能比内容更抢眼
- ❌ 一屏装饰元素超过 10 个 —— 过密 = 廉价感
- ❌ 不要二次创作 SVG path —— 一律照搬 `index.html` panel 16-18 的原版

### 跨项目落地

| 项目 | 落地方式 |
|------|---------|
| `jr-academy-web-zh`（Next.js） | `src/components/decor/` React 实现，SVG path 跟手册一致 |
| `jr-academy-admin`（Vite + React） | 同上 |
| `chrome-extension` / `chrome-extension-job-hunter` | 复制 SVG 内联到 React 组件 |
| `cert-miniapp`（Taro / 微信小程序） | 复制 SVG 字符串到 wxml |
| `cert-mobile`（Expo + RN） | 用 `react-native-svg` 重写，path 不变 |
| 静态营销页 / Canva 海报 | 直接 copy SVG 文件到 Canva |

**手册 SVG path = source of truth**。任何端二次创作必须先回 design system 加新元素或修改 path。

### 当前在用案例

- `CareerImpactDiagnostic/LandingView.tsx`：散落 Sparkle 5 + Dot + Ring（对齐本规范）
- `CareerImpactDiagnostic/ResultView.tsx`：Hero corner Sparkle
- `index.html` hero panel：现有 `.spark.one ✦` / `.spark.two ✧` / `.scribble ↝` 是早期字符版，**待迁移**到 SVG 版本

### 人物插画 · Career Impact 系列（16 张）

跟装饰元素配套使用的**情感型插画**。原产于 `jr-academy-web-zh/CareerImpactDiagnostic`，2026-05-13 收编到 design system 作为 source of truth：

| 分组 | 数量 | 位置 | 用途 |
|------|------|------|------|
| **Scene** | 4 张 | `assets/illustrations/career-impact/{hero-telescope,map-78-careers-orbit,path-journey-flag,subscribe-paper-plane}.png` | hero / 地图 / 路径 / 订阅 |
| **Quiz** | 3 张 | `quiz-{risk-thinking,growth-confident,mirror-relaxed}.png` | 3 题型题色系（红 / 绿 / 紫） |
| **Roles** | 9 张 | `result-{ai-wizard,creative-augmenter,cross-domain-translator,wave-rider,mid-mountain-climber,still-life-vip,half-beat-observer,sleeping-seed,old-map-holder}.png` | 4 象限 × 9 角色身份 |

**视觉规则**：暖白底 `#FDF8F2` + 黄软光（`.deco-blob` 即可），不加描边 / 投影 / 二次裁剪。

**红线**：
- ❌ 不要跟牛小匠同屏（一屏只能存在一套人物 IP，避免主品牌 vs 叙事图冲突）
- ❌ 不要把 quiz 题型插画跨色系误用（红 risk / 绿 growth / 紫 mirror 强绑定）
- ❌ 不要把 9 角色插画用在跟"角色身份"无关的场景（如普通课程页 hero）

完整 16 张展示见 `index.html` panel 19 + book-section 11.A/B/C。

---

## 15. Chibi 资产批次 · 2026-05-13

2026-05-13 从 `~/Documents/jr-academy-design/` 收编的 40 张 ChatGPT 生成设计变体，已识别 37 张归类完成，3 张落 `_inbox/` 待 review。

### 跟 §3 / §10 的定位区分

| 章节 | 角色 | 数量 | 何时用 |
|------|------|------|--------|
| §3 / §10.A OFFICIAL | **主形象** — 不可妥协 | 8 张 | 任何官方场景首选 |
| §10.B-H 牛小匠资产库 | **已沉淀辅助资产** | 36 张 | 表情 / 生活 / 工作 / 服装 / 变体 / icons |
| **§15 Chibi 批次** | **风格变体 + 子品牌混合** | 40 张 | 营销 / 海报 / 辅助 / 子品牌特定页面 |

### 分组（37 已识别 + 3 inbox）

| 子组 | 路径 | 数量 | 备注 |
|------|------|------|------|
| chibi/working | `assets/mascot/chibi/working/` | 11 | 红/紫/黑白 hoodie 学习工作 |
| chibi/expressions | `assets/mascot/chibi/expressions/` | 4 | 思考 / 庆祝 / 欢呼 |
| chibi/lifestyle | `assets/mascot/chibi/lifestyle/` | 10 | 健身 / 阅读 / 摄影 / 旅行 / 饮食 / 规划 |
| chibi/app-icons | `assets/mascot/chibi/app-icons/` | 2 | 圆角白 + 方角红 |
| unimate | `assets/mascot/unimate/` | 4 | UniMate AI 子品牌（U logo + 紫辅色） |
| jobhunter | `assets/mascot/jobhunter/` | 2 | Job Hunter 子品牌（蓝 / 商务） |
| outfits-extra | `assets/mascot/outfits-extra/` | 2 | 粉色学生 + 绿色 AI |
| vi-boards | `assets/illustrations/vi-boards/` | 2 | JR Academy + UniMate AI 完整 VI |
| _inbox | `assets/mascot/_inbox/` | 3 | 用户未预览 · 待识别 |

### 风格鉴别

- **Chibi 圆头版** — 绝大部分主品牌资产，红 hoodie / 黑短裤 / 大眼墨镜，cheek 粉红
- **写实毛茸茸版** — 紫色 / 米色 hoodie 系列（3 张），更立体细节
- **子品牌** — UniMate（U logo + 紫辅色） / Job Hunter（蓝 / 商务）

### 红线（Don't）

- ❌ chibi 圆头 + 写实毛茸茸两种风格同屏 — 视觉风格冲突
- ❌ UniMate / Job Hunter 子品牌资产用在 JR Academy 主站 — 违反 §13 一屏一品牌
- ❌ §15 变体当 §3 主形象使用 — 变体只用于辅助 / 营销 / 海报
- ❌ VI 设计板（vi-boards）直接拿去做产品图 — 那是给设计师看的 reference
- ❌ _inbox 资产在归类前直接引用 — 路径不稳定

### Promote 规则

本批次 40 张里，被业务多次复用的 chibi 资产可 promote 进 §10 主资产库（mascot/working/ mascot/lifestyle/ 等）。promote 流程：

1. 业务侧 3 次以上使用 → 提名
2. 设计师 review 是否符合 §3 主形象规范
3. 改名为 official 命名（`working-XX.png` / `lifestyle-XX.png` 编号），mv 到主资产库
4. 同步更新本手册 §10 章节
5. 原 chibi/ 目录保留 alias（防止已发链接断）

### 资产来源

设计师本地 `~/Documents/jr-academy-design/`（ChatGPT 生成）。后续每批设计输出按"入仓 → 识别 → 归类"流程：

```
~/Documents/jr-academy-design/{ChatGPT,Image_xxx,uuid}.png
  ↓ Claude / 设计师识别
design system/assets/mascot/_inbox/   ← 临时
  ↓ 命名 + 分类
design system/assets/mascot/{chibi,unimate,jobhunter,outfits-extra}/
  ↓ 业务侧 3+ 次使用 + 设计师 review
design system/assets/mascot/{official,emojis,busts,lifestyle,working,outfits,variants,app-icons}/  ← §10 主资产库
```

完整展示见 `index.html` panel 20 + book-section 12.A-H。

---

## 维护

- 每次改 token 必须三处同步：`tokens.json` / `tokens.css` /（如果以后加）`tokens.ts`
- 改了组件规范要在 `index.html` 同步更新视觉示例
- 改了 mascot 或 logo 必须同步更新本文件 §3 / §7 / §12

### Sources of truth 优先级

```
DESIGN.md  ←  最高（决策源头 / 设计意图）
   ↓ 落地
tokens.json  ←  机器可读的真相
   ↓ 翻译
tokens.css  ←  CSS Variables
   ↓ 示例
index.html  ←  视觉手册
```

- **冲突时**：以 DESIGN.md 为准
- **改 DESIGN.md 必须立刻同步**：tokens.json → tokens.css → index.html
- **token 不能擅自改**：手抖把 `#FF4D4F` 写成 `#FF4D50` → 按 DESIGN.md 改回来
- **DESIGN.md 才是给设计师/PM 改的**；token 是给前端/设计工具读的

---

_v4.4 · 2026-06-02 · JR Academy 总品牌_

_Changelog_
- **v4.4 (2026-06-02)**: `index.html` 扩展为 18 模块标准设计系统，新增 Motion / Spacing / Elevation / States / Implementation Rules；动效示例包含 entrance、hover lift、feedback pop、loading progress，并支持 `prefers-reduced-motion`
- **v4.3 (2026-06-02)**: 上半部分按新版 13 模块重排 / 主 Logo 换为设计师正式 Logo 文件 / 下半部分按 `assets/` 当前文件全量展示 132 个图片资产卡片 / 新增 `assets.html` 独立完整资产页，保留 spec sheet、backup、_inbox、吉祥物、Chibi、子品牌 mascot 与插画
- **v4.2 (2026-05-24)**: emoji→lucide SVG (6 处) / 牛小匠头像统一 / 资产库 panel 合并 20→11 / 新增 `--jr-icon-*` token namespace / 新增 §0.5 Icon System
- v4.1 (2026-05-24): 视觉 finalize — 13 panel brand board + 暖白底 + 红编号胶囊 + 黑色 CTA + 8px 圆角
- v1.3 (2026-05-13): 新增 §15 Chibi 资产批次 · 40 张 ChatGPT 设计变体收编（37 识别 + 3 inbox），含 chibi/unimate/jobhunter/outfits-extra/vi-boards 5 大分组 + promote 规则
- v1.2 (2026-05-13): §14 补充人物插画 Career Impact 系列（16 张：4 scene + 3 quiz + 9 roles）收编到 `assets/illustrations/career-impact/`，design system 成为 source of truth
- v1.1 (2026-05-13): 新增 §14 装饰元素章节（14 个 SVG/CSS 标准件 + 用色规则 + 跨项目落地映射）
- v1.0 (2026-05-13): 初版（§1-13 品牌定位 → 隔离规则）
