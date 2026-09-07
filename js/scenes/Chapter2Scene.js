const C2_FRAME_W = 44;
const C2_FRAME_H = 78;

// NOTE: INTERACT_RADIUS and JOURNAL_CHAPTERS are declared once in
// Chapter1Scene.js (loaded before this file in index.html) and reused here
// as-is - see that file for the shared journal table of contents.

// --- Chapter 2 map layout ---------------------------------------------
// "Old Town" map for the "Build the Town" mini-game. A grass field is cut
// by a camino real - a two-tile-wide north-south road crossed by an
// east-west street - with a sandy town-center plaza around the crossing.
// Five empty plots (see CHAPTER2_PLOT_DATA below) sit around the map,
// waiting for the player to work out what belongs where.
// Same 48x32 / 32px-tile convention as Chapter1Scene (see mapLoader.js).
//   0 = grass (walkable)   3 = road (walkable)   4 = plaza sand (walkable)   5 = wall (blocked)
const CHAPTER2_COLS = 48;
const CHAPTER2_ROWS = 32;
const CHAPTER2_ROAD_COLS = [23, 24];
const CHAPTER2_ROAD_ROWS = [15, 16];

function buildChapter2Map() {
  const grid = [];
  for (let r = 0; r < CHAPTER2_ROWS; r++) {
    const row = [];
    for (let c = 0; c < CHAPTER2_COLS; c++) {
      const isBorder = r === 0 || r === CHAPTER2_ROWS - 1 || c === 0 || c === CHAPTER2_COLS - 1;
      row.push(isBorder ? '5' : '0');
    }
    grid.push(row);
  }

  // the camino real - every build clue in this chapter is stated relative
  // to this road, so it needs to actually run through the whole map.
  for (let r = 1; r < CHAPTER2_ROWS - 1; r++) {
    CHAPTER2_ROAD_COLS.forEach(c => { grid[r][c] = '3'; });
  }
  for (let c = 1; c < CHAPTER2_COLS - 1; c++) {
    CHAPTER2_ROAD_ROWS.forEach(r => { grid[r][c] = '3'; });
  }

  // sandy plaza patch around the crossing - "the center of the community"
  // the municipal building and community area plots sit inside.
  for (let r = 11; r <= 20; r++) {
    for (let c = 16; c <= 31; c++) {
      if (grid[r][c] === '0') grid[r][c] = '4';
    }
  }

  return grid.map(row => row.join(''));
}

const CHAPTER2_MAP = buildChapter2Map();
const CHAPTER2_TILE_SIZE = 32; // must match TILE_SIZE in mapLoader.js

// --- the 5 buildable plots -------------------------------------------------
// This is the static template only (positions/colors/clues/info) - create()
// makes a fresh `this.plots` copy of it every time the scene starts, so
// `built` state never leaks between playthroughs. Each plot has exactly one
// correct building type; the player chooses from whichever types haven't
// been placed yet (see showBuildMenu), so later plots get easier to guess
// by elimination - no fail state, just a nudge to think again.
// Real art for the empty-plot state and each of the 5 building types once
// built (see preload()/create() below). Sizes keep each icon's native
// aspect ratio, scaled down from their source canvas to roughly the
// footprint the old placeholder box used.
const CHAPTER2_EMPTY_ICON = { key: 'plot_empty', w: 96, h: 110 };
const CHAPTER2_BUILT_ICONS = {
  market: { key: 'plot_market', w: 152, h: 160 },
  municipal: { key: 'plot_municipal', w: 148, h: 160 },
  community: { key: 'plot_community', w: 156, h: 160 },
  houses: { key: 'plot_houses', w: 150, h: 160 },
  road: { key: 'plot_road', w: 150, h: 160 }
};

const CHAPTER2_PLOT_DATA = [
  {
    id: 'market', name: 'Market', color: 0xc24a38,
    col: 26, row: 8,
    clue: 'This spot sits right along the road leading into town.',
    info: 'The market was placed close to the road, so goods could easily be brought in and traded.'
  },
  {
    id: 'municipal', name: 'Municipal Building', color: 0x9c3b2e,
    col: 20, row: 13,
    clue: 'This spot sits near the very center of the community.',
    info: 'The municipal building stood near the center of town, in 1700, once Pateros was declared a municipality.'
  },
  {
    id: 'community', name: 'Community Area', color: 0x3c7a3e,
    col: 27, row: 18,
    clue: 'This open spot near the center is where neighbors gather.',
    info: 'A shared community area gave residents a place to gather for events, worship, and everyday life.'
  },
  {
    id: 'houses', name: 'Houses', color: 0x8a5a3a,
    col: 8, row: 25,
    clue: 'This quiet spot sits away from the busy center.',
    info: 'Houses spread outward from the center, letting the growing community stretch beyond the plaza.'
  },
  {
    id: 'road', name: 'Road', color: 0x6b4f30,
    col: 26, row: 27,
    clue: 'This spot needs a path connecting it to the rest of town.',
    info: 'As the town grew, roads were extended outward to connect new areas back to the center.'
  }
];

