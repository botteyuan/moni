/* 站点数据：机种分类 + 游戏清单。封面采用原站真实图片地址，离线时自动兜底。 */
(function () {
  const CATEGORIES = [
    { id: 'fc', icon: '🕹️', color: '#ff2e88' },
    { id: 'md', icon: '🟦', color: '#1f6feb' },
  ];

  const GAMES = [
    // ---- FC / NES（本地可运行 ROM） ----
    { id: 7001, cat: 'fc', title: { cn: '魂斗罗1代（日版）', en: 'Contra (JP)' }, rom: 'roms/fc/魂斗罗1代日版.nes', cover: 'assets/covers/contra.png', tags: { cn: '射击', en: 'Shooter' }, plays: 1300000 },
    { id: 7002, cat: 'fc', title: { cn: '忍者龙剑传3', en: 'Ninja Gaiden 3' }, rom: 'roms/fc/忍者龙剑传3.nes', cover: 'assets/covers/ng3.png', tags: { cn: '动作', en: 'Action' }, plays: 640000 },
    { id: 7003, cat: 'fc', title: { cn: '绿色兵团（汉化）', en: 'Green Beret (CH)' }, rom: 'roms/fc/绿色兵团—汉化版.nes', cover: 'assets/covers/greenberet.png', tags: { cn: '射击', en: 'Shooter' }, plays: 520000 },
    { id: 7004, cat: 'fc', title: { cn: '双截龙2（汉化）', en: 'Double Dragon II (CH)' }, rom: 'roms/fc/双截龙2小字汉化.NES', cover: 'assets/covers/dd2.png', tags: { cn: '格斗', en: 'Beat-em-up' }, plays: 710000 },
    { id: 7005, cat: 'fc', title: { cn: '空中魂斗罗美版', en: 'S.C.A.T. (US)' }, rom: 'roms/fc/空中魂斗罗美版.nes', cover: 'assets/covers/scat.png', tags: { cn: '射击', en: 'Shooter' }, plays: 460000 },
    { id: 7006, cat: 'fc', title: { cn: '1942', en: '1942 (JP/US)' }, rom: 'roms/fc/1942.nes', cover: 'assets/covers/1942.png', tags: { cn: '射击', en: 'Shooter' }, plays: 980000 },
    { id: 7007, cat: 'fc', title: { cn: '1943 中途岛海战', en: '1943: The Battle of Midway' }, rom: 'roms/fc/1943.nes', cover: 'assets/covers/1943.png', tags: { cn: '射击', en: 'Shooter' }, plays: 920000 },
    { id: 7010, cat: 'fc', title: { cn: '2010 街头霸王', en: '2010 Street Fighter (J)' }, rom: 'roms/fc/2010streetfighterjapan.nes', cover: 'assets/covers/sf2010.png', tags: { cn: '格斗', en: 'Fighting' }, plays: 540000 },
    { id: 7013, cat: 'fc', title: { cn: '烟山坦克', en: '90 Tank (Battle City)' }, rom: 'roms/fc/90tank.nes', cover: 'assets/covers/90tank.png', tags: { cn: '射击', en: 'Shooter' }, plays: 860000 },
    { id: 7016, cat: 'fc', title: { cn: 'Abadox 致命内战', en: 'Abadox' }, rom: 'roms/fc/abadoxthedeadlyinnerwarusa.nes', cover: 'assets/covers/abadox.png', tags: { cn: '射击', en: 'Shooter' }, plays: 370000 },
    { id: 7017, cat: 'fc', title: { cn: '龙战士', en: 'Dragon Fighter' }, rom: 'roms/fc/Dragon Fighter (J).nes', cover: 'assets/covers/dragonfighter.png', tags: { cn: '动作', en: 'Action' }, plays: 300000 },
    { id: 7018, cat: 'fc', title: { cn: '七宝奇谋', en: 'The Goonies' }, rom: 'roms/fc/七宝奇谋—汉化版.nes', cover: 'assets/covers/goonies.png', tags: { cn: '动作', en: 'Action' }, plays: 337000 },
    { id: 7019, cat: 'fc', title: { cn: '兵锋2', en: 'Bing Feng 2' }, rom: 'roms/fc/兵锋2.nes', cover: 'assets/covers/bingfeng2.png', tags: { cn: '射击', en: 'Shooter' }, plays: 374000 },
    { id: 7020, cat: 'fc', title: { cn: '兵锋3', en: 'Bing Feng 3' }, rom: 'roms/fc/兵锋3.nes', cover: 'assets/covers/bingfeng3.png', tags: { cn: '射击', en: 'Shooter' }, plays: 411000 },
    { id: 7021, cat: 'fc', title: { cn: '冒险岛', en: 'Adventure Island' }, rom: 'roms/fc/冒险岛1代.nes', cover: 'assets/covers/adventureisland1.png', tags: { cn: '平台', en: 'Platformer' }, plays: 448000 },
    { id: 7022, cat: 'fc', title: { cn: '冒险岛2', en: 'Adventure Island 2' }, rom: 'roms/fc/冒险岛2.nes', cover: 'assets/covers/adventureisland2.png', tags: { cn: '平台', en: 'Platformer' }, plays: 485000 },
    { id: 7023, cat: 'fc', title: { cn: '冒险岛3', en: 'Adventure Island 3' }, rom: 'roms/fc/冒险岛3.nes', cover: 'assets/covers/adventureisland3.png', tags: { cn: '平台', en: 'Platformer' }, plays: 522000 },
    { id: 7024, cat: 'fc', title: { cn: '冒险岛3（汉化）', en: 'Adventure Island 3 (CH)' }, rom: 'roms/fc/冒险岛3—汉化版.nes', cover: 'assets/covers/adventureisland3ch.png', tags: { cn: '平台', en: 'Platformer' }, plays: 559000 },
    { id: 7025, cat: 'fc', title: { cn: '冒险岛4', en: 'Adventure Island 4' }, rom: 'roms/fc/冒险岛4.nes', cover: 'assets/covers/adventureisland4.png', tags: { cn: '平台', en: 'Platformer' }, plays: 596000 },
    { id: 7026, cat: 'fc', title: { cn: '少年街霸2', en: 'Street Fighter II' }, rom: 'roms/fc/少年街霸2.nes', cover: 'assets/covers/sfight2.png', tags: { cn: '格斗', en: 'Fighting' }, plays: 633000 },
    { id: 7028, cat: 'fc', title: { cn: '影子传说', en: 'Kage' }, rom: 'roms/fc/影子传说无敌版.nes', cover: 'assets/covers/kage.png', tags: { cn: '动作', en: 'Action' }, plays: 707000 },
    { id: 7029, cat: 'fc', title: { cn: '恶魔城', en: 'Castlevania' }, rom: 'roms/fc/恶魔城.nes', cover: 'assets/covers/castlevania.png', tags: { cn: '动作', en: 'Action' }, plays: 744000 },
    { id: 7031, cat: 'fc', title: { cn: '松鼠大战', en: "Chip 'n Dale" }, rom: 'roms/fc/松鼠大战1.nes', cover: 'assets/covers/chipndale1.png', tags: { cn: '平台', en: 'Platformer' }, plays: 818000 },
    { id: 7032, cat: 'fc', title: { cn: '松鼠大战2', en: "Chip 'n Dale 2" }, rom: 'roms/fc/松鼠大战2.nes', cover: 'assets/covers/chipndale2.png', tags: { cn: '平台', en: 'Platformer' }, plays: 855000 },
    { id: 7033, cat: 'fc', title: { cn: '水上魂斗罗', en: 'S.C.A.T. (US)' }, rom: 'roms/fc/水上魂斗罗美版.nes', cover: 'assets/covers/watercontra.png', tags: { cn: '射击', en: 'Shooter' }, plays: 892000 },
    { id: 7034, cat: 'fc', title: { cn: '洛克人X', en: 'Mega Man X' }, rom: 'roms/fc/洛克人X.nes', cover: 'assets/covers/megamanx.png', tags: { cn: '动作', en: 'Action' }, plays: 929000 },
    { id: 7035, cat: 'fc', title: { cn: '脱狱', en: 'Bad Dudes' }, rom: 'roms/fc/脱狱.nes', cover: 'assets/covers/tuoyu.png', tags: { cn: '动作', en: 'Action' }, plays: 966000 },
    { id: 7036, cat: 'fc', title: { cn: '脱狱2', en: 'Bad Dudes 2' }, rom: 'roms/fc/脱狱2.nes', cover: 'assets/covers/tuoyu2.png', tags: { cn: '动作', en: 'Action' }, plays: 1003000 },
    { id: 7037, cat: 'fc', title: { cn: '赤影战士', en: 'Shadow of the Ninja' }, rom: 'roms/fc/赤影战士—汉化版.nes', cover: 'assets/covers/chiying.png', tags: { cn: '动作', en: 'Action' }, plays: 1040000 },
    { id: 7038, cat: 'fc', title: { cn: '魂斗罗2（美版）', en: 'Super C' }, rom: 'roms/fc/魂斗罗2代美版.nes', cover: 'assets/covers/contra2.png', tags: { cn: '射击', en: 'Shooter' }, plays: 1077000 },
    { id: 7039, cat: 'fc', title: { cn: '龙魂', en: 'Dragon Spirit' }, rom: 'roms/fc/龙魂.nes', cover: 'assets/covers/longhun.png', tags: { cn: '射击', en: 'Shooter' }, plays: 1114000 },
    { id: 7040, cat: 'fc', title: { cn: '危机部队', en: 'Crisis Force (J)' }, rom: 'roms/fc/Crisis Force (J).nes', cover: 'assets/covers/fc_crisisforce.png', tags: { cn: '射击', en: 'Shooter' }, plays: 390000 },
    { id: 7041, cat: 'fc', title: { cn: '烈夏·Recca', en: "Summer Carnival '92 - Recca" }, rom: "roms/fc/Summer Carnival '92 - Recca (J).nes", cover: 'assets/covers/fc_recca.png', tags: { cn: '射击', en: 'Shooter' }, plays: 405000 },
    { id: 7042, cat: 'fc', title: { cn: '空中鲨鱼', en: 'Sky Shark' }, rom: 'roms/fc/7af316a3.nes', cover: 'assets/covers/fc_skyshark.png', tags: { cn: '射击', en: 'Shooter' }, plays: 415000 },

    // ---- MD / 世嘉 ----
    { id: 8109, cat: 'md', title: { cn: '爱登斯家族', en: 'The Addams Family' }, rom: 'roms/md/adamsfamily.bin', cover: 'assets/covers/md_adamsfamily.png', tags: { cn: '平台', en: 'Platformer' }, plays: 420000 },
    { id: 8110, cat: 'md', title: { cn: '怪物世界4', en: 'Monster World IV' }, rom: 'roms/md/adventureworld4.bin', cover: 'assets/covers/md_monsterworld4.png', tags: { cn: '平台', en: 'Platformer' }, plays: 510000 },
    { id: 8111, cat: 'md', title: { cn: '魂斗罗·铁血兵团', en: 'Contra: Hard Corps' }, rom: 'roms/md/contraironcorps.smd', cover: 'assets/covers/md_contra.svg', tags: { cn: '射击', en: 'Shooter' }, plays: 760000 },
    { id: 8112, cat: 'md', title: { cn: '蜡笔小新', en: 'Crayon Shin-chan' }, rom: 'roms/md/crayonshinchan.bin', cover: 'assets/covers/md_shinchan.png', tags: { cn: '动作', en: 'Action' }, plays: 380000 },
    { id: 8113, cat: 'md', title: { cn: '米奇狂热', en: 'Mickey Mania' }, rom: 'roms/md/crazymickey.bin', cover: 'assets/covers/md_mickey.png', tags: { cn: '平台', en: 'Platformer' }, plays: 470000 },

    { id: 8114, cat: 'md', title: { cn: '双截龙', en: 'Double Dragon' }, rom: 'roms/md/双截龙.bin', cover: 'assets/covers/md_double_dragon.png', tags: { cn: '格斗', en: 'Brawler' }, plays: 640000 },  // 占位封面，待截图替换
    { id: 8115, cat: 'md', title: { cn: '双截龙2', en: 'Double Dragon II' }, rom: 'roms/md/双截龙2.bin', cover: 'assets/covers/md_double_dragon2.png', tags: { cn: '格斗', en: 'Brawler' }, plays: 610000 },  // 占位封面，待截图替换
    { id: 8116, cat: 'md', title: { cn: '双截龙5·失落之影', en: 'Double Dragon V: The Shadow Falls' }, rom: 'roms/md/双截龙5-失落之影.bin', cover: 'assets/covers/md_double_dragon5.png', tags: { cn: '格斗', en: 'Brawler' }, plays: 430000 },  // 占位封面，待截图替换
    { id: 8117, cat: 'md', title: { cn: '坦克大战', en: 'Battle Tank' }, rom: 'roms/md/坦克大战.bin', cover: 'assets/covers/md_battle_tank.png', tags: { cn: '射击', en: 'Shooter' }, plays: 320000 },  // 占位封面，待截图替换
    { id: 8118, cat: 'md', title: { cn: '天使之翼', en: 'Tecmo Cup Football Game' }, rom: 'roms/md/天使之翼.bin', cover: 'assets/covers/md_tianshi_zhiyi.png', tags: { cn: '体育', en: 'Sports' }, plays: 350000 },  // 占位封面，待截图替换
    { id: 8119, cat: 'md', title: { cn: '幽游白书·魔强统一战', en: 'Yu Yu Hakusho: Makyō Tōitsusen' }, rom: 'roms/md/幽游白书-魔强统一战.bin', cover: 'assets/covers/md_yuyu_makyu.png', tags: { cn: '格斗', en: 'Fighting' }, plays: 880000 },  // 占位封面，待截图替换
    { id: 8120, cat: 'md', title: { cn: '幽游白书外传', en: 'Yu Yu Hakusho Gaiden' }, rom: 'roms/md/幽游白书外传.bin', cover: 'assets/covers/md_yuyu_gaiden.png', tags: { cn: '动作', en: 'Action' }, plays: 460000 },  // 占位封面，待截图替换
    { id: 8121, cat: 'md', title: { cn: '忍者神龟', en: 'TMNT: The Hyperstone Heist' }, rom: 'roms/md/忍者神龟.bin', cover: 'assets/covers/md_tmnt.png', tags: { cn: '动作', en: 'Action' }, plays: 700000 },  // 占位封面，待截图替换
    { id: 8122, cat: 'md', title: { cn: '怒之铁拳3', en: 'Streets of Rage 3' }, rom: 'roms/md/怒之铁拳3.bin', cover: 'assets/covers/md_streets_of_rage3.png', tags: { cn: '格斗', en: 'Brawler' }, plays: 950000 },  // 占位封面，待截图替换



  ];

  window.SITE = {
    CATEGORIES,
    GAMES,
    catLabel(id) { return I18N.t('cat.' + id); },
    getGame(id) { return GAMES.find((g) => String(g.id) === String(id)); },
    byCat(cat) { return GAMES.filter((g) => g.cat === cat); },
    search(q) {
      q = (q || '').trim().toLowerCase();
      if (!q) return GAMES.slice();
      return GAMES.filter((g) =>
        g.title.cn.toLowerCase().includes(q) ||
        g.title.en.toLowerCase().includes(q) ||
        (g.tags && (g.tags.cn.toLowerCase().includes(q) || g.tags.en.toLowerCase().includes(q))) ||
        I18N.t('cat.' + g.cat).toLowerCase().includes(q)
      );
    },
  };
})();
