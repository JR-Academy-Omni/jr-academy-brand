# 局部设计规格：{project / event / course}

```yaml
status: draft
surface_family: event | course | campaign | product
brand: jr-academy
extends:
  - jr-academy-brand/DESIGN.md
  - jr-academy-brand/APPLICATIONS.md
  - jr-academy-brand/POSTER_DESIGN.md | jr-academy-brand/COURSE_DESIGN.md
register: A | A-editorial | B
facts: path/to/current/SoT.md
owner: name-or-team
reviewed_at: YYYY-MM-DD
expires_when: fact-or-campaign-condition
overrides: []
```

## 交付物和目标

- 交付物：
- 目标用户：
- 用户需要完成的决策/任务：

## Register 决策

- 选择：
- 原因：
- 明确不使用的另一个 Register 特征：

## 当期事实 SoT

- 文件 / revision：
- 未确认字段：
- 发布前必须重新核对的时效字段：

## 局部视觉决策

- 主视觉母题：
- 允许的局部辅色（引 token 名）：
- 人物 / 城市 / 产品 / 作品资产：
- 仅在本项目生效的覆盖：

## 渠道与尺寸

| 渠道 | 输出尺寸 | 安全区 | 最小预览 | 文件名 |
|---|---:|---|---:|---|

## 确定性图层

- 必须使用真实资产的 Logo / QR / 截图 / 文字：
- 图片模型只允许生成：

## 验收

- [ ] 事实 SoT 逐项一致
- [ ] 品牌 / Register / token / Logo 正确
- [ ] 原尺寸可读，无溢出、拉伸或静默 crop
- [ ] 目标渠道最小预览可读
- [ ] 生成式图像无文字、伪 Logo、伪 UI、水印
- [ ] 人像、商品、partner 与官方资产权利已确认
- [ ] QR / 链接在最终文件上实测
- [ ] 状态准确：draft / approved / uploaded / published 不混淆
