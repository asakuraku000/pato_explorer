// Small shared helpers so Menu / Settings / Chapter1 scenes
// don't each re-implement the same button/background code.

/**
 * Creates a clickable rectangle+label button with hover/press feedback.
 * Returns { rect, txt } in case the caller wants to reposition/restyle it later.
 */
function createButton(scene, x, y, label, onClick, opts = {}) {
  const w = opts.width ?? 220;
  const h = opts.height ?? 56;
  const fontSize = opts.fontSize ?? 26;
  const color = opts.color ?? 0x9c3b2e;
  const hoverColor = opts.hoverColor ?? 0xc24a38;
  const alpha = opts.alpha ?? 0.92;

  const rect = scene.add.rectangle(x, y, w, h, color, alpha)
    .setStrokeStyle(3, 0xf5e2c8)
    .setInteractive({ useHandCursor: true })
    .setScrollFactor(0);

  const txt = scene.add.text(x, y, label, {
    fontFamily: 'Georgia, serif',
    fontSize,
    color: '#fff8e7'
  }).setOrigin(0.5).setScrollFactor(0);

  rect.on('pointerover', () => rect.setFillStyle(hoverColor, alpha));
  rect.on('pointerout', () => rect.setFillStyle(color, alpha));
  rect.on('pointerdown', () => { rect.setScale(0.96); txt.setScale(0.96); });
  rect.on('pointerup', () => { rect.setScale(1); txt.setScale(1); SoundManager.play(scene, 'click'); onClick(); });

  return { rect, txt };
}

/**
 * Returns a shuffled COPY of a quiz question object: `options` in a random
 * order and `correct` remapped to that answer's new index. Doesn't touch the
 * original qData, so re-running a chapter reshuffles fresh each time instead
 * of drifting further with every replay.
 */
function shuffleQuizOptions(qData) {
  const order = qData.options.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return {
    ...qData,
    options: order.map((originalIndex) => qData.options[originalIndex]),
    correct: order.indexOf(qData.correct)
  };
}

/** Scales an image up just enough to cover a width x height area (like CSS background-size: cover). */
function coverFitImage(image, width, height) {
  const scale = Math.max(width / image.width, height / image.height);
  image.setScale(scale);
  return image;
}

/**
 * Bottom-of-screen dialogue box that advances line-by-line, like a classic RPG.
 * `lines` is an array of strings (short lines, per the story doc's "don't make the
 * player read a wall of text" guidance). Advance by clicking the box or pressing SPACE.
 * Calls onComplete() once the last line has been dismissed.
 *
 * `portraits` (optional) shows a speaker bust in the top-right corner, overlapping
 * the panel like a classic VN portrait. Pass a single texture key to keep it fixed,
 * or an array (one entry per line) to swap the pose as the dialogue progresses -
 * e.g. a wave on the greeting line, a talking pose on story lines, a wink on a
 * playful/task-giving line. Missing/undefined entries repeat the last valid pose.
 */