class Chapter2Scene extends Phaser.Scene {
  constructor() {
    super('Chapter2');
  }

  preload() {
    // Empty-plot icon (shown on all 5 plots before they're built) plus one
    // icon per building type (swapped in once that plot is built - see
    // buildPlot() below).
    this.load.image(CHAPTER2_EMPTY_ICON.key, 'assets/icons/ch2-empty-plot.png');
    this.load.image(CHAPTER2_BUILT_ICONS.market.key, 'assets/icons/ch2-market.png');
    this.load.image(CHAPTER2_BUILT_ICONS.municipal.key, 'assets/icons/ch2-municipal-building.png');
    this.load.image(CHAPTER2_BUILT_ICONS.community.key, 'assets/icons/ch2-community-area.png');
    this.load.image(CHAPTER2_BUILT_ICONS.houses.key, 'assets/icons/ch2-house.png');
    this.load.image(CHAPTER2_BUILT_ICONS.road.key, 'assets/icons/ch2-road.png');
  }

  create() {
    SoundManager.playMusic(this, 'bg-game');
    const { width, height } = this.scale;
    const character = this.registry.get('selectedCharacter') || 'hiraya';
    const textureKey = character + '-sheet';
    this.prefix = character;
    this.speed = this.registry.get('playerSpeed') || 160;
    this.locked = false; // true during dialogue / popup / build menu / quiz - movement disabled
    this.mode = 'intro'; // intro -> explore -> quiz -> done

    // --- Old Town map (48x32 tiles - see CHAPTER2_MAP up top to edit) ---
    this.map = loadMap(this, CHAPTER2_MAP);

// --- player ---
     this.createPlayerAnims(textureKey);
     this.player = this.physics.add.sprite(720, 752, textureKey, 0);
     this.player.setCollideWorldBounds(true);
     this.player.setSize(C2_FRAME_W * 0.5, C2_FRAME_H * 0.35);
     this.player.setOffset(C2_FRAME_W * 0.25, C2_FRAME_H * 0.6);
     this.player.facing = 'up';
     // Ensure player renders above NPCs and objects
     this.player.setDepth(10000);
     this.physics.add.collider(this.player, this.map.obstacles);

    // Pokemon-style camera: player stays pinned to the center of the
    // screen, the map scrolls underneath them. See mapLoader.js.
    centerCameraOnPlayer(this, this.map, this.player);

    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      interact: Phaser.Input.Keyboard.KeyCodes.E
    });
    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.on('keydown-ESC', () => {
      if (!this.locked) { this.locked = true; showPauseMenu(this); }
    });

