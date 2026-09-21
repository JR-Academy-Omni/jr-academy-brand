# AI Engineer 第七期 · 企业级 AI 屏幕内容实验（已放弃）

> 状态：Rejected experiment。屏幕比例和生成 UI 不符合广告的真实摄影质感，不进入 Seedance 提交包，也不作为最终分镜依据。

以下内容保留为审计记录。企业级 AI 项目现在改用实体需求单、权限矩阵、资料来源卡、评测单和审计夹表达，见新的分镜镜头表。

## 屏幕一：业务需求与工作流

- 项目：`CUSTOMER SUPPORT COPILOT`
- 目标：减少客服处理时长，同时保留准确率和资料引用
- 数据源：Product Documentation、Support Knowledge Base、Policy & Compliance、Internal Wiki
- 验收条件：回答必须来自内部资料、包含引用、通过 groundedness 评测、由支持团队批准
- 工作流：User Question → Retrieve Content → Generate Response → Add Citations → HUMAN REVIEW

## 屏幕二：权限与资料证据

- 页面：`ACCESS CONTROL`
- 状态：`ACL ENFORCED`
- 分组：HR、Finance、Sales、Support
- 权限：No access、Read only、Read & use
- 证据卡：`Product_Related_Policy_v3.pdf`、Policy & Compliance、版本日期、页数、被引用次数
- 关键动作：先做权限过滤，再检索和生成，避免把无权访问的资料送入回答链路

## 屏幕三：第一次评测失败

- 运行：`EVALUATION RUN 07`
- Groundedness：`0.62`，目标 `≥ 0.90`
- Citation coverage：`4 / 10`，目标 `10 / 10`
- 结果：`FAIL`
- 失败原因：缺少资料来源、回答没有被证据支持、验收条件未满足
- 动作：工程师停止运行，两人回到来源、权限和检索流程查问题

## 屏幕四：修正后的可验证结果

- 运行：`EVALUATION RUN 08`
- Groundedness：`0.94`
- Citation coverage：`10 / 10`
- 结果：`PASS`
- 交付状态：`AUDIT LOG SAVED`、`STAGING DEPLOYED`
- 画面含义：不是“模型突然变聪明”，而是需求、权限、证据、评测和部署链路被补齐

## 视觉执行

- 生成阶段允许 Seedance 保留屏幕的深色企业软件质感、表格、状态芯片和趋势图。
- 可读标题、指标、状态和引用卡在后期用确定性 UI 合成，确保每个字和数字准确。
- 不放真实客户名称、个人资料、凭据或未经授权的公司 Logo。
