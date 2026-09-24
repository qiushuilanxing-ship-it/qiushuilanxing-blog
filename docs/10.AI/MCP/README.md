---
title: MCP
date: 2026-08-25 11:03:00
permalink: /ai/mcp/
article: true
categories:
  - AI实践
  - MCP
tags:
  - MCP
  - 工具调用
comment: false
---

# MCP

MCP（Model Context Protocol）适合用来把模型、业务系统与工具能力放进一套可管理的连接方式中。它并不是“让模型随意调用接口”，而是为工具、上下文和交互模板建立清晰的能力边界。

这里记录的是可复现实验与工程模板：从服务端如何暴露能力，到客户端如何控制权限，再到如何为有副作用的操作保留人工确认环节。

## 这个栏目关注什么

- **Tools**：让模型在受控范围内查询或执行一个明确动作。
- **Resources**：向客户端提供可读取、可引用的上下文资料。
- **Prompts**：沉淀可复用的交互模板，减少每次从零组织任务说明的成本。
- **权限与审计**：工具可见不代表工具可执行；涉及写入、发送或外部影响的操作，需要可追踪、可拒绝、可确认。

## 从哪里开始

1. [MCP 不只是工具调用：从能力暴露到业务边界的服务设计](/ai/mcp/mcp-server-design/)
2. [一个安全的 MCP 工具服务模板：查询、审批与审计](/ai/mcp/build-safe-mcp-tool-server-template/)
3. [MCP 客户端接入：为什么工具可见不等于工具可执行](/ai/mcp/mcp-client-and-permission-boundaries/)

## 实践原则

先暴露最小、只读、容易验证的能力，再逐步增加写操作。每个工具都应有明确的输入约束、结构化结果、失败语义、超时策略和审计记录；不要把密钥、用户隐私或无限制的系统权限交给模型上下文。

## 参考资料

- [MCP 官方架构说明](https://modelcontextprotocol.io/specification/draft/server/index)
- [MCP Tools 规范](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/docs/specification/2026-07-28/server/tools.mdx)
