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
      'play.notconnected': '该机种模拟器尚未接入（敬请期待）',
      'play.notconnected.note': '街机 / GBA / MD / SFC 需要各自的模拟器内核，后续接入。',
      'play.cdnFail': '模拟器核心加载失败：请检查网络连接（需访问 cdn.emulatorjs.org）。',
      'play.map': '按键映射',
      'play.dpad': '方向',
      'play.ab': 'A / B 键',
      'play.btnStart': '开始',
      'play.btnSelect': '选择',
      'play.btnZoom': '缩放画面',
      'related': '相关推荐',
      'back': '返回首页',
      'footer.text': '本站为 yikm.net 的仿制演示，仅供学习交流，与原作者无关。',
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
      'play.notconnected': 'Emulator for this platform is not connected yet (coming soon)',
      'play.notconnected.note': 'Arcade / GBA / MD / SFC each need their own core, to be added later.',
      'play.cdnFail': 'Failed to load emulator core: check your network (needs access to cdn.emulatorjs.org).',
      'play.map': 'Controls',
      'play.dpad': 'Direction',
      'play.ab': 'A / B button',
      'play.btnStart': 'Start',
      'play.btnSelect': 'Select',
      'play.btnZoom': 'Zoom',
      'related': 'You May Also Like',
      'back': 'Back to Home',
      'footer.text': 'Fan-made replica of yikm.net for learning only. Not affiliated.',
      'lang.label': 'Language',
    },
  };

  const I18N = {
    lang: localStorage.getItem('monigames_lang') || 'cn',
    t(key) {
      return (STR[this.lang] && STR[this.lang][key]) || STR.cn[key] || key;
    },
    setLang(l) {
      if (!STR[l]) l = 'cn';
      this.lang = l;
      localStorage.setItem('monigames_lang', l);
      document.documentElement.lang = l === 'cn' ? 'zh-CN' : 'en';
      this.apply();
      if (typeof window.__onLang === 'function') window.__onLang();
    },
    apply() {
      document.documentElement.setAttribute('data-lang', this.lang);
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
