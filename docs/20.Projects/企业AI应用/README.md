---
title: 企业AI应用
date: 2026-08-25 14:45:00
permalink: /projects/enterprise-ai-applications/
article: false
comment: false
---

# 企业 AI 应用

这里记录面向真实业务流程的 AI 应用实践。重点不是做一个孤立的聊天页面，而是把重复动作、内容生产和人工判断串成可以交付、复用和持续优化的工作流。

## 已整理的应用方向

### 1. 招聘触达自动化

面向招聘沟通场景，将重复的候选人触达动作做成批量化操作，帮助减少人工逐个发起沟通的时间。

- [查看：招聘触达自动化的设计边界](/projects/enterprise-ai-applications/recruitment-outreach/)
- [BOSS 直聘小插件成果展示](https://lcnu9zjo6wvs.feishu.cn/wiki/HOr8wyHCVifVtRkNK0ycF51Tnwe?from=from_copylink)

### 2. 视频内容生产自动化

从对标视频中提取创作思路，生成可修改的提示词与文案方向，再通过工作流衔接后续的视频生产步骤。它的目标是把一次性的“会用工具”，变成可重复交付的内容生产流程。

- [查看：从反推提示词到视频自动化流程](/projects/enterprise-ai-applications/content-production-workflow/)
- [反推提示词插件成果展示](https://lcnu9zjo6wvs.feishu.cn/wiki/VcZtwDr33iDbD6k4XhocbW8snFg?from=from_copylink)
- [商用反推流程入口（n8n 封装）](https://www.lingzhiai.com.cn/)

## 企业 AI 应用的交付思路

```text
业务目标
  ↓
明确输入、规则与人工边界
  ↓
AI 分析 / 生成 / 决策建议
  ↓
工作流编排与业务系统连接
  ↓
人工确认或受控执行
  ↓
结果记录、反馈与持续优化
```

真正有价值的企业 AI 应用，不应只停留在“能生成内容”或“能调用一个接口”。它还需要解决输入从哪里来、哪些步骤可以自动化、哪些动作必须由人确认、结果如何回收和复盘。

## 使用边界

- 批量触达应遵守平台规则，并控制频率、对象范围和人工复核。
- 对标视频仅用于分析创作结构与思路，不直接复制他人的作品或未经授权的素材。
- 产品参数、价格、活动和对外承诺应以已确认资料为准；信息不完整时，流程应先标记待确认，而不是自动编造。
- 第三方平台和工作流工具的功能会随版本、权限和服务状态调整，具体可用性以实际页面为准。

后续会继续补充每个场景的需求拆解、流程设计、异常处理和复盘方法。
