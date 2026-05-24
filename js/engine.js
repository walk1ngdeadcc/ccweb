// ========== 游戏引擎 ==========

const desktop = document.getElementById('desktop');
const character = document.getElementById('character');
const charSprite = document.getElementById('charSprite');
const itemsLayer = document.getElementById('itemsLayer');
const hudStatus = document.getElementById('hudStatus');
const bootScreen = document.getElementById('bootScreen');
const windowOverlay = document.getElementById('windowOverlay');
const windowTitle = document.getElementById('windowTitle');
const windowContent = document.getElementById('windowContent');
const terminalWindow = document.getElementById('terminalWindow');

// 游戏状态
const state = {
  x: window.innerWidth / 2 - 24,
  y: window.innerHeight / 2 - 30,
  vx: 0,
  vy: 0,
  speed: 3.5,
  keys: {},
  facingRight: true,
  isWalking: false,
  nearbyItem: null,
  isDragging: false,
  draggedItem: null,
  dragOffsetX: 0,
  dragOffsetY: 0,
  windowOpen: false
};

// 物品 DOM 引用
let itemElements = [];

// ========== 初始化 ==========
function init() {
  spawnItems();
  updateCharacterPosition();
  setupInput();
  startBootSequence();
  requestAnimationFrame(gameLoop);
}

// ========== 开机画面 ==========
function startBootSequence() {
  const lines = bootScreen.querySelectorAll('.boot-line');
  lines.forEach((line, i) => {
    line.style.animationDelay = `${i * 0.4}s`;
  });

  setTimeout(() => {
    bootScreen.classList.add('hidden');
    setTimeout(() => {
      bootScreen.style.display = 'none';
    }, 800);
  }, lines.length * 400 + 1000);
}

// ========== 生成桌面物品 ==========
function spawnItems() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  deskItems.forEach(item => {
    const el = document.createElement('div');
    el.className = 'desk-item';
    el.id = `item-${item.id}`;
    // 将百分比位置转为像素，留出边距
    const px = Math.max(60, Math.min(vw - 120, (item.x / 100) * vw));
    const py = Math.max(60, Math.min(vh - 140, (item.y / 100) * vh));
    el.style.left = `${px}px`;
    el.style.top = `${py}px`;
    el.style.color = item.color;
    el.dataset.itemId = item.id;

    el.innerHTML = `
      <div class="item-icon">${item.icon}</div>
      <div class="item-label">${item.name}</div>
    `;

    // 鼠标点击打开
    el.addEventListener('click', (e) => {
      if (!state.isDragging) {
        e.stopPropagation();
        openItem(item);
      }
    });

    // 鼠标拖拽
    el.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      state.isDragging = false;
      state.draggedItem = item;
      state.dragOffsetX = e.clientX - el.offsetLeft;
      state.dragOffsetY = e.clientY - el.offsetTop;

      const onMouseMove = (ev) => {
        state.isDragging = true;
        let nx = ev.clientX - state.dragOffsetX;
        let ny = ev.clientY - state.dragOffsetY;
        nx = Math.max(0, Math.min(vw - el.offsetWidth, nx));
        ny = Math.max(0, Math.min(vh - el.offsetHeight, ny));
        el.style.left = `${nx}px`;
        el.style.top = `${ny}px`;
      };

      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        setTimeout(() => { state.isDragging = false; state.draggedItem = null; }, 50);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    itemsLayer.appendChild(el);
    itemElements.push({ data: item, element: el });
  });
}

// ========== 输入处理 ==========
function setupInput() {
  window.addEventListener('keydown', (e) => {
    state.keys[e.key.toLowerCase()] = true;

    // 空格/回车打开附近物品
    if ((e.code === 'Space' || e.code === 'Enter') && !state.windowOpen) {
      e.preventDefault();
      if (state.nearbyItem) {
        openItem(state.nearbyItem);
      }
    }

    // ESC 关闭窗口
    if (e.code === 'Escape' && state.windowOpen) {
      closeWindow();
    }
  });

  window.addEventListener('keyup', (e) => {
    state.keys[e.key.toLowerCase()] = false;
  });

  // 点击桌面空白处关闭窗口
  desktop.addEventListener('click', () => {
    if (state.windowOpen) closeWindow();
  });
}

// ========== 游戏循环 ==========
function gameLoop() {
  if (!state.windowOpen) {
    handleMovement();
    checkProximity();
  }
  requestAnimationFrame(gameLoop);
}

// ========== 角色移动 ==========
function handleMovement() {
  let dx = 0;
  let dy = 0;

  if (state.keys['w'] || state.keys['arrowup']) dy -= 1;
  if (state.keys['s'] || state.keys['arrowdown']) dy += 1;
  if (state.keys['a'] || state.keys['arrowleft']) dx -= 1;
  if (state.keys['d'] || state.keys['arrowright']) dx += 1;

  // 对角线速度归一化
  if (dx !== 0 && dy !== 0) {
    const len = Math.sqrt(dx * dx + dy * dy);
    dx /= len;
    dy /= len;
  }

  state.vx = dx * state.speed;
  state.vy = dy * state.speed;

  state.x += state.vx;
  state.y += state.vy;

  // 边界限制
  const maxX = window.innerWidth - 48;
  const maxY = window.innerHeight - 80;
  state.x = Math.max(0, Math.min(maxX, state.x));
  state.y = Math.max(0, Math.min(maxY, state.y));

  // 面向方向
  if (dx > 0) state.facingRight = true;
  if (dx < 0) state.facingRight = false;

  // 行走动画
  const isMoving = dx !== 0 || dy !== 0;
  if (isMoving !== state.isWalking) {
    state.isWalking = isMoving;
    charSprite.classList.toggle('walking', isMoving);
  }
  charSprite.classList.toggle('flip', !state.facingRight);

  updateCharacterPosition();
}

