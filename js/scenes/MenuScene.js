class MenuScene extends Phaser.Scene {
  constructor() {
    super('Menu');
  }

  create() {
    SoundManager.playMusic(this, 'bg-menu');
    const { width, height } = this.scale;

    const bg = this.add.image(width / 2, height / 2, 'bg-village');
    coverFitImage(bg, width, height);
    this.add.rectangle(width / 2, height / 2, width, height, 0x1a1206, 0.32);

    this.add.text(width / 2, height * 0.2, 'PATO EXPLORER', {
      fontFamily: 'Georgia, serif',
      fontSize: 56,
      color: '#fff8e7',
      stroke: '#3b2410',
      strokeThickness: 8
    }).setOrigin(0.5).setShadow(2, 4, '#00000066', 6, true, true);

    this.add.text(width / 2, height * 0.2 + 46, 'Where the river remembers', {
      fontFamily: 'Georgia, serif',
      fontSize: 18,
      color: '#f5e2c8'
    }).setOrigin(0.5).setShadow(1, 2, '#00000066', 3, true, true);

    // Four evenly-spaced main menu buttons: Start, Chapter, Settings, About.
    const menuTop = height * 0.52;
    const spacing = 68;

    const startBtn = createButton(this, width / 2, menuTop, 'Start', () => {
      startBtn.rect.disableInteractive();
      chapterBtn.rect.disableInteractive();
      settingsBtn.rect.disableInteractive();
      aboutBtn.rect.disableInteractive();
      this.registry.set('selectedCharacter', 'hiraya');
      curtainClose(this, () => this.scene.start('Prologue'));
    });

    const chapterBtn = createButton(this, width / 2, menuTop + spacing, 'Chapter', () => {
      this.showChapterSelect();
    });

    const settingsBtn = createButton(this, width / 2, menuTop + spacing * 2, 'Settings', () => {
      this.scene.start('Settings');
    });

    const aboutBtn = createButton(this, width / 2, menuTop + spacing * 3, 'About', () => {
      this.scene.start('About');
    });
  }

  // Chapter-select modal: lists every chapter, in story order, from the
  // shared ChapterProgress list. Only chapters the player has actually
  // reached are playable here - the rest show up locked - and that unlock
  // state is read straight from localStorage (via ChapterProgress), so it
  // survives page reloads instead of resetting like the in-memory registry.
  showChapterSelect() {
    const { width, height } = this.scale;

    const candidates = ChapterProgress.CHAPTER_ORDER.filter(
      (c) => !!this.scene.manager.keys[c.key]
    );

    const container = this.add.container(0, 0).setDepth(2000);
    const overlay = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.55)
      .setInteractive();

    const rowH = 44;
    const panelH = 96 + candidates.length * rowH;
    const panel = this.add.rectangle(width / 2, height / 2, 320, panelH, 0x20222a, 1)
      .setStrokeStyle(3, 0x9c3b2e);
    const top = height / 2 - panelH / 2;

    const title = this.add.text(width / 2, top + 30, 'Chapters', {
      fontFamily: 'Georgia, serif', fontSize: 22, color: '#fff8e7'
    }).setOrigin(0.5);
    const sub = this.add.text(width / 2, top + 54, 'Jump back into any chapter you\u2019ve reached', {
      fontFamily: 'sans-serif', fontSize: 11, color: '#c9cdd6', fontStyle: 'italic'
    }).setOrigin(0.5);

    container.add([overlay, panel, title, sub]);

    candidates.forEach((c, i) => {
      const y = top + 84 + i * rowH;
      const unlocked = ChapterProgress.isUnlocked(c.key);

      if (unlocked) {
        const { rect, txt } = createButton(this, width / 2, y, `\u2713 ${c.label}`, () => {
          container.destroy();
          curtainClose(this, () => this.scene.start(c.key));
        }, { width: 260, height: 34, fontSize: 14 });
        container.add([rect, txt]);
      } else {
        // Locked entry: same footprint as a button, but not interactive -
        // dimmed and marked with a lock, so it reads as "not yet playable"
        // rather than just a disabled-looking button.
        const rect = this.add.rectangle(width / 2, y, 260, 34, 0x33363f, 0.7)
          .setStrokeStyle(2, 0x555a66);
        const txt = this.add.text(width / 2, y, `\u{1F512} ${c.label}`, {
          fontFamily: 'Georgia, serif', fontSize: 14, color: '#9aa0aa'
        }).setOrigin(0.5);
        container.add([rect, txt]);
      }
    });

    const { rect: closeRect, txt: closeTxt } = createButton(this, width / 2, top + panelH - 28, 'Close', () => {
      container.destroy();
    }, { width: 120, height: 32, fontSize: 13, color: 0x555a66, hoverColor: 0x6b7180 });
    container.add([closeRect, closeTxt]);
  }
}
