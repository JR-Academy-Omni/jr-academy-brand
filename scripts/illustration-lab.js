(() => {
  const root = document.getElementById('illustration-lab');
  if (!root) return;
  const artworks = {
    handdrawn: { label: '手绘人物', caption: '人物负责情绪，文字负责结论', usage: '解释学习处境、职业困惑与成长故事。', caution: '一位主角、一个动作；标题放在图片外。', html: '<img src="assets/illustrations/career-impact/result-ai-wizard.png" alt="戴紫色魔法帽的学习者拿着电脑，周围环绕 AI 工具插图" loading="lazy">' },
    dimensional: { label: '柔和 3D', caption: '用空间和材质表达产品感', usage: '官网产品介绍、能力总览与品牌主视觉。', caution: '使用留白承接正文；不要把装饰面板当成真实界面。', html: '<img src="assets/illustrations/generated/product-ecosystem-banner.png" alt="珊瑚与紫色的立体平台，环绕学习、编程与职业图标" loading="lazy">' },
    collage: { label: '场景拼贴', caption: '一位主角，串起多个任务', usage: '多任务痛点、能力组合、活动与课程封面。', caution: '最多三个辅助贴片；不混入不同画风的人物。', html: '<div class="il-collage"><img src="assets/illustrations/career-impact/result-ai-wizard.png" alt="手绘 AI 学习者" loading="lazy"><span class="il-sticker">01 · 明确目标</span><span class="il-sticker">02 · 动手做项目</span><span class="il-sticker">03 · 展示作品</span></div>' },
    diagram: { label: '结构图解', caption: '用节点与箭头讲清关系', usage: '技术架构、课程路径、工作流与模块关系。', caution: '节点和连接使用可编辑文字与结构；不把文字烘焙进图片。', html: '<div class="il-diagram" role="img" aria-label="示意学习流程：学习目标进入实战练习，再产出作品"><div class="il-node"><b>学习目标</b><span>背景 · 方向 · 时间</span></div><span class="il-arrow" aria-hidden="true">→</span><div class="il-node il-hub"><b>实战练习</b><span>任务 · 反馈 · 迭代</span></div><span class="il-arrow" aria-hidden="true">→</span><div class="il-node"><b>作品产出</b><span>应用 · 方案 · 复盘</span></div></div>' }
  };
  const layouts = { center: '居中大图', split: '左图右文', immersive: '整幅展示' };
  const params = new URLSearchParams(location.search);
  let art = Object.hasOwn(artworks, params.get('art')) ? params.get('art') : 'handdrawn';
  let layout = Object.hasOwn(layouts, params.get('layout')) ? params.get('layout') : 'split';
  root.innerHTML = `<span class="system-kicker">ILLUSTRATION × COMPOSITION</span><h2 id="illustration-lab-title">多种插画，同一套视觉语言</h2><p class="il-lead">先选内容如何表达，再选画面如何展示。人物、拼贴和结构图共享字体、配色与外框规范；上方三档强度也会同步作用于这里。</p><div class="il-controls"><fieldset><legend>01 / 插画方式</legend><div class="il-options">${Object.entries(artworks).map(([key, item]) => `<button type="button" data-art-choice="${key}" aria-pressed="false">${item.label}</button>`).join('')}</div></fieldset><fieldset><legend>02 / 展示版式</legend><div class="il-options">${Object.entries(layouts).map(([key, label]) => `<button type="button" data-layout-choice="${key}" aria-pressed="false">${label}</button>`).join('')}</div></fieldset></div><article class="il-board"><div class="il-eyebrow"><span>JR ACADEMY · VISUAL STORY</span><span>设计示例 / 非课程承诺</span></div><h3>从一个想法，<mark>到一件作品</mark></h3><p>把学习目标拆成可执行的任务，让每次练习都有看得见的产出。</p><div class="il-composition"><div class="il-art"></div><aside class="il-notes"><div class="il-note"><b>适合讲什么</b><p id="il-usage"></p></div><div class="il-note"><b>构图约束</b><p id="il-caution"></p></div><div class="il-note"><b>移动端</b><p>图文上下排列，结构图转纵向，完整保留主体与可读文字。</p></div></aside></div><div class="il-caption" aria-live="polite"></div></article><p class="il-rule">素材来源：现有 JR 插画库。拼贴复用同一人物；结构图为可编辑 HTML 示意。漫画分镜可沿用人物叙事规则扩展，当前未新增漫画素材。</p>`;
  const nav = document.querySelector('.toplinks');
  if (nav) { const link = document.createElement('a'); link.href = '#illustration-lab'; link.textContent = '插画与版式'; nav.prepend(link); }
  function render() {
    const item = artworks[art];
    root.querySelector('.il-board').dataset.layout = layout;
    const stage = root.querySelector('.il-art'); stage.dataset.art = art; stage.innerHTML = item.html;
    root.querySelector('#il-usage').textContent = item.usage;
    root.querySelector('#il-caution').textContent = item.caution;
    root.querySelector('.il-caption').textContent = item.caption;
    root.querySelectorAll('[data-art-choice]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.artChoice === art)));
    root.querySelectorAll('[data-layout-choice]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.layoutChoice === layout)));
  }
  root.addEventListener('click', event => {
    const button = event.target.closest('button'); if (!button) return;
    if (button.dataset.artChoice) art = button.dataset.artChoice;
    else if (button.dataset.layoutChoice) layout = button.dataset.layoutChoice;
    else return;
    const url = new URL(location.href); url.searchParams.set('art', art); url.searchParams.set('layout', layout);
    history.pushState(null, '', url); render();
  });
  window.addEventListener('popstate', () => {
    const query = new URLSearchParams(location.search);
    art = Object.hasOwn(artworks, query.get('art')) ? query.get('art') : 'handdrawn';
    layout = Object.hasOwn(layouts, query.get('layout')) ? query.get('layout') : 'split'; render();
  });
  render();
})();
