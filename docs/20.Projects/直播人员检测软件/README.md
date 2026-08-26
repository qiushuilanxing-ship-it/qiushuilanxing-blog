---
title: LiveInspector - AI直播智能巡检平台
date: 2026-08-25 15:10:00
permalink: /projects/live-inspector/
article: true
categories:
  - 项目记录
  - 直播人员检测软件
tags:
  - LiveInspector
  - AI视觉
  - 直播巡检
  - Python
  - FastAPI
  - React
comment: false
---

# LiveInspector - AI直播智能巡检平台

## 项目简介

LiveInspector 是一套面向企业直播场景的智能巡检系统，通过本地客户端采集直播运行状态，结合 AI 视觉检测与服务端管理平台，实现对多直播间、多设备的自动化监控与异常告警。

系统用于解决企业直播过程中人工巡查成本高、异常发现不及时、直播质量难量化等问题。

## 软件使用教程

- [查看 LiveInspector 飞书使用教程](https://lcnu9zjo6wvs.feishu.cn/wiki/RMN9wIQlIiNZTmkpP75cvspwnhc?from=from_copylink)

---

## 核心功能

### 1. 直播实时状态监控

通过客户端持续采集直播状态，实现：

- 直播画面采集
- 视频流状态检测
- 音频状态检测
- 主播在线状态分析
- 黑屏、冻结等异常识别
- 客户端在线状态监测

### 2. AI视觉智能巡检

基于计算机视觉模型，对直播画面进行自动分析：

- 主播是否在场
- 是否出现黑屏
- 是否长时间静帧
- 画面稳定性检测
- 异常画面识别

减少人工盯盘成本，提高直播质量保障能力。

### 3. 自动异常告警

系统支持异常事件自动检测与通知：

- 直播中断
- 客户端离线
- 音频异常
- 视频异常
- 黑屏异常

异常触发后自动推送飞书机器人消息，帮助运营人员快速处理。

### 4. 多直播间管理

管理端支持：

- 多直播间绑定管理
- 设备管理
- 负责人配置
- 巡检状态查看
- 历史告警查询
- 数据统计分析

实现企业级直播运营管理。

### 5. 实时直播观看

提供网页端直播查看能力：

- 自动解析直播流
- HLS 转换播放
- 多用户共享观看
- Viewer 会话管理
- 自动清理无效播放任务

支持运营人员在后台快速查看直播状态。

---

## 技术架构

```text
直播平台
    |
    v
直播流解析
    |
    v
Live Viewer
    |
    v
HLS 播放服务
    |
    v
Web 管理端

Windows 客户端
    |
    v
视频采集 + AI 检测
    |
    v
状态上报服务
    |
    v
后端管理平台
    |
    v
数据库 / 告警系统 / 飞书通知
```

---

## 技术栈

### 客户端

- Python
- OpenCV
- YOLO 视觉模型
- FFmpeg
- PyInstaller

### 服务端

- FastAPI
- SQLite
- Uvicorn
- Linux
- Nginx

### Web管理端

- React
- Vite
- JavaScript
- REST API

### 流媒体

- FFmpeg
- HLS
- HTTP Streaming

### 通知系统

- 飞书机器人 Webhook

---

## 项目亮点

- 从人工巡查升级为自动化 AI 巡检
- 支持多直播间、多设备统一管理
- 结合视觉模型实现直播质量检测
- 构建完整的客户端 + 服务端 + Web 管理平台架构
- 支持异常检测、状态追踪、消息通知闭环

---

## 项目价值

帮助企业降低直播运营人工成本，提高直播稳定性，实现直播业务从“人工盯场”向“智能监控”的转变。