function showDialogue(scene, speaker, lines, onComplete, portraits) {
   const { width, height } = scene.scale;
   const panelH = 128;
   const panelY = height - panelH / 2 - 10;
   const panelTop = panelY - panelH / 2;
   // scrollFactor 0 so the dialogue box stays pinned to the screen even in
   // scenes where the camera is following the player around a scrolling map
   const container = scene.add.container(0, 0).setDepth(10500).setScrollFactor(0);

  const panel = scene.add.rectangle(width / 2, panelY, width - 40, panelH, 0x2c2f37, 0.96)
    .setStrokeStyle(3, 0xf5e2c8);
  const nameTag = scene.add.rectangle(90, panelTop, 140, 32, 0x9c3b2e, 0.96)
    .setStrokeStyle(2, 0xf5e2c8);
  const nameTxt = scene.add.text(90, panelTop, speaker, {
    fontFamily: 'Georgia, serif', fontSize: 16, color: '#fff8e7'
  }).setOrigin(0.5);
  const bodyTxt = scene.add.text(40 + 20, panelTop + 18, '', {
    fontFamily: 'sans-serif', fontSize: 17, color: '#f5e2c8',
    wordWrap: { width: width - 100 }
  }).setOrigin(0, 0);
  const hint = scene.add.text(width - 60, panelY + panelH / 2 - 14, '▶ space / click', {
    fontFamily: 'sans-serif', fontSize: 12, color: '#9aa0aa'
  }).setOrigin(1, 1);

  container.add([panel, nameTag, nameTxt, bodyTxt, hint]);
  panel.setInteractive().setScrollFactor(0);

  // --- optional speaker portrait, top-right, overlapping the panel's top edge ---
  // Fixed card size/position (never changes between poses) - each portrait image
  // is contain-fit inside it (scaled to fill the box without cropping, centered),
  // so swapping poses mid-dialogue never makes the box grow/shrink/shift.
  const PORTRAIT_BOX_W = 120;
  const PORTRAIT_BOX_H = 176;
  const FRAME_PAD = 16;
  const frameCenterX = (width - 34) - PORTRAIT_BOX_W / 2;
  const frameCenterY = (panelTop + 24) - PORTRAIT_BOX_H / 2;
  let portrait = null;
  let portraitFrame = null;

  const setPortrait = (key) => {
    if (!key) return;
    if (!portrait) {
      portraitFrame = scene.add.rectangle(
        frameCenterX, frameCenterY,
        PORTRAIT_BOX_W + FRAME_PAD, PORTRAIT_BOX_H + FRAME_PAD,
        0x2c2f37, 0.9
      ).setStrokeStyle(3, 0xf5e2c8);
      portrait = scene.add.image(frameCenterX, frameCenterY, key);
      container.add([portraitFrame, portrait]);
    } else {
      portrait.setTexture(key);
    }
    // contain-fit: scale by whichever axis is tighter so the art always sits
    // fully inside the fixed box, centered, with no cropping either way.
    const scale = Math.min(PORTRAIT_BOX_W / portrait.width, PORTRAIT_BOX_H / portrait.height);
    portrait.setScale(scale);
    portrait.setPosition(frameCenterX, frameCenterY);
  };

  // --- typewriter effect: reveals the line a character at a time, like a
  // classic RPG/VN textbox. Pressing space or clicking while it's still
  // typing instantly fills in the rest of the line (Pokemon-style "hold A
  // to skip the crawl"); pressing again once it's fully shown advances to
  // the next line.
  const TYPE_MS_PER_CHAR = 22;
  let i = 0;
  let typing = false;
  let typeTimer = null;
  let currentLine = '';
  let charIndex = 0;

  const stopTyping = () => {
    if (typeTimer) { typeTimer.remove(false); typeTimer = null; }
    typing = false;
    // Sudden-stop the gibberish typing blip - whether we got here because the
    // line finished on its own or because the player skipped ahead with
    // space/click. It'll start right back up (see typeNextChar) the moment
    // the next line begins typing, if there is one.
    SoundManager.stopTypeBlip();
  };

  const completeLine = () => {
    stopTyping();
    bodyTxt.setText(currentLine);
  };

  const typeNextChar = () => {
    charIndex++;
    bodyTxt.setText(currentLine.slice(0, charIndex));
    // Gibberish "talking" blip - one per visible letter, skipped on
    // whitespace so spaces between words don't blip.
    const lastChar = currentLine[charIndex - 1];
    if (lastChar && lastChar.trim() !== '') SoundManager.playTypeBlip(scene);
    if (charIndex >= currentLine.length) stopTyping();
  };

  const showLine = () => {
    currentLine = lines[i];
    charIndex = 0;
    bodyTxt.setText('');
    if (portraits) {
      const key = Array.isArray(portraits) ? (portraits[i] ?? portraits[portraits.length - 1]) : portraits;
      setPortrait(key);
    }
    typing = true;
    typeTimer = scene.time.addEvent({ delay: TYPE_MS_PER_CHAR, callback: typeNextChar, loop: true });
  };
  showLine();

  const advance = () => {
    SoundManager.play(scene, 'click');
    // First press while typing: skip straight to the full line.
    if (typing) {
      completeLine();
      return;
    }
    // Line's already fully shown - move on to the next one.
    i++;
    if (i >= lines.length) {
      stopTyping();
      panel.off('pointerdown', advance);
      scene.input.keyboard.off('keydown-SPACE', advance);
      container.destroy();
      onComplete && onComplete();
    } else {
      showLine();
    }
  };

  panel.on('pointerdown', advance);
  scene.input.keyboard.on('keydown-SPACE', advance);
}

