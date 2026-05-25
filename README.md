# ZeroOne Notes

一个面向个人学习记录的静态知识库网站，融合了像素桌面游戏的 CRT 特效与 ChatGPT 风格的简洁科技感。

## 特性

- 🎮 **BIOS 开机动画**：复古终端风格的启动画面
- 📺 **CRT 扫描线效果**：全局覆盖的显示器质感
- 🖱️ **0/1 鼠标透镜**：鼠标悬停时背景出现二进制数字圆形区域
- 📝 **Markdown 内容管理**：所有笔记以 Markdown 存储在 Git 仓库中
- 🔍 **前端搜索**：构建时生成搜索索引，支持标题、摘要、标签、分类搜索
- 🏷️ **分类与标签**：按知识分类和标签组织内容
- 📅 **时间归档**：按年月查看笔记时间线
- ⭐ **收藏功能**：标记重要笔记到收藏页
- 🌓 **深色/浅色主题**：一键切换，偏好自动保存
- 📱 **响应式设计**：适配桌面、平板、手机

## 技术栈

```
Astro + TypeScript + TailwindCSS + Markdown + Cloudflare Pages
```

## 项目结构

```
├── src/
│   ├── components/       # UI 组件
│   │   ├── BootScreen.astro      # BIOS 开机动画
│   │   ├── BinaryBackground.astro # 0/1 Canvas 背景
│   │   ├── CRTEffect.astro       # CRT 扫描线
│   │   ├── Header.astro          # 顶部导航
│   │   ├── Footer.astro          # 页脚
│   │   ├── SearchBox.astro       # 搜索框
│   │   ├── NoteCard.astro        # 笔记卡片
│   │   ├── CategoryCard.astro    # 分类卡片
│   │   └── TagPill.astro         # 标签胶囊
│   ├── layouts/
│   │   └── BaseLayout.astro      # 基础布局
│   ├── pages/            # 路由页面
│   │   ├── index.astro           # 首页
│   │   ├── notes/
│   │   │   ├── index.astro       # 笔记列表
│   │   │   └── [slug].astro      # 笔记详情
│   │   ├── categories/           # 分类页
│   │   ├── tags/                 # 标签页
│   │   ├── archive.astro         # 归档页
│   │   ├── favorites.astro       # 收藏页
│   │   ├── about.astro           # 关于页
│   │   └── 404.astro             # 404 页
│   └── content/
│       └── notes/        # Markdown 笔记
├── public/               # 静态资源
│   ├── styles/global.css # 全局样式
│   └── search-index.json # 搜索索引
├── dist/                 # 构建输出（Cloudflare Pages）
├── astro.config.mjs      # Astro 配置
├── tailwind.config.mjs   # Tailwind 配置
└── package.json
```

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建
npm run build

# 预览构建结果
npm run preview
```

## 部署到 Cloudflare Pages

### 1. 推送代码到 GitHub

```bash
git add .
git commit -m "init zeroone notes"
git push
```

### 2. Cloudflare Pages 配置

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Pages** → **创建项目**
3. 连接 GitHub 仓库
4. 构建设置：
   - **Framework preset**: Astro
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. 点击 **保存并部署**

部署完成后，你会获得一个 `xxx.pages.dev` 的访问地址。后续每次 `git push` 都会自动重新构建并部署。

## 写作流程

### 新增笔记

1. 在 `src/content/notes/` 下新建 `.md` 文件
2. 填写 frontmatter：

```md
---
title: "笔记标题"
date: "2026-05-25"
category: "分类名称"
tags: ["标签1", "标签2"]
summary: "笔记摘要"
draft: false
favorite: false
difficulty: "入门"
---

# 标题

## 一句话总结

## 核心概念

## 代码示例

## 面试回答

## 常见问题
```

3. 本地运行 `npm run dev` 预览
4. `git add . && git commit -m "add note" && git push`
5. Cloudflare Pages 自动部署

### 修改笔记

1. 打开对应 Markdown 文件
2. 修改内容
3. 更新 `updated` 字段
4. 提交并推送
5. 网站自动重新部署

## 配色参考

| 元素 | 深色 | 浅色 |
|-----|------|------|
| 页面背景 | `#0B0F19` | `#F7F7F8` |
| 主文字 | `#F9FAFB` | `#111827` |
| 次级文字 | `#9CA3AF` | `#6B7280` |
| 强调色 | `#10A37F` | `#10A37F` |
| 卡片背景 | `rgba(255,255,255,0.06)` | `rgba(255,255,255,0.75)` |

## 许可证

MIT