// --- Don Emilio --- (real sprite sheet, same 44x78 grid convention as
     // hiraya-sheet/lola-sheet - frame 0 is his down-facing idle pose).
     this.donEmilio = this.add.sprite(720, 688, 'donemilio-sheet', 0);
     // Static collision body sized to almost the whole sprite (not just the
     // feet) so the player can't walk into/overlap Don Emilio from any side -
     // top, bottom, or left/right. NOTE: Phaser's setSize(w, h, center) only
     // takes 3 params - passing a 4th offset value here used to silently do
     // nothing, and the truthy 3rd value made it auto-center the box in the
     // middle of the sprite instead, which is why the player used to be able
     // to walk in as far as his waist/chest before colliding. setOffset()
     // must be called separately, after setSize(..., false) disables the
     // auto-centering.
     this.physics.add.existing(this.donEmilio, true);
     this.donEmilio.body.setSize(C2_FRAME_W * 0.6, C2_FRAME_H * 0.85, false);
     this.donEmilio.body.setOffset(C2_FRAME_W * 0.2, C2_FRAME_H * 0.08);
     this.physics.add.collider(this.player, this.donEmilio);
     // Ensure Don Emilio renders below player
     this.donEmilio.setDepth(0);
    this.interactPrompt = this.add.text(this.donEmilio.x, this.donEmilio.y - 90, '', {
      fontFamily: 'sans-serif', fontSize: 13, color: '#fff8e7', backgroundColor: '#000000aa',
      padding: { x: 6, y: 3 }
    }).setOrigin(0.5).setVisible(false);
    // Generic "near a plot" hint - repositioned each frame above whichever
    // plot the player is closest to (see this.plots below / update()).
    this.plotPrompt = this.add.text(0, 0, 'Press E to interact', {
      fontFamily: 'sans-serif', fontSize: 13, color: '#fff8e7', backgroundColor: '#000000aa',
      padding: { x: 6, y: 3 }
    }).setOrigin(0.5).setVisible(false).setDepth(100000);
    this.returnFlag = this.add.text(this.donEmilio.x, this.donEmilio.y - 60, '❗', { fontSize: 26 })
      .setOrigin(0.5).setVisible(false);

    // --- the 5 buildable plots (fresh copy of CHAPTER2_PLOT_DATA so
    // `built` resets every time this scene starts) ---
    this.plots = CHAPTER2_PLOT_DATA.map(p => ({ ...p, built: false }));
    // Each plot (empty or built) is solid - like a house or market stall -
    // rather than walk-over-able ground, so it gets a static physics body,
    // same technique used for decor obstacles elsewhere. Its name/"Empty
    // Plot" label has been removed in favor of the "Press E to interact"
    // hint above (this.plotPrompt), shown only while the player is near.
    this.plotObstacles = [];
    this.plots.forEach(p => {
      p.x = p.col * CHAPTER2_TILE_SIZE + CHAPTER2_TILE_SIZE / 2;
      p.y = p.row * CHAPTER2_TILE_SIZE + CHAPTER2_TILE_SIZE / 2;

      // Deliberately unlabeled until built - showing the building name (or
      // using its final color) up front would just hand over the answer.
      // Every plot starts on the same "empty plot" icon regardless of what
      // it'll become, so it gives no hint toward the answer either.
      const hasEmptyIcon = this.textures.exists(CHAPTER2_EMPTY_ICON.key);
      p.rect = hasEmptyIcon
        ? this.add.image(p.x, p.y, CHAPTER2_EMPTY_ICON.key).setDisplaySize(CHAPTER2_EMPTY_ICON.w, CHAPTER2_EMPTY_ICON.h)
        : this.add.rectangle(p.x, p.y, 46, 46, 0x6b4f30, 0.35).setStrokeStyle(2, 0xf5e2c8);
      p.iconH = hasEmptyIcon ? CHAPTER2_EMPTY_ICON.h : 46;
      this.physics.add.existing(p.rect, true);
      this.plotObstacles.push(p.rect);
      p.mark = this.add.text(p.x, p.y, '?', {
        fontFamily: 'sans-serif', fontSize: 22, color: '#fff8e7', fontStyle: 'bold'
      }).setOrigin(0.5);
      p.check = this.add.text(p.x, p.y, '✓', {
        fontFamily: 'sans-serif', fontSize: 22, color: '#ffffff', fontStyle: 'bold'
      }).setOrigin(0.5).setVisible(false);
    });
    this.physics.add.collider(this.player, this.plotObstacles);

    // 6th task - not a buildable plot, just walking back to report to Don
    // Emilio once all 5 plots are built. See getTaskList().
    this.reportDone = false;

    // --- HUD --- (scrollFactor 0 so it stays pinned to the screen instead
    // of scrolling away with the map now that the camera follows the player)
    const displayName = character.charAt(0).toUpperCase() + character.slice(1);
    this.add.text(14, 12, displayName, {
      fontFamily: 'Georgia, serif', fontSize: 18, color: '#fff8e7'
    }).setShadow(1, 1, '#000000aa', 2, true, true).setScrollFactor(0).setDepth(900);

    this.add.text(width / 2, 16, 'Chapter 2: The Birth of a Municipality', {
      fontFamily: 'Georgia, serif', fontSize: 16, color: '#f5e2c8'
    }).setOrigin(0.5, 0).setShadow(1, 1, '#000000aa', 2, true, true).setScrollFactor(0).setDepth(900);

    const taskBtn = createButton(this, width - 84, 27, 'Task', () => {
      if (this.mode === 'explore' && !this.locked) {
        this.locked = true;
        this.showObjectivesModal();
      }
    }, { width: 140, height: 30, fontSize: 13 });
    this.taskBtnRect = taskBtn.rect.setScrollFactor(0).setDepth(900);
    this.taskBtnTxt = taskBtn.txt.setScrollFactor(0).setDepth(901);
    this.taskBtnRect.setVisible(false);
    this.taskBtnTxt.setVisible(false);
    this.updateProgress();

    const journalBtn = createButton(this, 66, height - 30, 'Journal', () => {
      if (this.mode === 'explore' && !this.locked) {
        this.locked = true;
        this.showJournalModal();
      }
    }, { width: 110, height: 34, fontSize: 13 });
    journalBtn.rect.setScrollFactor(0).setDepth(900);
    journalBtn.txt.setScrollFactor(0).setDepth(901);

    const menuBtn = createButton(this, width - 66, height - 30, 'Menu', () => {
      if (!this.locked) { this.locked = true; showPauseMenu(this); }
    }, { width: 110, height: 34, fontSize: 13 });
    menuBtn.rect.setScrollFactor(0).setDepth(900);
    menuBtn.txt.setScrollFactor(0).setDepth(901);

    this.add.text(width / 2, height - 12, 'WASD to move · E to interact · Esc for menu', {
      fontFamily: 'sans-serif', fontSize: 12, color: '#9aa0aa'
    }).setOrigin(0.5, 1).setScrollFactor(0).setDepth(900);

    // --- curtain-open reveal - opening dialogue waits for it to finish ---
    this.locked = true;
    curtainOpen(this, () => {
      showDialogue(this, 'Don Emilio', [
        'Ah, a new face — welcome to Pateros, back when it was still finding its shape.',
        'Pateros was no longer simply a small community. In 1700, it was declared a municipality.',
        'A real town needs more than a name. It needs a market, a road, a place to gather, homes for its people.',
        'Come, help me picture where each one belongs. Walk around and place them where they make sense.'
      ], () => {
        this.locked = false;
        this.mode = 'explore';
        // Don Emilio's task has now actually been given - reveal the Task button.
        this.taskBtnRect.setVisible(true);
        this.taskBtnTxt.setVisible(true);
      }, ['don-emilio-happy', 'don-emilio-explain', 'don-emilio-explain', 'don-emilio-point']);
    });
  }

  createPlayerAnims(textureKey) {
    const p = this.prefix;
    if (!this.anims.exists(`${p}-walk-down`)) {
      this.anims.create({ key: `${p}-walk-down`, frames: this.anims.generateFrameNumbers(textureKey, { start: 0, end: 11 }), frameRate: 12, repeat: -1 });
    }
    if (!this.anims.exists(`${p}-walk-up`)) {
      this.anims.create({ key: `${p}-walk-up`, frames: this.anims.generateFrameNumbers(textureKey, { start: 12, end: 19 }), frameRate: 10, repeat: -1 });
    }
    if (!this.anims.exists(`${p}-walk-side`)) {
      this.anims.create({ key: `${p}-walk-side`, frames: this.anims.generateFrameNumbers(textureKey, { start: 24, end: 34 }), frameRate: 12, repeat: -1 });
    }
  }

  // Full task list for the HUD counter / objectives modal: the 5 building
  // types, plus a 6th "Report to Don Emilio" task that only appears once
  // all 5 have been placed (goes 5/5 -> 5/6, then 6/6 once you talk to him).
  getTaskList() {
    const list = this.plots.map(p => ({ name: p.name, found: p.built, info: p.info, type: 'item' }));
    if (this.plots.every(p => p.built)) {
      list.push({
        name: 'Report to Don Emilio',
        found: this.reportDone,
        info: 'Walk back to Don Emilio and press E to show him the finished town.',
        type: 'task'
      });
    }
    return list;
  }

  updateProgress() {
    const tasks = this.getTaskList();
    const found = tasks.filter(t => t.found).length;
    if (this.taskBtnTxt) this.taskBtnTxt.setText(`Task (${found}/${tasks.length})`);
  }

  // --- Objectives modal: which building types are placed, highlighted once
  // built. Hovering a built row pops up what was learned from it. ---------
