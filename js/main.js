const config = {
  type: Phaser.AUTO,
  width: 960,
  height: 540,
  parent: 'game-container',
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: { debug: false }
  },
  scene: [PreloadScene, MenuScene, AboutScene, SettingsScene, PrologueScene, GameScene, Chapter1Scene, Chapter2Scene, Chapter3Scene, Chapter4Scene, Chapter5Scene]
};

// Canvas text (which is how every Phaser text object gets drawn) doesn't
// wait for @font-face the way DOM text does - if the game starts before the
// font has actually downloaded, the very first frame of text (PreloadScene's
// "Loading..." label) draws in the fallback font and never redraws once
// Tildunk arrives. So we explicitly load it first and only boot Phaser
// once it's ready, falling back to booting anyway if the font fails to load
// for some reason (e.g. blocked request) so the game never gets stuck.
const tildunkFont = new FontFace(
  'Tildunk',
  "url('assets/fonts/tildunk.otf')"
);

tildunkFont.load()
  .then((loadedFace) => {
    document.fonts.add(loadedFace);
    new Phaser.Game(config);
  })
  .catch((err) => {
    console.warn('Tildunk font failed to load, starting with fallback fonts.', err);
    new Phaser.Game(config);
  });