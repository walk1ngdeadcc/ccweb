---
title: "Claude Desktop配置第三方API"
date: "2026-05-26"
category: "Claude"
tags: ["Claude", "AI", "配置"]
summary: "Claude Desktop 接入第三方 API 的配置步骤。"
draft: false
favorite: false
---

# Claude Desktop配置第三方API

## 第一步：安装Claude Desktop客户端

下载地址：<https://claude.com/download>

安装完成之后，这一步不需要登录账号。

## 第二步：开启开发者模式

在左上角进入 **Help** → **Troubleshooting**，把 **Enable Developer Mode** 打开，然后重启客户端。

## 第三步：进入配置入口

重启之后，右上角会出现 **Developer** 选项。

进入之后选择 **Configure third-party inference**，这里就是配置第三方API的入口。

## 第四步：填写配置信息

### 一，接入DeepSeek

1.填入URL和Key

URL:https://api.deepseek.com/anthropic

![](/images/1.jpg)

2.填入模型名称

模型名称：

claude/deepseek-v4-flash

claude/deepseek-v4-pro

![](/images/2.png)

3.点击Apply locally