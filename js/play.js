/* 游戏页逻辑：FC 游戏经 EmulatorJS（fceumm WASM 核心）、
   MD 游戏经 EmulatorJS（genesis_plus_gx WASM 核心）真机运行；
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

    // 治本修复「截图黑屏」：emscripten 创建 WebGL 上下文默认 preserveDrawingBuffer=false，
    // 帧渲染完被合成后缓冲即清空 → EJS 截图（canvas 源 drawImage）读到全黑。
    // 在 loader 运行前劫持 getContext，强制 WebGL 上下文保留绘制缓冲，任何时刻读帧都有效。
    if (!HTMLCanvasElement.prototype.__pjPatched) {
      const origGetContext = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (type, attrs) {
        if (type === 'webgl' || type === 'webgl2') {
          attrs = Object.assign({}, attrs || {}, { preserveDrawingBuffer: true });
        }
        return origGetContext.call(this, type, attrs);
      };
      HTMLCanvasElement.prototype.__pjPatched = true;
    }

    // EmulatorJS 配置（必须在其 loader 脚本执行前设置）
    window.EJS_player = '#game';
    // 按机种选择核心：FC -> nes(fceumm) / MD -> segaMD(genesis_plus_gx)
    window.EJS_core = (g.cat === 'md') ? 'segaMD' : 'nes';
    window.EJS_gameUrl = new URL(encodeURI(g.rom), location.href).href;
    window.EJS_gameName = titleOf();
    window.EJS_pathtodata = 'vendor/emulatorjs/data/'; // 本地自托管：核心与脚本同源，不再依赖外网 CDN
    window.EJS_DEBUG_XX = true; // 直接加载本地 src/ 非压缩脚本（data 目录未含 min 版）
    window.EJS_startOnLoaded = true;
    window.EJS_color = '#ff2e88';
    window.EJS_language = (I18N.lang === 'en') ? 'en-US' : 'zh-CN';

    // 默认键位（龙哥指定）：FC 与 MD 各自独立定义，互不干扰
    // FC：2 键（A 在右、B 在左）→ A=K / B=J
    // MD：3 键（A/B/C 横排）→ A=J / B=K / C=L（J/K/L 对应手柄 A/B/C 三连键）
    // 注：EJS_defaultControls 整体替换默认映射，故需完整列出 gamepad0；未用的键位填空
    window.EJS_defaultControls = (function () {
      const FC = {
        0: { value: 'j', value2: 'BUTTON_2' },            // B 键 = J
        1: { value: 's', value2: 'BUTTON_4' },            // NES 无用，保留默认
        2: { value: 'u', value2: 'SELECT' },              // Select = U
        3: { value: 'i', value2: 'START' },               // Start = I
        4: { value: 'w', value2: 'DPAD_UP' },             // 上 = W
        5: { value: 's', value2: 'DPAD_DOWN' },           // 下 = S
        6: { value: 'a', value2: 'DPAD_LEFT' },           // 左 = A
        7: { value: 'd', value2: 'DPAD_RIGHT' },          // 右 = D
        8: { value: 'k', value2: 'BUTTON_1' },             // A 键 = K
        9: { value: '', value2: 'BUTTON_3' },             // FC 无 C 键
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
      };
      const MD = {
        0: { value: 'k', value2: 'BUTTON_2' },            // B 键 = K
        1: { value: 's', value2: 'BUTTON_4' },
        2: { value: 'u', value2: 'SELECT' },              // Select = U
        3: { value: 'i', value2: 'START' },               // Start = I
        4: { value: 'w', value2: 'DPAD_UP' },             // 上 = W
        5: { value: 's', value2: 'DPAD_DOWN' },           // 下 = S
        6: { value: 'a', value2: 'DPAD_LEFT' },           // 左 = A
        7: { value: 'd', value2: 'DPAD_RIGHT' },          // 右 = D
        8: { value: 'j', value2: 'BUTTON_1' },             // A 键 = J
        9: { value: 'l', value2: 'BUTTON_3' },             // C 键 = L
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
      };
      const base = (g.cat === 'md') ? MD : FC;
      return { 0: base, 1: {}, 2: {}, 3: {} };
    })();

    // 连发键（turbo）：直接调 EmulatorJS 内部 gameManager.simulateInput(player, btnIdx, state)，
    // 绕过合成 KeyboardEvent——EJS 按键匹配依赖 e.keyCode（emulator.js:3344），合成事件的 keyCode
    // 在部分浏览器/焦点状态下不可靠；直接调内部 API 最稳，且不受 keyboardInput 设置影响。
    // btnIdx 与 EJS_defaultControls 对齐：A=BUTTON_1=8, B=BUTTON_2=0, C=BUTTON_3=9
    (function setupTurbo() {
      const FC_TURBO = { ',': 8, 'm': 0 };            // 连发 A / 连发 B
      const MD_TURBO = { ',': 8, 'm': 0, '.': 9 };    // 连发 A / 连发 B / 连发 C
      const map = (g.cat === 'md') ? MD_TURBO : FC_TURBO;
      const timers = {};
      const press = (idx, on) => {
        const e = window.EJS_emulator;
        if (e && e.gameManager && typeof e.gameManager.simulateInput === 'function') {
          e.gameManager.simulateInput(0, idx, on ? 1 : 0);
        }
      };
      window.addEventListener('keydown', (e) => {
        const k = (e.key != null) ? e.key.toLowerCase() : e.key;
        if (map[k] !== undefined && !timers[k]) {
          timers[k] = setInterval(() => {
            press(map[k], true);
            setTimeout(() => press(map[k], false), 25);
          }, 50);
          e.preventDefault();
        }
      });
      window.addEventListener('keyup', (e) => {
        const k = (e.key != null) ? e.key.toLowerCase() : e.key;
        if (map[k] !== undefined && timers[k]) {
          clearInterval(timers[k]);
          delete timers[k];
          press(map[k], false);
        }
      });
    })();

    // 操作说明按机种分别取文案（FC / MD 独立），内核名也随机种显示
    const hint = (g.cat === 'md') ? I18N.t('play.emuHintMd') : I18N.t('play.emuHint');
    const using = (g.cat === 'md') ? I18N.t('play.usingMd') : I18N.t('play.using');
    controlsEl.innerHTML =
      '<h3>' + I18N.t('play.help') + '</h3>' +
      '<p class="muted">' + using + '</p>' +
      '<p class="muted">' + hint + '</p>';

    // 强制使用本站默认键位：清掉 EmulatorJS 按游戏缓存的旧 controlSettings，
    // 否则 loadSettings() 会用 localStorage 里旧键位覆盖 EJS_defaultControls（绿色兵团等已玩过的游戏会残留旧键）。
    // 只清键位，保留其它 core 设置（视频/音频等）。
    try {
      const re = /^ejs-\d+-.*-settings$/;
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

    // 一键截图（出封面用）：play.html?id=XXX&autoshot 或 &autoshot=8000（毫秒，等标题画面出现）
    // 游戏启动后自动调用已修复的截图 API（retroarch 源，抓核心帧缓冲，不黑屏）并下载 PNG
    (function setupAutoShot(g) {
      const raw = params.get('autoshot');
      if (raw === null) return;
      const wait = Math.max(1500, parseInt(raw, 10) || 4000);
      window.EJS_onGameStart = function () {
        setTimeout(function () {
          const e = window.EJS_emulator;
          if (!e || typeof e.screenshot !== 'function') return;
          e.screenshot(function (blob, fmt) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            const safe = (titleOf() || 'cover').replace(/[\\/:*?"<>|]/g, '_');
            a.href = url;
            a.download = 'cover_' + g.id + '_' + safe + '.' + (fmt || 'png');
            document.body.appendChild(a);
            a.click();
            a.remove();
            setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
          }, 'canvas', 'png');
        }, wait);
      };
    })(g);

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
    const canEmu = (game.cat === 'fc' || game.cat === 'md') && game.rom;
    if (canEmu) mountEmulatorJS(game);
    else renderPlaceholder();
    I18N.apply();
  }

  renderAll();

  // 语言切换时只更新文字与推荐，不重载模拟器（避免中断游戏）
  window.__onLang = function () {
    renderTitle();
    renderRelated();
    if (!((game.cat === 'fc' || game.cat === 'md') && game.rom)) renderPlaceholder();
    I18N.apply();
  };
})();