showObjectivesModal() {
     const { width, height } = this.scale;
     const tasks = this.getTaskList();
     const container = this.add.container(0, 0).setDepth(10500).setScrollFactor(0);
    const overlay = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.45).setInteractive().setScrollFactor(0);

    const rowH = 34;
    const headerH = 96;
    const tooltipH = 74;
    const footerH = 60;
    const panelH = headerH + tasks.length * rowH + tooltipH + footerH;
    const panel = this.add.rectangle(width / 2, height / 2, 380, panelH, 0xfff8e7, 1).setStrokeStyle(4, 0x9c3b2e);
    const top = height / 2 - panelH / 2;

    const title = this.add.text(width / 2, top + 26, 'Objectives', {
      fontFamily: 'Georgia, serif', fontSize: 20, color: '#9c3b2e', fontStyle: 'bold'
    }).setOrigin(0.5);
    const allPlotsBuilt = this.plots.every(p => p.built);
    const subtitle = this.add.text(width / 2, top + 50,
      allPlotsBuilt ? 'All built — now report back to Don Emilio:' : 'Figure out where each of these belongs:', {
      fontFamily: 'sans-serif', fontSize: 13, color: '#6b4a2f'
    }).setOrigin(0.5);
    const hint = this.add.text(width / 2, top + 70, 'Hover a built item to see what you learned', {
      fontFamily: 'sans-serif', fontSize: 11, color: '#9aa0aa', fontStyle: 'italic'
    }).setOrigin(0.5);

    container.add([overlay, panel, title, subtitle, hint]);

    // Shared tooltip element - one instance, repositioned/retexted per hover.
    const tooltipTxt = this.add.text(width / 2, top + headerH + tasks.length * rowH + 14, '', {
      fontFamily: 'sans-serif', fontSize: 12, color: '#3b2410', align: 'center',
      wordWrap: { width: 330 }
    }).setOrigin(0.5, 0).setVisible(false);
    container.add(tooltipTxt);

    tasks.forEach((t, i) => {
      const y = top + headerH + i * rowH;
      const found = t.found;
      const mark = this.add.text(width / 2 - 150, y, found ? '✓' : '—', {
        fontFamily: 'sans-serif', fontSize: 16, fontStyle: 'bold',
        color: found ? '#3c7a3e' : '#9aa0aa'
      }).setOrigin(0, 0.5);
      const label = this.add.text(width / 2 - 122, y, t.type === 'task' ? t.name : `${t.name} x1`, {
        fontFamily: 'sans-serif', fontSize: 15,
        color: found ? '#3c7a3e' : '#3b2410'
      }).setOrigin(0, 0.5);
      const status = this.add.text(width / 2 + 150, y, found
        ? (t.type === 'task' ? 'Done' : 'Built')
        : (t.type === 'task' ? 'Go talk to him' : 'Not placed'), {
        fontFamily: 'sans-serif', fontSize: 11,
        color: found ? '#3c7a3e' : '#9aa0aa'
      }).setOrigin(1, 0.5);
      container.add([mark, label, status]);

      if (found) {
        const hitZone = this.add.rectangle(width / 2, y, 356, rowH, 0xffffff, 0.001)
          .setInteractive({ useHandCursor: true })
          .setScrollFactor(0);
        const rowHighlight = this.add.rectangle(width / 2, y, 356, rowH, 0x3c7a3e, 0.12).setVisible(false);
        container.add([rowHighlight, hitZone]);

        hitZone.on('pointerover', () => {
          rowHighlight.setVisible(true);
          tooltipTxt.setText(t.info).setVisible(true);
        });
        hitZone.on('pointerout', () => {
          rowHighlight.setVisible(false);
          tooltipTxt.setVisible(false);
        });
      }
    });

    const { rect, txt } = createButton(this, width / 2, top + panelH - 30, 'Close', () => {
      container.destroy();
      this.locked = false;
    }, { width: 140, height: 36, fontSize: 15 });
    container.add([rect, txt]);
  }

  // --- Journal modal: which pages are unlocked vs still locked ------------
  // Reuses JOURNAL_CHAPTERS, defined once in Chapter1Scene.js.
