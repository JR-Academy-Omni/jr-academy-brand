# JR Academy Design System · 场景路由与治理

> 这是所有 JR Academy 设计任务的第一入口。先在本文确定交付物类型、Register 和局部规范，再进入
> `DESIGN.md`、`POSTER_DESIGN.md` 或 `COURSE_DESIGN.md`。不得从旧成品反推一套新规则。

## 1. 单一真相源结构

| 层级 | 真相源 | 管什么 |
|---|---|---|
| 品牌决策 | `DESIGN.md` | 品牌 DNA、Register A/B、色彩语义、字体、Logo、牛小匠、品牌隔离、红线 |
| 数值 token | `tokens/tokens.json` → `tokens/tokens.css` | 可机读的色值、间距、圆角、阴影、动效数值 |
| 场景路由 | `APPLICATIONS.md` | 这份交付物应该读哪份规范，哪一层可以覆盖哪一层 |
| 海报应用 | `POSTER_DESIGN.md` | 活动海报、课程海报、平台 cover、朋友圈、小红书卡片、联名物料 |
| 课程应用 | `COURSE_DESIGN.md` | 课程官网页、招生 landing、课堂 deck、lesson UI、课程营销物料 |
| 可视参考 | `homepage-soft.html` / `index.html` / `assets.html` | Register A 官网范本、Register B 品牌板、资产目录 |
| 局部决策 | 交付物所属目录的 `DESIGN.md` | 只记当次活动、城市、课程或 campaign 的有界局部决策 |

`DESIGN.md` 是品牌决策源，不等于每份物料都直接套同一个 Register。

## 2. 冲突与覆盖优先级

从高到低：

1. **当期事实 SoT**：`EVENT_PLAN.md`、课程 outline、已确认合作方/嘉宾/日期。视觉规范不得覆盖事实。
2. **子品牌 Design System**：交付物完全属于 UniMate、考证匠、求职匠等子品牌时，用子品牌 token 和资产；JR 只作已授权的 endorsement。
3. **局部 `DESIGN.md`**：可以指定本 campaign 用 A 还是 B、城市视觉、构图母题、局部辅色和特定渠道；必须声明 `extends` 与 `overrides`。
4. **场景规范**：`POSTER_DESIGN.md` / `COURSE_DESIGN.md`。
5. **母品牌基础**：`DESIGN.md` + tokens + 真实资产。
6. **参考作品**：只参考构图和质感，永远不能反过来覆盖上述规范。

局部规范永远不得覆盖：官方 Logo 原图、品牌隔离、牛小匠识别特征、事实准确性、授权/版权、无障碍底线和不虚假承诺。

## 3. 场景路由表

| 交付物 | 默认 Register | 必读 | 备注 |
|---|---|---|---|
| JR 官网、营销 landing、产品 UI | A | `DESIGN.md` §0.0A/§0.0B | 使用真实 DOM 文字和产品截图 |
| 课程官网页 / 课程招生 landing | A | `COURSE_DESIGN.md` | 课程本地 `DESIGN.md` 只提供定位和局部母题 |
| 课堂 deck / workshop deck / 内部培训 deck | B | `COURSE_DESIGN.md` | 高密度资料页必须降级黑边和硬阴影 |
| Lesson 交互 UI / 学习中心 | A | `COURSE_DESIGN.md` | 产品 UI 不得因为“课程”改用 B |
| 信息密度高的课程/知识海报 | B 候选 | `POSTER_DESIGN.md` + `COURSE_DESIGN.md` | 只有在高冲击和信息结构真正需要时选 B |
| 高级感、摄影或人物主导的活动/课程海报 | A 的 editorial 变体 | `POSTER_DESIGN.md` | 不因为文件名叫 poster 就强制 B |
| 官网 Events / Eventbrite / Luma cover | A 的 editorial 变体 | `POSTER_DESIGN.md` | 属于 listing cover，不是详细传播海报 |
| 朋友圈 / 微信群详细活动海报 | A 或 B，必须声明 | `POSTER_DESIGN.md` + 当期 `EVENT_PLAN.md` | 信息完整，中心方形安全区可读 |
| 联名/赞助商/礼品海报 | A 的 editorial 变体 | `POSTER_DESIGN.md` + 当期局部 `DESIGN.md` | Logo 和商品图必须是真实资产 |
| 小红书首图/信息卡 | 账号品牌决定 | `POSTER_DESIGN.md` + 账号 Profile | JR 官号才直接套 JR 母品牌 |
| 电子书 / zine / 招生季专题 | A 或 B 的 zine 表达层 | `DESIGN.md` §16 | zine 是表达层，不是新 token 系统 |

## 4. Register 选择记录

每份设计 brief、局部 `DESIGN.md` 或 manifest 必须记录：

```yaml
surface: event-promotional-poster
brand: jr-academy
register: A-editorial
reason: 人物与真实活动场景是主视觉，需要高级感而不是黑框信息卡
extends:
  - jr-academy-brand/DESIGN.md
  - jr-academy-brand/POSTER_DESIGN.md
facts: marketing-campaign/events/<slug>/EVENT_PLAN.md
overrides:
  - 局部辅色为城市蓝
```

`register` 只能是 `A`、`A-editorial`、`B` 或已登记子品牌系统。不得写“现代感”、“高级感”等无法验收的自建风格名。

## 5. 局部 `DESIGN.md` 合同

新建活动、课程或 campaign 规范时，使用 `templates/LOCAL_DESIGN_SPEC.md`。必须写清：

- 它延伸哪些中央规范；
- 交付物类型与 Register；
- 只覆盖哪些局部决策；
- 事实 SoT 和资产来源；
- 渠道、尺寸、安全区和验收方式；
- 过期条件。

不得复制整份母品牌色板或字体表到局部文件。引用 token 名，只记真正的局部差异，否则中央更新时会漂移。

## 6. 最终验收

一份交付物只有同时通过下列闸门才能叫“设计完成”：

1. 事实与当期 SoT 一致；
2. 已记录 surface / brand / register / 局部覆盖；
3. 只使用正确品牌的官方 Logo、字体和资产；
4. 目标渠道的真实尺寸与最小预览通过；
5. 所有生成式内容符合无字/无伪 Logo/无伪 UI 边界；
6. 完成原尺寸目视、压缩后预览、二维码/链接与无障碍验收；
7. 修改记录和真实输出文件已保存，不把首次预览当验收成品。