function updateCharacterPosition() {
  character.style.left = `${state.x}px`;
  character.style.top = `${state.y}px`;
}

// ========== 碰撞/接近检测 ==========
function checkProximity() {
  const charCx = state.x + 24;
  const charCy = state.y + 30;

  let closest = null;
  let closestDist = Infinity;

  itemElements.forEach(({ data, element }) => {
    const rect = element.getBoundingClientRect();
    const itemCx = rect.left + rect.width / 2;
    const itemCy = rect.top + rect.height / 2;
    const dist = Math.hypot(charCx - itemCx, charCy - itemCy);

    if (dist < 70 && dist < closestDist) {
      closest = data;
      closestDist = dist;
    }

    element.classList.toggle('nearby', dist < 70);
  });

  state.nearbyItem = closest;

  if (closest) {
    hudStatus.innerHTML = `靠近 <span style="color:${closest.color}">${closest.name}</span> — 按 <span class="hud-key">SPACE</span> 打开`;
  } else {
    hudStatus.textContent = '在桌面上探索...';
  }
}

// ========== 打开物品 ==========
function openItem(item) {
  state.windowOpen = true;
  windowTitle.textContent = item.name;
  windowTitle.style.color = item.color;

  const content = renderContent(item.type);
  windowContent.innerHTML = content;
  windowOverlay.classList.add('active');

  // 窗口打开动画
  terminalWindow.style.animation = 'none';
  terminalWindow.offsetHeight; // 触发重排
  terminalWindow.style.animation = '';
}

// ========== 渲染内容 ==========
function renderContent(type) {
  switch (type) {
    case 'articles':
      return renderArticles();
    case 'projects':
      return renderProjects();
    case 'tools':
      return renderTools();
    case 'about':
      return renderAbout();
    case 'contact':
      return renderContact();
    default:
      return '<p>暂无内容</p>';
  }
}

function renderArticles() {
  let html = '<h1>📗 日志本</h1><p>双击文章标题阅读完整内容</p><ul class="article-list">';
  blogData.articles.forEach((article, i) => {
    html += `
      <li class="article-item" onclick="openArticle(${i})">
        <div class="article-item-title">${article.title}</div>
        <div class="article-item-meta">
          <span>${article.date}</span>
          <span class="article-tag">${article.tag}</span>
        </div>
      </li>
    `;
  });
  html += '</ul>';
  return html;
}

function renderProjects() {
  let html = '<h1>📁 项目文件夹</h1><p>一些做过的和正在做的事情</p><div class="project-grid">';
  blogData.projects.forEach(proj => {
    html += `
      <div class="project-card">
        <h3>${proj.name}</h3>
        <p>${proj.desc}</p>
        <div class="project-tags">
          ${proj.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
        </div>
      </div>
    `;
  });
  html += '</div>';
  return html;
}

function renderTools() {
  let html = '<h1>🧰 工具箱</h1><p>日常开发中离不开的好东西</p><ul class="tool-list">';
  blogData.tools.forEach(tool => {
    html += `
      <li class="tool-item">
        <span class="tool-icon">${tool.icon}</span>
        <div class="tool-info">
          <h4>${tool.name}</h4>
          <p>${tool.desc}</p>
        </div>
      </li>
    `;
  });
  html += '</ul>';
  return html;
}

function renderAbout() {
  const a = blogData.about;
  return `
    <div class="about-header">
      <div class="about-avatar">☕</div>
      <div class="about-intro">
        <h2>${a.name}</h2>
        <p>${a.role}</p>
      </div>
    </div>
    <p>${a.bio}</p>
    <h2>技术栈</h2>
    <div class="project-tags">
      ${a.skills.map(s => `<span class="project-tag">${s}</span>`).join('')}
    </div>
    <h2>关于这个博客</h2>
    <p>受经典操作系统桌面和游戏机的启发，我把博客做成了一个<strong>可交互的像素桌面</strong>。希望你在探索的过程中，能感受到技术也可以很有趣。</p>
  `;
}

function renderContact() {
  let html = '<h1>🔌 电路板</h1><p>这里可以找到我</p><div class="contact-links">';
  blogData.contacts.forEach(c => {
    html += `
      <a class="contact-link" href="${c.url}" target="_blank" rel="noopener">
        <span class="contact-link-icon">${c.icon}</span>
        <div>
          <div style="font-weight:bold;color:#ffd700">${c.name}</div>
          <div style="font-size:11px;color:#6e7681">${c.label}</div>
        </div>
      </a>
    `;
  });
  html += '</div>';
  return html;
}

// ========== 打开单篇文章 ==========
function openArticle(index) {
  const article = blogData.articles[index];
  windowTitle.textContent = article.title;
  windowTitle.style.color = '#00ff41';
  windowContent.innerHTML = article.content;
}

// ========== 关闭窗口 ==========
function closeWindow() {
  state.windowOpen = false;
  windowOverlay.classList.remove('active');
}

function maybeCloseWindow(e) {
  if (e.target === windowOverlay) {
    closeWindow();
  }
}

// ========== 窗口大小改变 ==========
window.addEventListener('resize', () => {
  const maxX = window.innerWidth - 48;
  const maxY = window.innerHeight - 80;
  state.x = Math.min(state.x, maxX);
  state.y = Math.min(state.y, maxY);
  updateCharacterPosition();
});

// ========== 启动 ==========
init();