/**
 * Reusable Movement Speed / Music / SFX picker row, bound to a
 * registry key - same widget SettingsScene uses, factored out so the
 * in-gameplay pause menu's Settings modal (see showSettingsModal below) can
 * render identical rows without duplicating the button/highlight logic.
 * `onSelect(val)` is optional - called right after the registry is updated.
 */
function makeSettingsOptionRow(scene, options, centerX, y, regKey, onSelect) {
  const spacing = 160;
  const startX = centerX - ((options.length - 1) * spacing) / 2;
  const current = scene.registry.get(regKey);
  const buttons = [];
  const objects = [];

  options.forEach(([label, val], i) => {
    const x = startX + i * spacing;
    const rect = scene.add.rectangle(x, y, 130, 40, val === current ? 0x9c3b2e : 0x33363f, 1)
      .setStrokeStyle(2, 0xf5e2c8)
      .setInteractive({ useHandCursor: true })
      .setScrollFactor(0);
    const txt = scene.add.text(x, y, String(label), {
      fontFamily: 'sans-serif', fontSize: 17, color: '#fff8e7'
    }).setOrigin(0.5).setScrollFactor(0);
    objects.push(rect, txt);

    rect.on('pointerdown', () => {
      SoundManager.play(scene, 'click');
      scene.registry.set(regKey, val);
      buttons.forEach(b => b.rect.setFillStyle(b.val === val ? 0x9c3b2e : 0x33363f));
      if (onSelect) onSelect(val);
    });

    buttons.push({ rect, val });
  });

  return objects;
}

/**
 * In-gameplay Settings modal - opened from the pause menu (see
 * showPauseMenu). Deliberately mirrors SettingsScene's look/options exactly
 * (same rows, same registry keys) but as a modal drawn straight into the
 * *current* scene instead of switching to a separate Scene, so there's no
 * scene-manager hand-off to get wrong and the paused chapter underneath
 * keeps all its state untouched. "Back" just closes the modal and resumes,
 * same as Continue on the pause menu.
 */
function showSettingsModal(scene) {
  const { width, height } = scene.scale;
  const container = scene.add.container(0, 0).setDepth(10500).setScrollFactor(0);

  // Solid (not translucent) backdrop, same color as SettingsScene, so this
  // reads as "the settings screen" rather than a see-through overlay.
  const bg = scene.add.rectangle(width / 2, height / 2, width, height, 0x20222a, 1)
    .setInteractive()
    .setScrollFactor(0);
  const title = scene.add.text(width / 2, 40, 'SETTINGS', {
    fontFamily: 'Georgia, serif', fontSize: 34, color: '#fff8e7'
  }).setOrigin(0.5);
  container.add([bg, title]);

  const labelStyle = { fontFamily: 'sans-serif', fontSize: 16, color: '#c9cdd6' };
  const addLabel = (y, text) => container.add(
    scene.add.text(width / 2, y, text, labelStyle).setOrigin(0.5).setScrollFactor(0)
  );

  addLabel(100, 'Movement Speed');
  container.add(makeSettingsOptionRow(scene,
    [['Slow', 110], ['Normal', 160], ['Fast', 220]], width / 2, 136, 'playerSpeed'));

  addLabel(184, 'Music');
  container.add(makeSettingsOptionRow(scene,
    [['Off', 0], ['Low', 0.3], ['Normal', 0.6]], width / 2, 220, 'musicVolume',
    (val) => SoundManager.setMusicVolume(scene, val)));

  addLabel(268, 'Sound Effects');
  container.add(makeSettingsOptionRow(scene,
    [['Off', 0], ['Low', 0.4], ['Normal', 0.8]], width / 2, 304, 'sfxVolume',
    (val) => SoundManager.setSfxVolume(scene, val)));

  const { rect, txt } = createButton(scene, width / 2, height - 50, 'Back', () => {
    container.destroy();
    scene.locked = false;
  }, { width: 160, height: 48, fontSize: 20 });
  container.add([rect, txt]);
}