showJournalModal() {
     const { width, height } = this.scale;
     const pages = this.registry.get('journalPages') || [];
     const container = this.add.container(0, 0).setDepth(10500).setScrollFactor(0);
    const overlay = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.45).setInteractive().setScrollFactor(0);

    const rowH = 34;
    const panelH = 110 + JOURNAL_CHAPTERS.length * rowH;
    const panel = this.add.rectangle(width / 2, height / 2, 440, panelH, 0xfff8e7, 1).setStrokeStyle(4, 0x9c3b2e);
    const top = height / 2 - panelH / 2;

    const title = this.add.text(width / 2, top + 28, "Lola's Journal", {
      fontFamily: 'Georgia, serif', fontSize: 20, color: '#9c3b2e', fontStyle: 'bold'
    }).setOrigin(0.5);

    container.add([overlay, panel, title]);

    JOURNAL_CHAPTERS.forEach((ch, i) => {
      const unlocked = pages.includes(ch.id);
      const y = top + 62 + i * rowH;
      const mark = this.add.text(width / 2 - 198, y, unlocked ? '✓' : '🔒', {
        fontFamily: 'sans-serif', fontSize: 15,
        color: unlocked ? '#3c7a3e' : '#9aa0aa'
      }).setOrigin(0, 0.5);
      const label = this.add.text(width / 2 - 172, y, `Page ${ch.id}: ${ch.title}`, {
        fontFamily: 'sans-serif', fontSize: 13,
        color: unlocked ? '#3b2410' : '#9aa0aa',
        wordWrap: { width: 300 }
      }).setOrigin(0, 0.5);
      const status = this.add.text(width / 2 + 198, y, unlocked ? 'Unlocked' : 'Locked', {
        fontFamily: 'sans-serif', fontSize: 11,
        color: unlocked ? '#3c7a3e' : '#9aa0aa'
      }).setOrigin(1, 0.5);
      container.add([mark, label, status]);
    });

    const { rect, txt } = createButton(this, width / 2, top + panelH - 30, 'Close', () => {
      container.destroy();
      this.locked = false;
    }, { width: 140, height: 36, fontSize: 15 });
    container.add([rect, txt]);
  }

  nearestInteractable() {
    const p = this.player;
    let best = null, bestDist = INTERACT_RADIUS;

    const dDon = Phaser.Math.Distance.Between(p.x, p.y, this.donEmilio.x, this.donEmilio.y);
    if (dDon < bestDist) { best = { type: 'don' }; bestDist = dDon; }

    this.plots.forEach(plot => {
      const d = Phaser.Math.Distance.Between(p.x, p.y, plot.x, plot.y);
      if (d < bestDist) { best = { type: 'plot', plot }; bestDist = d; }
    });

    return best;
  }

  talkToDonEmilio() {
    const allBuilt = this.plots.every(p => p.built);
    if (!allBuilt) {
      this.locked = true;
      showDialogue(this, 'Don Emilio', [
        `You've placed ${this.plots.filter(p => p.built).length} of 5 so far.`,
        'Keep walking the town and thinking about where each piece belongs.'
      ], () => { this.locked = false; }, ['don-emilio-explain', 'don-emilio-happy']);
      return;
    }

    this.locked = true;
    this.returnFlag.setVisible(false);
    this.reportDone = true;
    this.updateProgress();
    showDialogue(this, 'Don Emilio', [
      'Look at that — a market by the road, a municipal hall at the center, houses spreading outward.',
      'Remember: in 1700, Pateros was declared a municipality. This is how a real town took shape around that — piece by piece, always around its people.',
      'Let\'s see what you remember.'
    ], () => this.startQuiz(), ['don-emilio-happy', 'don-emilio-explain', 'don-emilio-point']);
  }

  interactWithPlot(plot) {
    this.locked = true;
    if (plot.built) {
      // Free to revisit anything already built - no risk, just a refresher.
      showInfoPopup(this, plot.name.toUpperCase(), plot.info, () => { this.locked = false; });
      return;
    }
    this.showBuildMenu(plot);
  }

  // --- "What should be built here?" menu -----------------------------------
  // Lists whichever building types haven't been placed anywhere yet, so the
  // choices narrow down (and the puzzle gets easier) as the player goes.
  // A wrong pick just shows a nudge and lets them try again - no penalty.
  showBuildMenu(plot) {
    const { width, height } = this.scale;
    const options = this.plots.filter(p => !p.built);
    const container = this.add.container(0, 0).setDepth(10500).setScrollFactor(0);
    const overlay = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.45).setInteractive().setScrollFactor(0);

    const panelH = 220 + options.length * 46;
    const panel = this.add.rectangle(width / 2, height / 2, 460, panelH, 0xfff8e7, 1).setStrokeStyle(4, 0x9c3b2e);
    const top = height / 2 - panelH / 2;

    const title = this.add.text(width / 2, top + 26, 'Empty Plot', {
      fontFamily: 'Georgia, serif', fontSize: 20, color: '#9c3b2e', fontStyle: 'bold'
    }).setOrigin(0.5);
    const clueTxt = this.add.text(width / 2, top + 52, plot.clue, {
      fontFamily: 'sans-serif', fontSize: 13, color: '#6b4a2f', align: 'center',
      wordWrap: { width: 400 }
    }).setOrigin(0.5, 0);
    const prompt = this.add.text(width / 2, top + 96, 'What should be built here?', {
      fontFamily: 'sans-serif', fontSize: 13, color: '#3b2410', fontStyle: 'italic'
    }).setOrigin(0.5);

    container.add([overlay, panel, title, clueTxt, prompt]);

    const feedback = this.add.text(width / 2, top + panelH - 100, '', {
      fontFamily: 'sans-serif', fontSize: 12, color: '#9c3b2e', align: 'center',
      wordWrap: { width: 400 }
    }).setOrigin(0.5, 0);
    container.add(feedback);

    options.forEach((opt, i) => {
      const y = top + 124 + i * 46;
      const { rect, txt } = createButton(this, width / 2, y, opt.name, () => {
        if (opt.id === plot.id) {
          container.destroy();
          this.buildPlot(plot);
        } else {
          feedback.setText("Hmm, that doesn't quite fit here. Think about the clue again.");
        }
      }, { width: 380, height: 36, fontSize: 14 });
      container.add([rect, txt]);
    });

    const { rect, txt } = createButton(this, width / 2, top + panelH - 28, 'Cancel', () => {
      container.destroy();
      this.locked = false;
    }, { width: 140, height: 32, fontSize: 13, color: 0x6b4a2f, hoverColor: 0x8a6b45 });
    container.add([rect, txt]);
  }

  buildPlot(plot) {
    plot.built = true;
    // Swap the empty-plot icon for this building's real icon if it loaded;
    // setTexture/setDisplaySize both work whether plot.rect ended up as an
    // Image (normal case) or the Rectangle fallback happens to still be
    // showing (setFillStyle would only work on the latter, so this covers
    // the Image case that replaced it).
    const builtIcon = CHAPTER2_BUILT_ICONS[plot.id];
    if (builtIcon && this.textures.exists(builtIcon.key) && plot.rect.setTexture) {
      plot.rect.setTexture(builtIcon.key).setDisplaySize(builtIcon.w, builtIcon.h);
      plot.iconH = builtIcon.h;
      // The plot's static collision body was sized from the empty-plot
      // icon at create() time - refresh it now that the display size has
      // changed to the (larger) built icon, or the collider would keep
      // using the old, smaller footprint.
      if (plot.rect.body && plot.rect.body.updateFromGameObject) {
        plot.rect.body.updateFromGameObject();
      }
    } else if (plot.rect.setFillStyle) {
      plot.rect.setFillStyle(plot.color, 0.85);
    }
    plot.mark.setVisible(false);
    plot.check.setVisible(true);
    this.updateProgress();

    showInfoPopup(this, plot.name.toUpperCase(), plot.info, () => {
      this.locked = false;
      if (this.plots.every(p => p.built)) {
        this.returnFlag.setVisible(true);
      }
    });
  }

  // --- End-of-chapter quiz -------------------------------------------------
  startQuiz() {
    this.mode = 'quiz';
    this.quizIndex = 0;
    this.quizScore = 0;
    this.quizQuestions = [
      {
        q: 'In what year was Pateros declared a municipality?',
        options: ['1700', '1800', '1898', '1950'],
        correct: 0,
        explanation: 'Pateros was declared a municipality in 1700, marking its growth from a small community into a proper town.'
      },
      {
        q: 'Where should a municipal building be placed in a growing town?',
        options: ['Near the center of the community', 'Far outside the town', 'Only next to the market', 'Hidden away from residents'],
        correct: 0,
        explanation: 'The municipal building was placed near the center of town so it could serve the whole community around it.'
      },
      {
        q: 'Why was the market placed near the road?',
        options: ['So goods could be brought in and traded easily', 'To keep it hidden from visitors', 'Because houses were forbidden there', 'It had no particular reason'],
        correct: 0,
        explanation: 'Markets sat close to the road so goods could move in and out easily for trade.'
      }
    ];
    this.showQuizQuestion();
  }

