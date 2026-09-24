---
title: 视频质检系统
date: 2026-08-25 11:12:00
permalink: /projects/video-inspection-system/
article: true
categories:
  - 项目记录
  - 视频质检系统
tags:
  - 视频质检
  - 企业AI应用
comment: false
---

# 视频质检系统

![视频质检系统界面](/img/video-audit/audit-dashboard.png)
MileVideoAudit 视频质检项目总结
1. 解决什么业务问题
电商短视频内容合规质检。家电品牌在抖音发布大量带货 / 种草视频，需要逐条核验：视频宣称的产品参数、功能、卖点是否与官方资料一致（有无虚假、夸大、跨型号套用），画面文字有无错别字，AI 生成内容是否按规定声明。纯人工逐条看视频成本高、标准不统一、易漏检，本项目把这件事做成半自动流水线。
2. 已实现的核心质检能力
账号批量采集：给定 secid + 日期范围，分页扫描、下载、去重、校验
双通道证据提取：画面（抽帧）+ 音频（ASR）并行，统一成结构化 evidence
AI 语义质检：识别产品型号 → 对照官方资料判定 PASS / CONFLICT / NEED_CONFIRM
Vision 画面文字质检：逐帧确认品牌 / 型号 / 参数 / 字幕 / 卖点，错别字以画面为准
AI 内容声明检查：平台 "作者声明：内容由 AI 生成" 或画面 AI 标注，二者有其一即可
确定性 Guard 校验：所有 AI 结论过机械校验，防伪造、防错配
6-Sheet Excel 交付：人工审核事项 / 明细 / 汇总 / 统计 / 知识库缺口 / 调试
通过视频自动清理：无问题的 mp4 自动删除并留删除报告
3. 完整流程（输入 → 分析 → 质检 → 输出）
plaintext
输入 secid + 日期 + Cookie
 → 采集下载 mp4 → 抽帧 + ASR（并行）
 → Vision 逐帧观测 → 合并 Evidence / v3_input
 → 知识库检索（质检规范 + 产品官方资料）
 → AI Audit 判定 + Vision 画面复核 + AI 声明检查
 → 写 audit_output → Guard 校验 → 6-Sheet Excel → 清理通过视频 → 验收
4. 主要技术和模型
表格
环节	技术
采集	Python + httpx + 抖音签名请求（分页 / 去重 / 断点）
抽帧	ffmpeg（随包携带，每 2 秒一帧）
ASR	faster-whisper（small / int8 / CPU / VAD）
OCR	PaddleOCR（legacy 模式与疑难复核备用）
语义判断	豆包工作 LLM（AI Audit）+ 多模态 Vision
知识依据	飞书知识库（质检规范库 + 产品官方资料）
校验 / 报表	jsonschema + openpyxl
5. 相比纯人工质检的价值
速度快：单视频约 77 秒（P50 80s），一个账号 124 条视频全链路跑完，人工要看好几天
标准统一：判定规则固化为 agent_prompt，不因质检员经验差异而漂移
证据可追溯：每条问题都绑定真实画面帧、时间点、官方来源，可回查、可申诉
以官方为准：所有 claim 对照官网规格参数 + 功能宣传，杜绝 "凭记忆 / 凭常识" 误判
合规兜底：AI 声明、参数口径、无官方依据三类问题分类呈现，人工只需审少数疑难项
6. 有价值的设计思路
人机分工：本地代码只做确定性的事（采集 / 证据 / 校验 / 报表），AI 只做语义的事（理解 / 判断 / 复核），并明确禁止把 AI 能力本地化复刻 —— 这是吸取 R1 版本教训后的架构红线
fast_hybrid 模式：Agent 逐帧视觉为主 + ASR 并行，OCR 默认 0 次调用，质量不降、速度约为旧方案的 4 倍
provenance 真实：不自造 source_id、不伪造官方引用，工具返回什么存什么
Guard fail-closed：AI 结论必须过 schema、绑定、错配、时间戳四类机械校验，不合格不许进报表
缺资料先问人：知识库缺产品资料时不擅自上网抓，让用户二选一（给网址 / 授权自找），补齐后必须人工确认
知识库按品牌 + 产品线组织：如 "美的洗碗机" 一个空间，新型号往对应库追加，严禁乱塞
执行纪律固化：数量红线（跑不满不许交付）、步骤打勾、禁批量代替逐帧、timestamp=0 的证据一律打回

<details>
<summary>查看系统细节图</summary>

### 质检结果页面

![质检结果页面](/img/video-audit/detail.png)

### 检测流程

![视频质检检测流程](/img/video-audit/detail-show.png)

### 问题详情

![问题详情页面](/img/video-audit/problem.png)

</details>