/**
 * In-gameplay pause modal shown when the player opens the Menu (ESC key or
 * the on-screen Menu button) mid-chapter. Offers Continue / Settings / Exit
 * to Main Menu - unlike the old behavior, opening the menu no longer drops
 * the player straight back to the title screen; only "Exit" does that.
 *
 * Caller contract (same convention as the Task/Journal modals elsewhere):
 * set `scene.locked = true` right before calling this, guarded by
 * `!scene.locked` so it can't be opened on top of another modal/dialogue.
 * Continue restores `scene.locked = false` itself.
 */
function showPauseMenu(scene) {
  const { width, height } = scene.scale;
  const container = scene.add.container(0, 0).setDepth(10500).setScrollFactor(0);
  const overlay = scene.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.55)
    .setInteractive()
    .setScrollFactor(0);
  const panelH = 250;
  const panel = scene.add.rectangle(width / 2, height / 2, 300, panelH, 0xfff8e7, 1)
    .setStrokeStyle(4, 0x9c3b2e);
  const top = height / 2 - panelH / 2;

  const title = scene.add.text(width / 2, top + 34, 'Paused', {
    fontFamily: 'Georgia, serif', fontSize: 24, color: '#9c3b2e', fontStyle: 'bold'
  }).setOrigin(0.5);

  container.add([overlay, panel, title]);

  const { rect: cRect, txt: cTxt } = createButton(scene, width / 2, top + 92, 'Continue', () => {
    container.destroy();
    scene.locked = false;
  }, { width: 200, height: 44, fontSize: 17 });

  const { rect: sRect, txt: sTxt } = createButton(scene, width / 2, top + 146, 'Settings', () => {
    container.destroy();
    showSettingsModal(scene);
  }, { width: 200, height: 44, fontSize: 17 });

  const { rect: eRect, txt: eTxt } = createButton(scene, width / 2, top + 200, 'Exit to Main Menu', () => {
    container.destroy();
    curtainClose(scene, () => scene.scene.start('Menu'));
  }, { width: 200, height: 44, fontSize: 15, color: 0x555a66, hoverColor: 0x6b7180 });

  container.add([cRect, cTxt, sRect, sTxt, eRect, eTxt]);
}

/**
 * Theater-curtain scene transition. Two panels (each a Container so its dark
 * fabric + gold trim move together as one) slide in from off-screen to meet
 * at center (curtainClose) or slide back out to reveal the scene
 * (curtainOpen). Depth 11000 keeps them above everything else, including
 * other modals, so a close→switch-scene→open pairing always reads as one
 * continuous transition rather than a hard cut.
 */
