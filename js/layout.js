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

  // ---- 个人专属推荐 ----
  // 浏览器无法读取真实 MAC，故用「每设备持久化的 UUID + 浏览器指纹」作为个性化属性，
  // 以该属性为种子确定性地洗牌游戏列表，保证：每人（每设备）看到的一组不同、且刷新后稳定。
  (function () {
    function getDeviceId() {
      let id = localStorage.getItem('monigames_device_id');
      if (!id) {
        try {
          id = 'D' + (crypto.randomUUID ? crypto.randomUUID() : (Date.now().toString(36) + Math.random().toString(36).slice(2)));
        } catch (e) {
          id = 'D' + Date.now().toString(36) + Math.random().toString(36).slice(2);
        }
        localStorage.setItem('monigames_device_id', id);
      }
      return id;
    }
    function fingerprint() {
      const n = navigator, s = screen;
      return [
        n.userAgent, n.language, (n.languages || []).join(','),
        s.width + 'x' + s.height, s.colorDepth,
        new Date().getTimezoneOffset(), n.hardwareConcurrency, n.platform,
      ].join('|');
    }
    // 字符串 → 32 位种子
    function xmur3(str) {
      let h = 1779033703 ^ str.length;
      for (let i = 0; i < str.length; i++) {
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
        h = (h << 13) | (h >>> 19);
      }
      return function () {
        h = Math.imul(h ^ (h >>> 16), 2246822507);
        h = Math.imul(h ^ (h >>> 13), 3266489909);
        return (h ^= h >>> 16) >>> 0;
      };
    }
    // 确定性伪随机
    function mulberry32(a) {
      return function () {
        a |= 0; a = (a + 0x6D2B79F5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }
    window.Personal = {
      deviceId: getDeviceId,
      // 返回最多 count 个互不相同、按设备确定性排序的游戏
      picks(games, count) {
        const seed = xmur3(getDeviceId() + '||' + fingerprint())();
        const rnd = mulberry32(seed);
        const arr = games.slice();
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(rnd() * (i + 1));
          const tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
        }
        return arr.slice(0, Math.min(count, arr.length));
      },
      // 专属短编号（展示用），让人一眼看出「这是为我定制的」
      badge() {
        const h = xmur3(getDeviceId())();
        return ('0000' + h.toString(16).toUpperCase()).slice(-4);
      },
    };
  })();
})();
