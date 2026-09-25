/* 站点数据：机种分类 + 游戏清单。封面采用原站真实图片地址，离线时自动兜底。 */
(function () {
  const CATEGORIES = [
    { id: 'fc', icon: '🕹️', color: '#ff2e88' },
    { id: 'md', icon: '🟦', color: '#1f6feb' },
    { id: 'sfc', icon: '🟥', color: '#e8453c' },
    { id: 'arcade', icon: '🎰', color: '#7c5cff' },
    { id: 'gba', icon: '🎮', color: '#2ee6a6' },
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
    { id: 7008, cat: 'fc', title: { cn: '89电脑九星占卜', en: "'89 Dennou Kyuusei Uranai" }, rom: 'roms/fc/89dennoukyuuseiuranaijapan.nes', cover: 'assets/covers/89dennou.png', tags: { cn: '益智', en: 'Puzzle' }, plays: 150000 },
    { id: 7009, cat: 'fc', title: { cn: '十码大战', en: '10-Yard Fight' }, rom: 'roms/fc/10yardfightusaeurope.nes', cover: 'assets/covers/10yard.png', tags: { cn: '体育', en: 'Sports' }, plays: 320000 },
    { id: 7010, cat: 'fc', title: { cn: '2010 街头霸王', en: '2010 Street Fighter (J)' }, rom: 'roms/fc/2010streetfighterjapan.nes', cover: 'assets/covers/sf2010.png', tags: { cn: '格斗', en: 'Fighting' }, plays: 540000 },
    { id: 7011, cat: 'fc', title: { cn: '3D 世界冒险', en: '3-D WorldRunner' }, rom: 'roms/fc/3dworldrunnerusa.nes', cover: 'assets/covers/worldrunner.png', tags: { cn: '竞速', en: 'Racing' }, plays: 410000 },
    { id: 7012, cat: 'fc', title: { cn: '八眼', en: '8 Eyes' }, rom: 'roms/fc/8eyesusa.nes', cover: 'assets/covers/8eyes.png', tags: { cn: '动作', en: 'Action' }, plays: 230000 },
    { id: 7013, cat: 'fc', title: { cn: '烟山坦克', en: '90 Tank (Battle City)' }, rom: 'roms/fc/90tank.nes', cover: 'assets/covers/90tank.png', tags: { cn: '射击', en: 'Shooter' }, plays: 860000 },
    { id: 7014, cat: 'fc', title: { cn: 'A列车', en: 'A Ressha de Ikou (J)' }, rom: 'roms/fc/aresshadeikoujapan.nes', cover: 'assets/covers/aressha.png', tags: { cn: '模拟', en: 'Sim' }, plays: 180000 },
    { id: 7015, cat: 'fc', title: { cn: '野球人生一直线', en: 'Yakyuu Jinsei Icchokusen (J)' }, rom: 'roms/fc/aayakyuujinseiicchokusenjapan.nes', cover: 'assets/covers/yakyuu.png', tags: { cn: '体育', en: 'Sports' }, plays: 260000 },
    { id: 7016, cat: 'fc', title: { cn: 'Abadox 致命内战', en: 'Abadox' }, rom: 'roms/fc/abadoxthedeadlyinnerwarusa.nes', cover: 'assets/covers/abadox.png', tags: { cn: '射击', en: 'Shooter' }, plays: 370000 },
    { id: 7017, cat: 'fc', title: { cn: '暴坊天狗', en: 'Abarenbou Tengu (J)' }, rom: 'roms/fc/abarenboutengujapan.nes', cover: 'assets/covers/tengu.png', tags: { cn: '动作', en: 'Action' }, plays: 210000 },
    { id: 7018, cat: 'fc', title: { cn: 'Abadox（日版）', en: 'Abadox (J)' }, rom: 'roms/fc/abberoadx.nes', cover: 'assets/covers/abadoxj.png', tags: { cn: '射击', en: 'Shooter' }, plays: 190000 },
    { id: 7019, cat: 'fc', title: { cn: '王牌：铁鹰3', en: 'ACES: Iron Eagle III (J)' }, rom: 'roms/fc/acesironeagle3japan.nes', cover: 'assets/covers/aces.png', tags: { cn: '射击', en: 'Shooter' }, plays: 290000 },
    // ---- FC / NES ----
    { id: 4137, cat: 'fc', title: { cn: '魂斗罗(美版)', en: 'Contra (US)' }, cover: 'https://img.1990i.com/fcpic/sj/436a.png', tags: { cn: '射击', en: 'Shooter' }, plays: 1280000 },
    { id: 3501, cat: 'fc', title: { cn: '超级马里奥', en: 'Super Mario' }, cover: 'https://img.1990i.com/fcpic/2146a.png', tags: { cn: '平台', en: 'Platformer' }, plays: 2110000 },
    { id: 3882, cat: 'fc', title: { cn: '激龟快打', en: 'Teenage Mutant Ninja Turtles' }, cover: 'https://img.1990i.com/fcpic/gd/2254a.png', tags: { cn: '格斗', en: 'Fighting' }, plays: 980000 },
    { id: 4511, cat: 'fc', title: { cn: '雪人兄弟', en: 'Snow Bros' }, cover: 'https://img.1990i.com/fcpic/xyx/2023a.png', tags: { cn: '动作', en: 'Action' }, plays: 760000 },
    { id: 4141, cat: 'fc', title: { cn: '魂斗罗力量', en: 'Contra Force' }, cover: 'https://img.1990i.com/fcpic/sj/437a.png', tags: { cn: '射击', en: 'Shooter' }, plays: 654000 },
    { id: 4275, cat: 'fc', title: { cn: '坦克大战', en: 'Battle City' }, cover: 'https://img.1990i.com/fcpic/xyx/timg.png', tags: { cn: '策略', en: 'Strategy' }, plays: 1430000 },
    { id: 3175, cat: 'fc', title: { cn: '冒险岛', en: 'Adventure Island' }, cover: 'https://img.1990i.com/fcpic/1001a.png', tags: { cn: '平台', en: 'Platformer' }, plays: 890000 },
    { id: 4174, cat: 'fc', title: { cn: '热血格斗', en: 'Nekketsu Fighting' }, cover: 'https://img.1990i.com/fcpic/ydbs/1544a.png', tags: { cn: '格斗', en: 'Fighting' }, plays: 720000 },

    // ---- MD / 世嘉 ----
    { id: 8101, cat: 'md', title: { cn: '索尼克', en: 'Sonic the Hedgehog' }, cover: '', tags: { cn: '平台', en: 'Platformer' }, plays: 1980000 },
    { id: 8102, cat: 'md', title: { cn: '怒之铁拳2', en: 'Streets of Rage 2' }, cover: '', tags: { cn: '清版', en: 'Beat-em-up' }, plays: 1320000 },
    { id: 8103, cat: 'md', title: { cn: '战斧', en: 'Golden Axe' }, cover: '', tags: { cn: '清版', en: 'Beat-em-up' }, plays: 1150000 },
    { id: 8104, cat: 'md', title: { cn: '超级忍', en: 'The Super Shinobi' }, cover: '', tags: { cn: '动作', en: 'Action' }, plays: 940000 },
    { id: 8105, cat: 'md', title: { cn: '火枪英雄', en: 'Gunstar Heroes' }, cover: '', tags: { cn: '射击', en: 'Shooter' }, plays: 880000 },
    { id: 8106, cat: 'md', title: { cn: '幽游白书-魔强统一战', en: 'Yu Yu Hakusho' }, cover: '', tags: { cn: '格斗', en: 'Fighting' }, plays: 1670000 },
    { id: 8107, cat: 'md', title: { cn: '光明力量', en: 'Shining Force' }, cover: '', tags: { cn: '策略', en: 'SRPG' }, plays: 760000 },
    { id: 8108, cat: 'md', title: { cn: '蚯蚓战士', en: 'Earthworm Jim' }, cover: '', tags: { cn: '平台', en: 'Platformer' }, plays: 690000 },

    // ---- SFC / 超任 ----
    { id: 8201, cat: 'sfc', title: { cn: '超级马里奥世界', en: 'Super Mario World' }, cover: '', tags: { cn: '平台', en: 'Platformer' }, plays: 2310000 },
    { id: 8202, cat: 'sfc', title: { cn: '塞尔达传说-众神的三角力量', en: 'Zelda: A Link to the Past' }, cover: '', tags: { cn: '冒险', en: 'Adventure' }, plays: 1890000 },
    { id: 8203, cat: 'sfc', title: { cn: '最终幻想6', en: 'Final Fantasy VI' }, cover: '', tags: { cn: 'RPG', en: 'RPG' }, plays: 1540000 },
    { id: 8204, cat: 'sfc', title: { cn: '超级银河战士', en: 'Super Metroid' }, cover: '', tags: { cn: '探索', en: 'Metroidvania' }, plays: 1410000 },
    { id: 8205, cat: 'sfc', title: { cn: '超级街头霸王2', en: 'Super Street Fighter II' }, cover: '', tags: { cn: '格斗', en: 'Fighting' }, plays: 1760000 },
    { id: 8206, cat: 'sfc', title: { cn: '火焰纹章-纹章之谜', en: 'Fire Emblem: Mystery' }, cover: '', tags: { cn: '策略', en: 'SRPG' }, plays: 980000 },
    { id: 8207, cat: 'sfc', title: { cn: '星之卡比-超明星', en: 'Kirby Super Star' }, cover: '', tags: { cn: '动作', en: 'Action' }, plays: 1120000 },
    { id: 8208, cat: 'sfc', title: { cn: '牧场物语', en: 'Harvest Moon' }, cover: '', tags: { cn: '模拟', en: 'Sim' }, plays: 870000 },

    // ---- Arcade / 街机 ----
    { id: 5341, cat: 'arcade', title: { cn: '三国志', en: 'Warriors of Fate' }, cover: 'https://img.1990i.com/arcadepic/wof.png', tags: { cn: '清版', en: 'Beat-em-up' }, plays: 980000 },
    { id: 5333, cat: 'arcade', title: { cn: '名将', en: 'Captain Commando' }, cover: 'https://img.1990i.com/arcadepic/captcommu.png', tags: { cn: '清版', en: 'Beat-em-up' }, plays: 760000 },
    { id: 5334, cat: 'arcade', title: { cn: '恐龙快打', en: 'Cadillacs and Dinosaurs' }, cover: 'https://img.1990i.com/arcadepic/dino.png', tags: { cn: '清版', en: 'Beat-em-up' }, plays: 1240000 },
    { id: 5719, cat: 'arcade', title: { cn: '西游释厄传', en: 'Oriental Legend' }, cover: 'https://img.1990i.com/arcadepic/orlegend.png', tags: { cn: '清版', en: 'Beat-em-up' }, plays: 680000 },
    { id: 5337, cat: 'arcade', title: { cn: '街头霸王', en: 'Street Fighter II' }, cover: 'https://img.1990i.com/arcadepic/sf2hfj.png', tags: { cn: '格斗', en: 'Fighting' }, plays: 1670000 },
    { id: 5301, cat: 'arcade', title: { cn: '三国战纪', en: 'Knights of Valour' }, cover: 'https://img.1990i.com/arcadepic/kovsh103.png', tags: { cn: '清版', en: 'Beat-em-up' }, plays: 1120000 },
    { id: 5302, cat: 'arcade', title: { cn: '合金弹头', en: 'Metal Slug' }, cover: 'https://img.1990i.com/arcadepic/Mslug1.png', tags: { cn: '射击', en: 'Shooter' }, plays: 1530000 },
    { id: 5303, cat: 'arcade', title: { cn: '拳皇', en: 'The King of Fighters' }, cover: 'https://img.1990i.com/arcadepic/kof97.png', tags: { cn: '格斗', en: 'Fighting' }, plays: 1890000 },

    // ---- GBA ----
    { id: 6101, cat: 'gba', title: { cn: '口袋妖怪', en: 'Pokemon' }, cover: 'https://img.1990i.com/gbapic/kdyg.png', tags: { cn: '收集', en: 'RPG' }, plays: 1740000 },
    { id: 6102, cat: 'gba', title: { cn: '恶魔城', en: 'Castlevania' }, cover: 'https://img.1990i.com/gbapic/emc.jpg', tags: { cn: '动作', en: 'Action' }, plays: 690000 },
    { id: 6103, cat: 'gba', title: { cn: '牧场物语', en: 'Harvest Moon' }, cover: 'https://img.1990i.com/gbapic/mcwy.jpg', tags: { cn: '模拟', en: 'Sim' }, plays: 540000 },
    { id: 6104, cat: 'gba', title: { cn: '召唤之夜-铸剑物语', en: 'Summon Night' }, cover: 'https://img.1990i.com/gbapic/zhzy.jpg', tags: { cn: 'RPG', en: 'RPG' }, plays: 470000 },
    { id: 6105, cat: 'gba', title: { cn: '塞尔达传说-缩小帽', en: 'Zelda: Minish Cap' }, cover: 'https://img.1990i.com/gbapic/serdcc.jpg', tags: { cn: '冒险', en: 'Adventure' }, plays: 1120000 },
    { id: 6106, cat: 'gba', title: { cn: '火焰纹章', en: 'Fire Emblem' }, cover: 'https://img.1990i.com/gbapic/hywz.jpg', tags: { cn: '策略', en: 'SRPG' }, plays: 830000 },
    { id: 6107, cat: 'gba', title: { cn: '超级马里奥', en: 'Super Mario Advance' }, cover: 'https://img.1990i.com/gbapic/cjmla.jpg', tags: { cn: '平台', en: 'Platformer' }, plays: 1310000 },
    { id: 6108, cat: 'gba', title: { cn: '超级机器人大战', en: 'Super Robot Wars' }, cover: 'https://img.1990i.com/gbapic/cjjqrdz.jpg', tags: { cn: '策略', en: 'SRPG' }, plays: 720000 },
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
