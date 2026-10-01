/* 中英双语字典 + 语言切换。无构建步骤，纯浏览器脚本。 */
(function () {
  const STR = {
    cn: {
      'site.name': '小霸王',
      'nav.home': '首页',
      'nav.all': '全部游戏',
      'search.ph': '搜索游戏、机种…',
      'hero.brand': '小霸王，其樂無窮',
      'hero.tagline': '願我們找回童年的快樂',
      'hero.start': '开始游戏',
      'hero.browse': '浏览全部',
      'section.more': '更多',
      'section.personal': '为你推荐',
      'personal.sub': '按你的设备专属生成，每款都不同',
      'cat.fc': '热门FC',
      'cat.md': '世嘉MD',
      'cat.sfc': '超任SFC',
      'cat.arcade': '热门街机',
      'cat.gba': '热门GBA',
      'list.title': '游戏列表',
      'list.empty': '没有找到相关游戏，换个关键词试试。',
      'list.all': '全部',
      'list.results': '共找到',
      'list.games': '款游戏',
      'play.title.suffix': '在线玩',
      'play.start': '▶ 开始游戏',
      'play.loading': '正在加载模拟器内核…',
      'play.demo': '演示版：接入模拟器内核与游戏 ROM 后即可运行。',
      'play.help': '操作说明',
      'play.save': 'Shift+1 快速存档（覆盖第一个存档）',
      'play.load': 'Shift+2 快速读档（第一个存档）',
      'play.pause': 'Shift+3 暂停 / 取消暂停',
      'play.ff': 'Shift+4 快进 / 取消快进',
      'play.zoom': 'Shift+ 控制画面缩放',
      'play.loading.rom': '正在加载 ROM…',
      'play.error': '无法加载游戏：',
      'play.using': '正在使用 WASM 模拟器内核（fceumm）运行',
      'play.emuHint': '键盘：W/A/S/D 移动 · K=A · J=B · 逗号(,)=连发A · M=连发B · I=开始 · U=选择；右上角菜单可存读档 / 设置 / 全屏。',
      'play.emuHintMd': '键盘：W/A/S/D 移动 · J=A · K=B · L=C · M=X · 逗号(,)=Y · 句号(.)=Z · I=开始 · U=选择(Mode)；右上角菜单可存读档 / 设置 / 全屏。',
      'play.usingMd': '正在使用 WASM 模拟器内核（genesis_plus_gx）运行',
      'play.emuHintArcade': '键盘：W/A/S/D 移动 · J/K/L 动作键（按游戏不同对应射击/跳/特殊） · U=投币 · I=开始 · 5/1 为备用投币/开始键；右上角菜单可存读档 / 设置 / 全屏。',
      'play.usingArcade': '正在使用 WASM 模拟器内核（fbneo）运行',
      'play.emuHintSfc': '键盘：W/A/S/D 移动 · J=B · K=Y · L=A · H=X · 逗号(,)=L 肩键 · 句号(.)=R 肩键 · I=开始 · U=选择；右上角菜单可存读档 / 设置 / 全屏。',
      'play.usingSfc': '正在使用 WASM 模拟器内核（snes9x）运行',
      'play.notconnected': '该机种模拟器尚未接入（敬请期待）',
      'play.notconnected.note': 'GBA / SFC 需要各自的模拟器内核，后续接入。',
      'play.cdnFail': '模拟器核心加载失败：请检查网络连接（需访问 cdn.emulatorjs.org）。',
      'play.map': '按键映射',
      'play.dpad': '方向',
      'play.ab': 'A / B 键',
      'play.btnStart': '开始',
      'play.btnSelect': '选择',
      'play.btnZoom': '缩放画面',
      'related': '相关推荐',
      'back': '返回首页',
      'footer.text': '本站为模拟器演示，仅供学习参考',
      'lang.label': '语言',
    },
    en: {
      'site.name': 'SUBOR',
      'nav.home': 'Home',
      'nav.all': 'All Games',
      'search.ph': 'Search games, platforms…',
      'hero.brand': 'SUBOR — Endless Fun',
      'hero.tagline': 'May we rediscover the joy of childhood',
      'hero.start': 'Start Playing',
      'hero.browse': 'Browse All',
      'section.more': 'More',
      'section.personal': 'For You',
      'personal.sub': 'Generated for your device — unique to you',
      'cat.fc': 'Popular NES / FC',
      'cat.md': 'Sega Mega Drive',
      'cat.sfc': 'Super Famicom',
      'cat.arcade': 'Arcade',
      'cat.gba': 'GBA',
      'list.title': 'Games',
      'list.empty': 'No games found. Try another keyword.',
      'list.all': 'All',
      'list.results': 'Found',
      'list.games': 'games',
      'play.title.suffix': 'Play Online',
      'play.start': '▶ Start Game',
      'play.loading': 'Loading emulator core…',
      'play.demo': 'Demo: connect an emulator core + ROM to run this game.',
      'play.help': 'Controls',
      'play.save': 'Shift+1 Quick Save (overwrites slot 1)',
      'play.load': 'Shift+2 Quick Load (slot 1)',
      'play.pause': 'Shift+3 Pause / Resume',
      'play.ff': 'Shift+4 Fast Forward / Off',
      'play.zoom': 'Shift+ to zoom',
      'play.loading.rom': 'Loading ROM…',
      'play.error': 'Failed to load game: ',
      'play.using': 'Running on a WASM emulator core (fceumm)',
      'play.emuHint': 'Keys: W/A/S/D = move · K = A · J = B · ,(comma) = turbo A · M = turbo B · I = Start · U = Select. Top-right menu for save/load/settings/fullscreen.',
      'play.emuHintMd': 'Keys: W/A/S/D = move · J = A · K = B · L = C · M = X · ,(comma) = Y · .(period) = Z · I = Start · U = Select(Mode). Top-right menu for save/load/settings/fullscreen.',
      'play.usingMd': 'Running on a WASM emulator core (genesis_plus_gx)',
      'play.emuHintArcade': 'Keys: W/A/S/D = move · J/K/L = action buttons (per game: fire/jump/special) · U = Coin · I = Start · 5/1 = backup coin/start. Top-right menu for save/load/settings/fullscreen.',
      'play.usingArcade': 'Running on a WASM emulator core (fbneo)',
      'play.emuHintSfc': 'Keys: W/A/S/D = move · J = B · K = Y · L = A · H = X · ,(comma) = L shoulder · .(period) = R shoulder · I = Start · U = Select. Top-right menu for save/load/settings/fullscreen.',
      'play.usingSfc': 'Running on a WASM emulator core (snes9x)',
      'play.notconnected': 'Emulator for this platform is not connected yet (coming soon)',
      'play.notconnected.note': 'GBA / SFC each need their own core, to be added later.',
      'play.cdnFail': 'Failed to load emulator core: check your network (needs access to cdn.emulatorjs.org).',
      'play.map': 'Controls',
      'play.dpad': 'Direction',
      'play.ab': 'A / B button',
      'play.btnStart': 'Start',
      'play.btnSelect': 'Select',
      'play.btnZoom': 'Zoom',
      'related': 'You May Also Like',
      'back': 'Back to Home',
      'footer.text': 'Emulator demo for learning reference only.',
      'lang.label': 'Language',
    },
  };

  // 优先读 URL 的 ?lang= 参数（便于 Google 分别索引中/英版），其次 localStorage，最后默认中文
  function langFromURL() {
    try {
      const l = new URLSearchParams(location.search).get('lang');
      if (l === 'en' || l === 'cn') return l;
    } catch (e) {}
    return null;
  }

  const I18N = {
    lang: langFromURL() || localStorage.getItem('monigames_lang') || 'cn',
    t(key) {
      return (STR[this.lang] && STR[this.lang][key]) || STR.cn[key] || key;
    },
    setLang(l) {
      if (!STR[l]) l = 'cn';
      this.lang = l;
      localStorage.setItem('monigames_lang', l);
      // 同步到 URL，使每种语言有独立可索引地址（保留 id/cat/q 等已有参数）
      try {
        const u = new URL(location.href);
        if (l === 'cn') u.searchParams.delete('lang');
        else u.searchParams.set('lang', l);
        history.replaceState(null, '', u.toString());
      } catch (e) {}
      this.apply();
      if (typeof window.__onLang === 'function') window.__onLang();
    },
    apply() {
      document.documentElement.setAttribute('data-lang', this.lang);
      document.documentElement.lang = this.lang === 'cn' ? 'zh-CN' : 'en';
      document.querySelectorAll('[data-i18n]').forEach((el) => {
        el.textContent = this.t(el.getAttribute('data-i18n'));
      });
      document.querySelectorAll('[data-i18n-ph]').forEach((el) => {
        el.setAttribute('placeholder', this.t(el.getAttribute('data-i18n-ph')));
      });
      document.querySelectorAll('[data-lang-btn]').forEach((b) => {
        b.classList.toggle('active', b.getAttribute('data-lang-btn') === this.lang);
      });
    },
  };

  window.I18N = I18N;
})();
