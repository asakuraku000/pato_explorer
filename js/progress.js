// Tracks which chapters the player has unlocked so far, persisted to
// localStorage (unlike the Phaser registry, which is only in-memory and
// resets every time the page reloads). This is what powers the "Chapter"
// menu on the title screen: a chapter only shows up as playable there once
// it's actually been reached, and that stays true across reloads/sessions.
const ChapterProgress = (() => {
  const STORAGE_KEY = 'patoExplorer.unlockedChapters';

  // Order matters: finishing chapter N unlocks chapter N+1. Prologue is
  // always unlocked - it's what "Start" plays from the very beginning.
  const CHAPTER_ORDER = [
    { key: 'Prologue', label: 'Prologue' },
    { key: 'Chapter1', label: 'Chapter 1' },
    { key: 'Chapter2', label: 'Chapter 2' },
    { key: 'Chapter3', label: 'Chapter 3' },
    { key: 'Chapter4', label: 'Chapter 4' },
    { key: 'Chapter5', label: 'Chapter 5' }
  ];

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return ['Prologue'];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length === 0) return ['Prologue'];
      // Guard against corrupted/edited storage missing the first chapter.
      return parsed.includes('Prologue') ? parsed : ['Prologue', ...parsed];
    } catch (e) {
      // Storage unavailable/corrupt (private browsing, quota, bad JSON) -
      // fall back to "just the beginning", same as a first-ever visit.
      return ['Prologue'];
    }
  }

  function save(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      // Fails silently - progress just won't persist across reloads
      // this session (e.g. private browsing with storage disabled).
    }
  }

  function isUnlocked(key) {
    return load().includes(key);
  }

  function unlock(key) {
    const list = load();
    if (!list.includes(key)) {
      list.push(key);
      save(list);
    }
  }

  // Call this right when a chapter is completed - unlocks whichever
  // chapter comes next in CHAPTER_ORDER, if any.
  function unlockNextAfter(key) {
    const idx = CHAPTER_ORDER.findIndex((c) => c.key === key);
    if (idx === -1 || idx + 1 >= CHAPTER_ORDER.length) return;
    unlock(CHAPTER_ORDER[idx + 1].key);
  }

  return { CHAPTER_ORDER, isUnlocked, unlock, unlockNextAfter };
})();
