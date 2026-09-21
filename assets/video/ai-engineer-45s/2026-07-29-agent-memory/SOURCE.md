# SOURCE — 聊天记录不等于完整的 Agent Memory

## 核心判断

聊天历史可以构成 Agent 的短期记忆输入，但它不等于完整的记忆系统。工程化 Agent Memory 还需要显式管理任务状态、线程内短期记忆，以及跨线程或跨会话持久化的长期记忆。

## 事实边界

- 不说“聊天历史不是记忆”；准确表达是“聊天历史不等于完整的 Agent Memory”。
- `Thread` 表示一次可恢复的执行或对话上下文；切换 thread 后，线程内状态不会天然成为跨线程长期记忆。
- 长期偏好应以结构化记忆保存，并按用户或命名空间检索，而不是每次重放全部聊天。
- Memory 是读写策略：写什么、何时检索、何时遗忘或删除。

## 主要来源

- LangChain Docs — Short-term memory: <https://docs.langchain.com/oss/python/langchain/short-term-memory>
- LangGraph Docs — Persistence: <https://docs.langchain.com/oss/python/langgraph/persistence>
- LangGraph Docs — Memory: <https://docs.langchain.com/oss/python/langgraph/add-memory>

## 42 秒口播

见 `public/narration.txt`。

## 平台主标题

聊天记录 ≠ 完整的 Agent Memory

## 平台变体

- TikTok / Shorts：你的 Agent 真有记忆，还是只会重放聊天？
- 视频号：Agent Memory 的三层工程结构，45 秒讲清
- LinkedIn：Conversation History Is Not a Complete Agent Memory System
