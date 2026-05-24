// ========== 桌面物品数据 ==========
const deskItems = [
  {
    id: 'notebook',
    name: '日志本',
    icon: '📗',
    x: 15, y: 20,
    color: '#00ff41',
    type: 'articles',
    desc: '教程文章'
  },
  {
    id: 'folder',
    name: '项目文件夹',
    icon: '📁',
    x: 55, y: 25,
    color: '#ffb000',
    type: 'projects',
    desc: '项目展示'
  },
  {
    id: 'toolbox',
    name: '工具箱',
    icon: '🧰',
    x: 25, y: 55,
    color: '#58a6ff',
    type: 'tools',
    desc: '常用工具'
  },
  {
    id: 'coffee',
    name: '咖啡杯',
    icon: '☕',
    x: 70, y: 60,
    color: '#ff6b6b',
    type: 'about',
    desc: '关于我'
  },
  {
    id: 'circuit',
    name: '电路板',
    icon: '🔌',
    x: 80, y: 35,
    color: '#ffd700',
    type: 'contact',
    desc: '联系方式'
  }
];

// ========== 博客内容数据 ==========
const blogData = {
  // 教程文章
  articles: [
    {
      title: '如何用 GitHub Actions 自动部署静态网站',
      date: '2025-05-20',
      tag: 'DevOps',
      content: `
<h1>如何用 GitHub Actions 自动部署静态网站</h1>
<p><span class="article-tag">DevOps</span> &nbsp; 2025-05-20</p>

<h2>前言</h2>
<p>每次更新博客都要手动上传文件？太麻烦了。本文教你用 GitHub Actions 实现<strong> push 即部署</strong>。</p>

<h2>准备工作</h2>
<ul>
  <li>一个 GitHub 仓库</li>
  <li>静态网站文件（HTML/CSS/JS）</li>
</ul>

<h2>配置步骤</h2>
<h3>1. 创建 Workflow 文件</h3>
<p>在仓库根目录创建 <code>.github/workflows/deploy.yml</code>：</p>
<pre><code>name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: .
      - uses: actions/deploy-pages@v4</code></pre>

<h3>2. 开启 Pages 功能</h3>
<p>进入仓库 <strong>Settings → Pages</strong>，Source 选择 <strong>GitHub Actions</strong>。</p>

<h3>3. 推送代码</h3>
<pre><code>git add .
git commit -m "添加自动部署"
git push</code></pre>

<h2>完成</h2>
<p>打开 Actions 标签页，看到绿色 ✓ 就代表部署成功。访问 <code>https://你的用户名.github.io/仓库名</code> 即可看到网站。</p>

<blockquote>
以后每次 push 代码，网站都会自动更新。把写作集中在内容本身，而不是部署流程上。
</blockquote>
      `
    },
    {
      title: 'CSS Grid 完全指南：从入门到实战',
      date: '2025-05-15',
      tag: 'CSS',
      content: `
<h1>CSS Grid 完全指南：从入门到实战</h1>
<p><span class="article-tag">CSS</span> &nbsp; 2025-05-15</p>

<h2>为什么学 Grid？</h2>
<p>Flexbox 擅长一维布局，Grid 擅长二维布局。当需要同时控制行和列时，Grid 是最佳选择。</p>

<h2>核心概念</h2>
<h3>容器与项目</h3>
<pre><code>.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  gap: 16px;
}</code></pre>

<h3>常用单位</h3>
<ul>
  <li><code>fr</code>：剩余空间的分数</li>
  <li><code>minmax(200px, 1fr)</code>：最小 200px，最大占满</li>
  <li><code>repeat(3, 1fr)</code>：重复 3 次</li>
</ul>

<h2>实战：圣杯布局</h2>
<pre><code>.layout {
  display: grid;
  grid-template:
    "header header header" auto
    "left   main   right" 1fr
    "footer footer footer" auto
    / 200px  1fr    200px;
  min-height: 100vh;
  gap: 0;
}
.header { grid-area: header; }
.left   { grid-area: left; }
.main   { grid-area: main; }
.right  { grid-area: right; }
.footer { grid-area: footer; }</code></pre>

<h2>响应式技巧</h2>
<pre><code>.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}</code></pre>
<p>这行代码可以自动适应任何屏幕宽度，无需媒体查询。</p>

<h2>总结</h2>
<p>Grid 是现代 CSS 布局的终极解决方案。掌握 <code>grid-template</code>、<code>gap</code>、<code>auto-fit</code> 这三个核心，就能应对绝大多数场景。</p>
      `
    },
    {
      title: 'JavaScript 异步编程：从 Callback 到 Async/Await',
      date: '2025-05-10',
      tag: 'JavaScript',
      content: `
<h1>JavaScript 异步编程：从 Callback 到 Async/Await</h1>
<p><span class="article-tag">JavaScript</span> &nbsp; 2025-05-10</p>

<h2>为什么需要异步？</h2>
<p>JavaScript 是单线程的。如果网络请求阻塞了主线程，页面就会卡死。异步让代码<strong>等待时不阻塞</strong>。</p>

<h2>三代演进</h2>
<h3>第一代：Callback</h3>
<pre><code>getData(function(err, data) {
  if (err) return console.error(err);
  processData(data, function(err, result) {
    if (err) return console.error(err);
    saveResult(result, function(err) {
      if (err) return console.error(err);
      console.log('完成');
    });
  });
});</code></pre>
<p>这就是著名的"回调地狱"，代码横向蔓延，难以维护。</p>

<h3>第二代：Promise</h3>
<pre><code>getData()
  .then(data => processData(data))
  .then(result => saveResult(result))
  .then(() => console.log('完成'))
  .catch(err => console.error(err));</code></pre>
<p>链式调用解决了缩进问题，但多个并行请求还是复杂。</p>

<h3>第三代：Async/Await</h3>
<pre><code>async function run() {
  try {
    const data = await getData();
    const result = await processData(data);
    await saveResult(result);
    console.log('完成');
  } catch (err) {
    console.error(err);
  }
}</code></pre>
<p>看起来和同步代码一样！这才是人类可读的方式。</p>

<h2>并行请求</h2>
<pre><code>const [users, posts, comments] = await Promise.all([
  fetch('/users'),
  fetch('/posts'),
  fetch('/comments')
]);</code></pre>

<h2>最佳实践</h2>
<ul>
  <li>用 <code>try/catch</code> 处理错误，不要用裸 await</li>
  <li>循环中谨慎使用 await，会串行执行</li>
  <li>需要并行时用 <code>Promise.all()</code></li>
</ul>

<blockquote>
Async/Await 不是新语法，而是 Promise 的语法糖。理解 Promise 底层，才能真正掌握异步。
</blockquote>
      `
    },
    {
      title: 'Docker 入门：容器化你的第一个应用',
      date: '2025-05-05',
      tag: 'Docker',
      content: `
<h1>Docker 入门：容器化你的第一个应用</h1>
<p><span class="article-tag">Docker</span> &nbsp; 2025-05-05</p>

<h2>什么是 Docker？</h2>
<p>Docker 让应用运行在<strong>一致的容器环境</strong>中，告别"在我电脑上能跑"的问题。</p>

<h2>核心概念</h2>
<ul>
  <li><strong>镜像（Image）</strong>：应用的只读模板</li>
  <li><strong>容器（Container）</strong>：镜像的运行实例</li>
  <li><strong>Dockerfile</strong>：定义镜像构建步骤的脚本</li>
</ul>

<h2>实战：容器化 Node.js 应用</h2>
<h3>1. 编写 Dockerfile</h3>
<pre><code>FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]</code></pre>

<h3>2. 构建镜像</h3>
<pre><code>docker build -t my-app:1.0 .</code></pre>

<h3>3. 运行容器</h3>
<pre><code>docker run -d -p 3000:3000 --name my-app my-app:1.0</code></pre>

<h2>常用命令速查</h2>
<pre><code>docker ps           # 查看运行中的容器
docker logs -f 容器名  # 查看日志
docker exec -it 容器名 sh  # 进入容器
docker stop 容器名     # 停止容器
docker rm 容器名       # 删除容器</code></pre>

<h2>下一步</h2>
<p>学会 Docker Compose，用 <code>docker-compose.yml</code> 一键启动多容器应用（前端 + 后端 + 数据库）。</p>
      `
    }
  ],

  // 项目展示
  projects: [
    {
      name: '像素桌面博客',
      desc: '你正在浏览的这个网站！一个游戏化的个人博客，工程师在桌面上行走，打开物品来阅读内容。',
      tags: ['HTML', 'CSS', 'JavaScript', 'Canvas']
    },
    {
      name: 'API 网关中间件',
      desc: '基于 Node.js 的轻量级 API 网关，支持限流、鉴权、日志和负载均衡。',
      tags: ['Node.js', 'Redis', 'Docker']
    },
    {
      name: '实时协作编辑器',
      desc: '类似 Notion 的在线文档编辑器，支持多人实时协作和 Markdown 导出。',
      tags: ['React', 'WebSocket', 'Y.js']
    },
    {
      name: 'CLI 工具集',
      desc: '一套提升前端开发效率的命令行工具，包含项目脚手架、代码生成器和自动部署脚本。',
      tags: ['TypeScript', 'CLI', 'Node.js']
    }
  ],

  // 常用工具
  tools: [
    { icon: '🛠️', name: 'VS Code', desc: '宇宙最强编辑器，配合插件几乎无所不能' },
    { icon: '🐙', name: 'Git & GitHub', desc: '版本控制和代码托管，开发者的基础设施' },
    { icon: '🐳', name: 'Docker', desc: '容器化部署，让环境一致性不再是问题' },
    { icon: '⚡', name: 'Vite', desc: '下一代前端构建工具，秒级启动、极速热更新' },
    { icon: '🎨', name: 'Figma', desc: '在线设计工具，写代码前先画好蓝图' },
    { icon: '📡', name: 'Postman / Hoppscotch', desc: 'API 调试必备，REST 和 GraphQL 通吃' }
  ],

  // 关于我
  about: {
    name: 'Pixel Engineer',
    role: '全栈开发者 / 技术写作者',
    bio: '热爱用代码构建有趣的东西。相信好的技术应该被清晰地解释，所以写教程分享所学。平时喜欢在像素世界里游荡，偶尔也写写像素风的小游戏。',
    skills: ['JavaScript/TypeScript', 'React/Vue', 'Node.js', 'Docker', 'Linux', 'Git']
  },

  // 联系方式
  contacts: [
    { icon: '🐙', name: 'GitHub', url: 'https://github.com', label: '查看开源项目' },
    { icon: '🐦', name: 'Twitter / X', url: 'https://twitter.com', label: '技术随想' },
    { icon: '📧', name: 'Email', url: 'mailto:hello@example.com', label: 'hello@example.com' },
    { icon: '💬', name: 'Telegram', url: 'https://t.me', label: '技术交流群' }
  ]
};
