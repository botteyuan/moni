/* 公共页头/页脚渲染 + 搜索与语言切换接线。 */
(function () {
  function headerHTML() {
    return `
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" href="index.html">
          <span class="brand-mark">▶</span>
          <span class="brand-name" data-i18n="site.name">小霸王</span>
        </a>
        <nav class="nav">
          <a href="index.html" data-i18n="nav.home">首页</a>
          <a href="list.html" data-i18n="nav.all">全部游戏</a>
        </nav>
        <div class="header-right">
          <form class="search" onsubmit="return SITE_search(event)">
            <input type="search" id="searchInput" data-i18n-ph="search.ph" placeholder="搜索游戏、机种…" />
            <button type="submit" aria-label="search">🔍</button>
          </form>
          <div class="lang-switch" role="group" aria-label="language">
            <button data-lang-btn="cn" onclick="I18N.setLang('cn')">中文</button>
            <button data-lang-btn="en" onclick="I18N.setLang('en')">EN</button>
          </div>
        </div>
      </div>
    </header>`;
  }

  function footerHTML() {
    return `
    <footer class="site-footer">
      <div class="container">
        <p data-i18n="footer.text">本站为 yikm.net 的仿制演示，仅供学习交流。</p>
      </div>
    </footer>`;
  }

  window.SITE_search = function (e) {
    e.preventDefault();
    const q = (document.getElementById('searchInput').value || '').trim();
    location.href = 'list.html?q=' + encodeURIComponent(q);
    return false;
  };

  window.renderChrome = function () {
    const h = document.getElementById('site-header');
    const f = document.getElementById('site-footer');
    if (h) h.innerHTML = headerHTML();
    if (f) f.innerHTML = footerHTML();
    I18N.apply();
  };

  // 共享：游戏卡片 + 封面兜底（离线时显示标题占位图）
  window.placeholderSVG = function (text) {
    const safe = String(text).replace(/[<>&]/g, '');
    const svg =
      `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>` +
      `<rect width='100%' height='100%' fill='#16162a'/>` +
      `<text x='50%' y='42%' fill='#ff2e88' font-size='54' text-anchor='middle'>` +
      `🎮</text>` +
      `<text x='50%' y='68%' fill='#cfcfe8' font-size='14' text-anchor='middle' ` +
      `font-family='monospace'>${safe}</text></svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  };

  window.imgFallback = function (img) {
    const t = img.getAttribute('data-title') || 'GAME';
    img.onerror = null;
    img.src = window.placeholderSVG(t);
  };

  window.cardHTML = function (g) {
    const title = (g.title && (g.title[I18N.lang] || g.title.cn)) || 'GAME';
    const tag = g.tags ? (g.tags[I18N.lang] || g.tags.cn) : '';
    const coverHTML = g.cover
      ? `<img loading="lazy" src="${g.cover}" alt="${title}" data-title="${title}" onerror="imgFallback(this)">`
      : `<img loading="lazy" src="${window.placeholderSVG(title)}" alt="${title}">`;
    return (
      `<a class="game-card" href="play.html?id=${g.id}">` +
      `<div class="cover">${coverHTML}</div>` +
      `<div class="meta"><span class="g-title">${title}</span>` +
      (tag ? `<span class="g-tag">${tag}</span>` : '') +
      `</div></a>`
    );
  };
})();