function makeCurtainSide(scene, panelW, height, startX, trimOnRight) {
   const container = scene.add.container(startX, height / 2).setScrollFactor(0).setDepth(11000);
   const fabric = scene.add.image(0, 0, 'curtain-fabric');
   coverFitImage(fabric, panelW, height);
   // Mirror the right-hand panel so the folds read as one continuous
   // curtain meeting in the middle, rather than the same crop repeated twice.
   if (!trimOnRight) fabric.setFlipX(true);
   const trimX = trimOnRight ? panelW / 2 : -panelW / 2;
   const trim = scene.add.rectangle(trimX, 0, 5, height, 0xf5e2c8);
   container.add([fabric, trim]);
   return container;
}

/** Slides two curtain panels together to fully cover the screen, then calls onComplete. */
function curtainClose(scene, onComplete) {
  const { width, height } = scene.scale;
  const panelW = width / 2 + 6;
  const left = makeCurtainSide(scene, panelW, height, -width / 2, true);
  const right = makeCurtainSide(scene, panelW, height, width * 1.5, false);

  SoundManager.play(scene, 'curtain-close');
  scene.tweens.add({ targets: left, x: width / 4, duration: 550, ease: 'Cubic.easeIn' });
  scene.tweens.add({
    targets: right, x: width * 3 / 4, duration: 550, ease: 'Cubic.easeIn',
    onComplete: () => onComplete && onComplete()
  });
}

/**
 * Starts with the screen fully covered, then slides the curtain panels
 * apart to reveal it. onComplete (optional) fires once both panels have
 * fully cleared the screen - scenes use this to hold their opening
 * dialogue until the curtain has actually finished opening, rather than
 * having the NPC start talking (and the typewriter/blip sound start)
 * while still hidden behind the still-sliding fabric.
 */
function curtainOpen(scene, onComplete) {
  const { width, height } = scene.scale;
  const panelW = width / 2 + 6;
  const left = makeCurtainSide(scene, panelW, height, width / 4, true);
  const right = makeCurtainSide(scene, panelW, height, width * 3 / 4, false);

  // Delayed to match the tweens' own 150ms delay below, so the whoosh lands
  // right as the panels actually start sliding apart, not before.
  scene.time.delayedCall(150, () => SoundManager.play(scene, 'curtain-open'));
  scene.tweens.add({
    targets: left, x: -width / 2, duration: 650, delay: 150, ease: 'Cubic.easeOut',
    onComplete: () => left.destroy()
  });
  scene.tweens.add({
    targets: right, x: width * 1.5, duration: 650, delay: 150, ease: 'Cubic.easeOut',
    onComplete: () => { right.destroy(); onComplete && onComplete(); }
  });
}

/**
 * Small centered info popup for object interactions - a title + a couple sentences
 * of "you don't feel like you're studying" educational content, with an OK button.
 */
function showInfoPopup(scene, title, body, onClose) {
   const { width, height } = scene.scale;
   // scrollFactor 0 so the popup stays pinned to the screen even in scenes
   // where the camera is following the player around a scrolling map
   const container = scene.add.container(0, 0).setDepth(10500).setScrollFactor(0);

  const overlay = scene.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.35)
    .setInteractive()
    .setScrollFactor(0);
  const panel = scene.add.rectangle(width / 2, height / 2, 460, 200, 0xfff8e7, 1)
    .setStrokeStyle(4, 0x9c3b2e);
  const titleTxt = scene.add.text(width / 2, height / 2 - 62, title, {
    fontFamily: 'Georgia, serif', fontSize: 20, color: '#9c3b2e', fontStyle: 'bold'
  }).setOrigin(0.5);
  const bodyTxt = scene.add.text(width / 2, height / 2 - 20, body, {
    fontFamily: 'sans-serif', fontSize: 16, color: '#3b2410', align: 'center',
    wordWrap: { width: 400 }
  }).setOrigin(0.5, 0);

  container.add([overlay, panel, titleTxt, bodyTxt]);

  const { rect, txt } = createButton(scene, width / 2, height / 2 + 76, 'OK', () => {
    container.destroy();
    onClose && onClose();
  }, { width: 120, height: 40, fontSize: 16 });
  container.add([rect, txt]);
}