showQuizQuestion() {
     const { width, height } = this.scale;
     const qData = shuffleQuizOptions(this.quizQuestions[this.quizIndex]);
     const container = this.add.container(0, 0).setDepth(10500).setScrollFactor(0);

    const overlay = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.45).setInteractive().setScrollFactor(0);
    const panel = this.add.rectangle(width / 2, height / 2, 540, 380, 0xfff8e7, 1).setStrokeStyle(4, 0x9c3b2e);
    const qNum = this.add.text(width / 2, height / 2 - 164, `Question ${this.quizIndex + 1} / ${this.quizQuestions.length}`, {
      fontFamily: 'sans-serif', fontSize: 13, color: '#9c3b2e'
    }).setOrigin(0.5);
    const qText = this.add.text(width / 2, height / 2 - 138, qData.q, {
      fontFamily: 'Georgia, serif', fontSize: 19, color: '#3b2410', align: 'center',
      wordWrap: { width: 460 }
    }).setOrigin(0.5, 0);

    container.add([overlay, panel, qNum, qText]);

    const optionButtons = [];
    qData.options.forEach((opt, i) => {
      const y = height / 2 - 60 + i * 42;
      const { rect, txt } = createButton(this, width / 2, y, opt, () => {
        this.showQuizFeedback(container, optionButtons, qData, i);
      }, { width: 440, height: 36, fontSize: 15 });
      optionButtons.push({ rect, index: i });
      container.add([rect, txt]);
    });
  }

  // Locks the options, highlights the correct one (and the wrong pick, if any),
  // then shows a short explanation + Continue button before moving on.
  showQuizFeedback(container, optionButtons, qData, selectedIndex) {
    const isCorrect = selectedIndex === qData.correct;
    SoundManager.play(this, isCorrect ? 'correct' : 'incorrect');

    optionButtons.forEach(({ rect, index }) => {
      rect.disableInteractive();
      if (index === qData.correct) {
        rect.setFillStyle(0x3c7a3e, 0.92); // correct answer -> green
      } else if (index === selectedIndex) {
        rect.setFillStyle(0xc24a38, 0.92); // wrong pick -> red
      } else {
        rect.setFillStyle(0x9c3b2e, 0.35); // the rest -> dimmed
      }
    });

    const { width, height } = this.scale;
    const verdict = this.add.text(width / 2, height / 2 + 96, isCorrect ? 'Correct!' : 'Not quite.', {
      fontFamily: 'Georgia, serif', fontSize: 17, fontStyle: 'bold',
      color: isCorrect ? '#3c7a3e' : '#9c3b2e'
    }).setOrigin(0.5);
    const explanationTxt = this.add.text(width / 2, height / 2 + 118, qData.explanation || '', {
      fontFamily: 'sans-serif', fontSize: 13, color: '#3b2410', align: 'center',
      wordWrap: { width: 460 }
    }).setOrigin(0.5, 0);

    container.add([verdict, explanationTxt]);

    const { rect, txt } = createButton(this, width / 2, height / 2 + 170, 'Continue', () => {
      container.destroy();
      this.answerQuiz(isCorrect);
    }, { width: 160, height: 40, fontSize: 16, color: 0x3c7a3e, hoverColor: 0x4c9a4e });
    container.add([rect, txt]);
  }

  answerQuiz(correct) {
    if (correct) this.quizScore++;
    this.quizIndex++;
    if (this.quizIndex < this.quizQuestions.length) {
      this.showQuizQuestion();
    } else {
      this.finishChapter();
    }
  }

  finishChapter() {
    SoundManager.play(this, 'complete');
    this.mode = 'done';
    const pages = this.registry.get('journalPages') || [];
    if (!pages.includes(2)) pages.push(2);
    this.registry.set('journalPages', pages);
    // Persist to localStorage so Chapter 3 shows up unlocked in the main
    // menu's Chapter list even after a page reload.
    ChapterProgress.unlockNextAfter('Chapter2');

    // A short wrap-up from Don Emilio before the reward panel, so the
    // chapter closes out like the rest of the conversation instead of
    // cutting straight to a modal the instant the quiz ends.
    this.locked = true;
    showDialogue(this, 'Don Emilio', [
      'You have a good eye for how a town comes together — and I think 1700 will stick with you now.',
      'Keep this page safe. The next one is not as calm as this.'
    ], () => this.showJournalReward(), ['don-emilio-happy', 'don-emilio-point']);
  }

  showJournalReward() {
    // Chapter3Scene is now registered in main.js's scene list, so this
    // picks it up automatically and starts it instead of falling back
    // to the menu - no other change needed here.
    const chapter3Ready = !!this.scene.manager.keys['Chapter3'];

const { width, height } = this.scale;
     const container = this.add.container(0, 0).setDepth(10500).setScrollFactor(0);
    const overlay = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.55).setInteractive().setScrollFactor(0);
    const panel = this.add.rectangle(width / 2, height / 2, 460, 240, 0xfff8e7, 1).setStrokeStyle(4, 0x9c3b2e);
    const title = this.add.text(width / 2, height / 2 - 80, 'Journal Page #2 Unlocked!', {
      fontFamily: 'Georgia, serif', fontSize: 22, color: '#9c3b2e', fontStyle: 'bold'
    }).setOrigin(0.5);
    const scoreTxt = this.add.text(width / 2, height / 2 - 34, `You remembered ${this.quizScore} / ${this.quizQuestions.length}.`, {
      fontFamily: 'sans-serif', fontSize: 16, color: '#3b2410'
    }).setOrigin(0.5);
    const flavor = this.add.text(width / 2, height / 2, chapter3Ready
      ? 'The Birth of a Municipality — recorded in the journal. Chapter 3 awaits.'
      : 'The Birth of a Municipality — recorded in the journal. Chapter 3 is still being written — more adventures coming soon!', {
      fontFamily: 'sans-serif', fontSize: 14, color: '#6b4a2f', align: 'center', wordWrap: { width: 380 }
    }).setOrigin(0.5, 0);

    container.add([overlay, panel, title, scoreTxt, flavor]);

    const { rect, txt } = createButton(this, width / 2, height / 2 + 88, chapter3Ready ? 'Continue' : 'Back to Menu', () => {
      curtainClose(this, () => this.scene.start(chapter3Ready ? 'Chapter3' : 'Menu'));
    }, { width: 190, height: 44, fontSize: 17, color: 0x3c7a3e, hoverColor: 0x4c9a4e });
    container.add([rect, txt]);
  }

  update() {
    // interaction prompt + key handling
    if (!this.locked && (this.mode === 'explore')) {
      const nearest = this.nearestInteractable();
      if (nearest && nearest.type === 'don') {
        this.interactPrompt.setText('Press E to talk').setVisible(true);
        this.plotPrompt.setVisible(false);
      } else if (nearest && nearest.type === 'plot') {
        this.interactPrompt.setVisible(false);
        this.plotPrompt.setPosition(nearest.plot.x, nearest.plot.y - nearest.plot.iconH / 2 - 12).setVisible(true);
      } else {
        this.interactPrompt.setVisible(false);
        this.plotPrompt.setVisible(false);
      }

      if (Phaser.Input.Keyboard.JustDown(this.keys.interact) && nearest) {
        if (nearest.type === 'don') this.talkToDonEmilio();
        else this.interactWithPlot(nearest.plot);
      }
    } else {
      this.interactPrompt.setVisible(false);
      this.plotPrompt.setVisible(false);
    }

    if (this.locked || this.mode !== 'explore') {
      if (this.player.body) this.player.setVelocity(0, 0);
      SoundManager.setFootsteps(this, false);
      return;
    }

    const left = this.keys.left.isDown || this.cursors.left.isDown;
    const right = this.keys.right.isDown || this.cursors.right.isDown;
    const up = this.keys.up.isDown || this.cursors.up.isDown;
    const down = this.keys.down.isDown || this.cursors.down.isDown;

    let vx = 0, vy = 0;
    if (left) vx -= 1;
    if (right) vx += 1;
    if (up) vy -= 1;
    if (down) vy += 1;

    const moving = vx !== 0 || vy !== 0;
    SoundManager.setFootsteps(this, moving);

    if (moving) {
      const len = Math.hypot(vx, vy);
      this.player.setVelocity((vx / len) * this.speed, (vy / len) * this.speed);

      if (vy < 0) this.player.facing = 'up';
      else if (vy > 0) this.player.facing = 'down';
      else if (vx !== 0) { this.player.facing = 'side'; this.player.flipX = vx > 0; }

      this.player.play(`${this.prefix}-walk-${this.player.facing}`, true);
    } else {
      this.player.setVelocity(0, 0);
      this.player.anims.stop();
      const idleFrame = { down: 0, up: 12, side: 24 }[this.player.facing];
      this.player.setFrame(idleFrame);
    }
  }
}