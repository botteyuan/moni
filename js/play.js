/* 游戏页逻辑：FC 游戏经 EmulatorJS（fceumm WASM 核心）真机运行；
   其余机种暂未接入模拟器内核，显示占位提示。 */
(function () {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const game = window.SITE ? SITE.getGame(id) : null;

  const titleEl = document.getElementById('playTitle');
  const subEl = document.getElementById('playSub');
  const stageEl = document.getElementById('stage');
  const gameEl = document.getElementById('game');
  const phEl = document.getElementById('placeholder');
  const controlsEl = document.getElementById('controls');
  const relatedEl = document.getElementById('relatedGrid');

  renderChrome();

  if (!game) {
    titleEl.textContent = '404';
    subEl.textContent = '';
    if (relatedEl) relatedEl.innerHTML = '';
    if (controlsEl) controlsEl.innerHTML = '';
    return;
  }

  const titleOf = () => (game.title[I18N.lang] || game.title.cn);
  const subOf = () => (game.tags ? (game.tags[I18N.lang] || game.tags.cn) : '');

  function renderTitle() {
    titleEl.textContent = titleOf() + ' · ' + I18N.t('play.title.suffix');
    subEl.textContent = subOf();
  }

  function renderRelated() {
    const related = SITE.byCat(game.cat).filter((g) => g.id !== game.id).slice(0, 4);
    relatedEl.innerHTML = related.map(cardHTML).join('');
  }

  function renderPlaceholder() {
    gameEl.style.display = 'none';
    phEl.style.display = 'grid';
    stageEl.classList.remove('has-emu');
    phEl.innerHTML = '<div class="demo-note">' + I18N.t('play.notconnected') + '</div>';
    controlsEl.innerHTML =
      '<h3>' + I18N.t('play.help') + '</h3>' +
      '<p class="muted">' + I18N.t('play.notconnected.note') + '</p>';
  }

  function mountEmulatorJS(g) {
    gameEl.style.display = 'block';
    phEl.style.display = 'none';
    stageEl.classList.add('has-emu');

    // EmulatorJS 配置（必须在其 loader 脚本执行前设置）
    window.EJS_player = '#game';
    window.EJS_core = 'nes';
    window.EJS_gameUrl = new URL(encodeURI(g.rom), location.href).href;
    window.EJS_gameName = titleOf();
    window.EJS_pathtodata = 'vendor/emulatorjs/data/'; // 本地自托管：核心与脚本同源，不再依赖外网 CDN
    window.EJS_DEBUG_XX = true; // 直接加载本地 src/ 非压缩脚本（data 目录未含 min 版）
    window.EJS_startOnLoaded = true;
    window.EJS_color = '#ff2e88';
    window.EJS_language = (I18N.lang === 'en') ? 'en-US' : 'zh-CN';

    // FC 默认键位（龙哥指定）：方向 WASD / A=K / B=J / Start=I / Select=U
    // 注：EJS_defaultControls 整体替换默认映射，故需完整列出 gamepad0，未改的键保留原值
    window.EJS_defaultControls = {
      0: {
        0: { value: 'j', value2: 'BUTTON_2' },            // B 键 = J
        1: { value: 's', value2: 'BUTTON_4' },            // NES 无用，保留默认
        2: { value: 'u', value2: 'SELECT' },              // Select = U
        3: { value: 'i', value2: 'START' },               // Start = I
        4: { value: 'w', value2: 'DPAD_UP' },             // 上 = W
        5: { value: 's', value2: 'DPAD_DOWN' },            // 下 = S
        6: { value: 'a', value2: 'DPAD_LEFT' },            // 左 = A
        7: { value: 'd', value2: 'DPAD_RIGHT' },           // 右 = D
        8: { value: 'k', value2: 'BUTTON_1' },             // A 键 = K
        9: { value: 'a', value2: 'BUTTON_3' },             // NES 无用，保留默认
        10: { value: 'q', value2: 'LEFT_TOP_SHOULDER' },
        11: { value: 'e', value2: 'RIGHT_TOP_SHOULDER' },
        12: { value: 'tab', value2: 'LEFT_BOTTOM_SHOULDER' },
        13: { value: 'r', value2: 'RIGHT_BOTTOM_SHOULDER' },
        14: { value: '', value2: 'LEFT_STICK' },
        15: { value: '', value2: 'RIGHT_STICK' },
        16: { value: 'h', value2: 'LEFT_STICK_X:+1' },
        17: { value: 'f', value2: 'LEFT_STICK_X:-1' },
        18: { value: 'g', value2: 'LEFT_STICK_Y:+1' },
        19: { value: 't', value2: 'LEFT_STICK_Y:-1' },
        20: { value: 'l', value2: 'RIGHT_STICK_X:+1' },
        21: { value: '', value2: 'RIGHT_STICK_X:-1' },
        22: { value: '', value2: 'RIGHT_STICK_Y:+1' },
        23: { value: '', value2: 'RIGHT_STICK_Y:-1' },
        24: { value: '1' },
        25: { value: '2' },
        26: { value: '3' },
        27: {}, 28: {}, 29: {}
      },
      1: {}, 2: {}, 3: {}
    };

    // 连发键（turbo）：EmulatorJS 默认手柄映射无独立 turbo 按钮位，
    // 故在 DOM 层模拟按下——按住「,」连发 A(K)，按住「M」连发 B(J)
    (function setupTurbo() {
      const map = { ',': { kc: 75, code: 'KeyK' }, 'm': { kc: 74, code: 'KeyJ' } };
      const timers = {};
      const fire = (type, kc, code) => {
        const ev = new KeyboardEvent(type, { bubbles: true, cancelable: true, code, key: code.slice(3).toLowerCase() });
        Object.defineProperty(ev, 'keyCode', { get: () => kc });
        Object.defineProperty(ev, 'which', { get: () => kc });
        window.dispatchEvent(ev);
      };
      window.addEventListener('keydown', (e) => {
        const k = e.key ? e.key.toLowerCase() : e.key;
        if (map[k] && !timers[k]) {
          const cfg = map[k];
          let on = false;
          timers[k] = setInterval(() => {
            on = !on;
            fire(on ? 'keydown' : 'keyup', cfg.kc, cfg.code);
          }, 50);
          e.preventDefault();
        }
      });
      window.addEventListener('keyup', (e) => {
        const k = e.key ? e.key.toLowerCase() : e.key;
        if (map[k] && timers[k]) {
          clearInterval(timers[k]);
          delete timers[k];
          fire('keyup', map[k].kc, map[k].code);
        }
      });
    })();

    controlsEl.innerHTML =
      '<h3>' + I18N.t('play.help') + '</h3>' +
      '<p class="muted">' + I18N.t('play.using') + '</p>' +
      '<p class="muted">' + I18N.t('play.emuHint') + '</p>';

    // 强制使用本站默认键位：清掉 EmulatorJS 按游戏缓存的旧 controlSettings，
    // 否则 loadSettings() 会用 localStorage 里旧键位覆盖 EJS_defaultControls（绿色兵团等已玩过的游戏会残留旧键）。
    // 只清键位，保留其它 core 设置（视频/音频等）。
    try {
      const re = /^ejs-.*nes.*-settings$/;
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const k = localStorage.key(i);
        if (!k || !re.test(k)) continue;
        try {
          const obj = JSON.parse(localStorage.getItem(k));
          if (obj && obj.controlSettings) {
            delete obj.controlSettings;
            if (Object.keys(obj).length) localStorage.setItem(k, JSON.stringify(obj));
            else localStorage.removeItem(k);
          }
        } catch (e) {
          localStorage.removeItem(k);
        }
      }
    } catch (e) {}

    const s = document.createElement('script');
    s.src = window.EJS_pathtodata + 'loader.js';
    s.onerror = function () {
      phEl.style.display = 'grid';
      phEl.innerHTML = '<div class="demo-note">' + I18N.t('play.cdnFail') + '</div>';
    };
    document.body.appendChild(s);
  }

  function renderAll() {
    renderTitle();
    renderRelated();
    const isFC = game.cat === 'fc' && game.rom;
    if (isFC) mountEmulatorJS(game);
    else renderPlaceholder();
    I18N.apply();
  }

  renderAll();

  // 语言切换时只更新文字与推荐，不重载模拟器（避免中断游戏）
  window.__onLang = function () {
    renderTitle();
    renderRelated();
    if (!(game.cat === 'fc' && game.rom)) renderPlaceholder();
    I18N.apply();
  };
})();
