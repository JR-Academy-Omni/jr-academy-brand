# JR Academy 课程设计系统

> 统一课程官网页、招生 landing、课堂 deck、lesson UI、课程海报与课程营销资产的设计依据。
> 课程事实仍属于 `curriculum/{slug}/`；本文只管不随某一门课改变的视觉、交互与交付系统。

## 1. 课程真相和设计真相分开

| 内容 | 真相源 |
|---|---|
| 课程名、定位、目标人群、课程结构、学习成果 | `curriculum/{slug}/DESIGN.md`、`PERSONAS.md`、outline / 当期 cohort 记录 |
| 招生阶段、定价、日期、推广卖点 | `PROMOTION_PLAN.md`、`FUNNEL_PLAN.md`、当期已核验记录 |
| 母品牌视觉、字体、Logo、token、Register | `jr-academy-brand/DESIGN.md` + `APPLICATIONS.md` |
| 课程海报和社媒图 | `jr-academy-brand/POSTER_DESIGN.md` |
| 课程局部母题、专属辅色、范例截图 | 课程目录局部 `DESIGN.md`，按 `APPLICATIONS.md` 的覆盖合同 |

课程本地 `DESIGN.md` 不得重新发明 JR Logo、母品牌主色、字体链或一套新组件系统。只写这门课真正特有的差异。

## 2. 课程场景路由

### 课程官网页 / 招生 landing → Register A

- 奶油底、珊瑚/AI 标志渐变、18–28px 圆角、1px 暖灰边、柔多层阴影。
- 用真实课程产品预览、学习任务、作品或获授权讲师素材证明课程，不用纯色卡 + icon 假充内容。
- 主标题直接写课程与可完成的具体任务，不写“开启未来”、“全面赋能”。
- 价格、日期、课时、项目数、学员数和成果只能来自当期真实数据。
- CTA 必须有真实动作；筛选/tab/分页与 URL state 同步。

### 学习中心 / Lesson 交互 UI → Register A

- 它是产品 UI，不是 deck。不得因为页面内容是课程就改用 3px 黑边和偏移硬阴影。
- 真实课程结构、lesson type、进度、Lab 和 AI Tutor 布局必须从产品组件/数据读取，不凭印象画伪 UI。
- 动效必须支持 `prefers-reduced-motion`；键盘、焦点、对比度和移动端属于发布闸门。

### 课堂 / workshop / 讲座 deck → Register B

- 一屏一个教学任务，主标题 + 主视觉/示例 + 必要解释；不把文章按段落塞进 slide。
- 3px 黑边和硬阴影只给少量主卡、CTA 或对比。一屏大黑框卡超过 6 个必须降级。
- 代码、图表、架构和官方截图优先做真实教具，不用装饰图代替教学证据。
- 所有精确文字与 Logo 使用可编辑/确定性图层，不让图片模型渲染。
- 新增或显著修改 lesson deck 必须进入课程 deck 登记表，未部署标为 Draft/Local。

### 课程海报 / 小红书课程卡 → `POSTER_DESIGN.md`

- 每张图只打一个 persona、一个当前 funnel 目标和一个主卖点。
- 课程结构、学习成果、定价、开班日和 CTA 都必须来自当期课程 SoT。
- 人物/作品/真实产品截图主导的课程海报可选 A-editorial；知识结构/数字/对比主导才选 B。
- 不得将课程计划成果写成学员已实现成果；不得把市场薪资区间写成课程结果。

## 3. 课程局部 `DESIGN.md` 怎么写

新文件使用 `templates/LOCAL_DESIGN_SPEC.md`，至少包含：

```yaml
surface_family: course
course_slug: <slug>
extends:
  - jr-academy-brand/DESIGN.md
  - jr-academy-brand/COURSE_DESIGN.md
registers:
  product_page: A
  classroom_deck: B
  campaign_poster: A-editorial
facts:
  - curriculum/<slug>/outline.json
  - curriculum/<slug>/PROMOTION_PLAN.md
overrides: []
```

可以写：课程专属概念母题、讲师/作品图、局部辅色、课程专用示例、应用到哪些交付物。

不可以写：第二套 JR Logo、新的母品牌红、替代字体链、自创全局按钮/卡片 token、与子品牌混用的 mascot。

## 4. 课程资产优先级

1. 真实产品 UI / Lab / deck / 学习任务截图；
2. 获授权的讲师、学员、作品和活动照；
3. `jr-academy-brand/assets/` 里语义匹配的官方资产；
4. 无字、无 Logo、无伪 UI 的生成式氛围/概念图；
5. 纯装饰图形。

如果只有第 5 类资产，页面/海报还没有足够证据上线。

## 5. 交付验收

### 官网 / Lesson UI

- 桌面 + 移动端视觉验收；
- URL state、返回/前进、键盘、焦点、对比度和 reduced motion；
- 所有资产 200，无伪 UI、假数据、假按钮；
- 课程名、价格、日期和 CTA 与真实数据一致。

### Deck

- slide 数、入口、源码和导出存在；
- 16:9 及教室投影可读，无溢出和小字墙；
- 代码/图表/官方截图可读且与讲解对应；
- 新 deck 已登记，未部署状态没有写成已上线。

### 课程海报

- 通过 `POSTER_DESIGN.md` 全部闸门；
- 通过目标 persona 的 5 秒反应测试；
- 价格、日期、课程内容和成果表达逐项对照当期 SoT；
- 不把生成预览、本地导出、已上传和已公开发布混为同一状态。
