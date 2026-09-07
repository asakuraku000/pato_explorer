const C5_FRAME_W = 44;
const C5_FRAME_H = 78;

// NOTE: INTERACT_RADIUS and JOURNAL_CHAPTERS are declared once in
// Chapter1Scene.js (loaded before this file in index.html) and reused here
// as-is - see that file for the shared journal table of contents.

// ============================================================================
// Chapter 5 - "A Living Heritage"
// ----------------------------------------------------------------------------
// Per the story doc, this is the present-day chapter and it deliberately
// drops the "walk around and find things" loop every other chapter uses.
// Amihan/Hiraya meets two people instead of one - Ate Clara (keeper of the
// old traditions) and Maya (the younger generation) - and the whole chapter
// is: greeting dialogue -> one matching mini-game ("Keep the Story Alive")
// -> a 3-question quiz -> Journal Page #5 -> a short closing scene that
// wraps up the whole game (the doc's "FINAL GAME - Restore the Journal").
//
// The matching mini-game cards are still placeholder flat-color/DOM
// elements, same approach as Chapter 3/4. Ate Clara and Maya now have real
// sprites and dialogue portraits (see PreloadScene.js) - drop in real
// mini-game card art later and none of the logic here needs to change.
// ============================================================================

// ---------------------------------------------------------------------------
// MAP DATA - exported straight from the map editor (editor.html -> "Export
// JSON" for the chapter5_heritage_square map). This is a verbatim copy of
// that JSON; re-export from the editor and paste the object over this one
// any time the plaza layout changes, no other code below needs to change as
// long as new tile/object keys still follow the editor's normal
// "<prefix>_<number>" naming (see resolveChapter5TileImagePath /
// resolveChapter5ObjectImagePath). Same 48x32 / 32px-tile convention as
// Chapter1-4 (see mapLoader.js) - tile type 6 ("specialGround_03") is used
// for the open plaza clearing around the player's spawn point, in place of
// the plain "path" tile the earlier procedural version used.
// ---------------------------------------------------------------------------
const CHAPTER5_MAP_DATA = {
  "name": "chapter5_heritage_square",
  "cols": 48,
  "rows": 32,
  "tileSize": 32,
  "spawn": {
    "col": 23,
    "row": 26,
    "x": 752,
    "y": 848
  },
  "tileTypes": {
    "0": {
      "name": "grass",
      "color": "#3a6b45",
      "solid": false,
      "imageKey": "fieldsTile_38"
    },
    "1": {
      "name": "tree",
      "color": "#1f3f27",
      "solid": true
    },
    "2": {
      "name": "water",
      "color": "#2e5f8a",
      "solid": true
    },
    "3": {
      "name": "path",
      "color": "#6b4f30",
      "solid": false,
      "imageKey": "fieldsTile_01"
    },
    "4": {
      "name": "sand",
      "color": "#d9c08a",
      "solid": false
    },
    "5": {
      "name": "wall",
      "color": "#7a5a42",
      "solid": true
    },
    "6": {
      "name": "specialGround_03",
      "color": "#888888",
      "solid": false,
      "imageKey": "specialGround_03"
    }
  },
  "tiles": [
    "555555555555555555555555555555555555555555555555",
    "500000660000000000000006600000000000004222224005",
    "500000660000000000000006600000000000004222224005",
    "500000660000000000000006600000000000004444444005",
    "500000660000000000000006600000000000000000000005",
    "500000660000000000000006600000000000000000000005",
    "500000660000000000000006600000000000000000000005",
    "500000660000000000000006600000000000000000000005",
    "500000660000000000000006600000000000000000000005",
    "500000660000000000000006600000000000000000000005",
    "500000660000000000000006600000000000000000000005",
    "500000660000000000000006600000000000000000000005",
    "500000660000000000000006600000000000006666666665",
    "500000660000000000000006600000000000006666666665",
    "500000660000000000000006600000000000006600000005",
    "500000660000000000000006600000000000006600000005",
    "500000660000000000000006600000000000006600000005",
    "500000660000000000000006600000000000006600000005",
    "500000660000000000000006600000000000006600000005",
    "500000660000000000000006600000000000006600000005",
    "500000660000000666666666666666666000006600000005",
    "500000660000000666666666666666666000006600000005",
    "500000660000000666666666666666666000006600000005",
    "500000660000000666666666666666666000006600000005",
    "500000660000000666666666666666666000006600000005",
    "566666660000000666666666666666666000006666666665",
    "566666660000000666666666666666666000006666666665",
    "500000000000000666666666666666666000000000000005",
    "500000000000000666666666666666666000000000000005",
    "500000000000000666666666666666666000000000000005",
    "500000000000000000000006600000000000000000000005",
    "555555555555555555555555555555555555555555555555"
  ],
  "objects": [
    {
      "key": "obj_house_1",
      "name": "House 1",
      "col": 20,
      "row": 18,
      "x": 656,
      "y": 592,
      "w": 116,
      "h": 112,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_house_1",
      "name": "House 1",
      "col": 13,
      "row": 28,
      "x": 432,
      "y": 912,
      "w": 116,
      "h": 112,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_house_1",
      "name": "House 1",
      "col": 34,
      "row": 28,
      "x": 1104,
      "y": 912,
      "w": 116,
      "h": 112,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_house_1",
      "name": "House 1",
      "col": 31,
      "row": 18,
      "x": 1008,
      "y": 592,
      "w": 116,
      "h": 112,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_house_2",
      "name": "House 2",
      "col": 27,
      "row": 18,
      "x": 880,
      "y": 592,
      "w": 156,
      "h": 135,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_house_2",
      "name": "House 2",
      "col": 15,
      "row": 18,
      "x": 496,
      "y": 592,
      "w": 156,
      "h": 135,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_house_4",
      "name": "House 4",
      "col": 12,
      "row": 22,
      "x": 400,
      "y": 720,
      "w": 154,
      "h": 149,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_plant_14",
      "name": "Plants 14",
      "col": 22,
      "row": 19,
      "x": 720,
      "y": 624,
      "w": 23,
      "h": 33,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_15",
      "name": "Plants 15",
      "col": 18,
      "row": 19,
      "x": 592,
      "y": 624,
      "w": 38,
      "h": 51,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_15",
      "name": "Plants 15",
      "col": 14,
      "row": 25,
      "x": 464,
      "y": 816,
      "w": 38,
      "h": 51,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_16",
      "name": "Plants 16",
      "col": 33,
      "row": 21,
      "x": 1072,
      "y": 688,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_16",
      "name": "Plants 16",
      "col": 33,
      "row": 22,
      "x": 1072,
      "y": 720,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_16",
      "name": "Plants 16",
      "col": 33,
      "row": 23,
      "x": 1072,
      "y": 752,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_16",
      "name": "Plants 16",
      "col": 33,
      "row": 24,
      "x": 1072,
      "y": 784,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_16",
      "name": "Plants 16",
      "col": 33,
      "row": 25,
      "x": 1072,
      "y": 816,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_16",
      "name": "Plants 16",
      "col": 33,
      "row": 26,
      "x": 1072,
      "y": 848,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_16",
      "name": "Plants 16",
      "col": 22,
      "row": 1,
      "x": 720,
      "y": 48,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_16",
      "name": "Plants 16",
      "col": 20,
      "row": 2,
      "x": 656,
      "y": 80,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_16",
      "name": "Plants 16",
      "col": 21,
      "row": 5,
      "x": 688,
      "y": 176,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_16",
      "name": "Plants 16",
      "col": 19,
      "row": 6,
      "x": 624,
      "y": 208,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_16",
      "name": "Plants 16",
      "col": 20,
      "row": 9,
      "x": 656,
      "y": 304,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_16",
      "name": "Plants 16",
      "col": 18,
      "row": 13,
      "x": 592,
      "y": 432,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_16",
      "name": "Plants 16",
      "col": 21,
      "row": 13,
      "x": 688,
      "y": 432,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_16",
      "name": "Plants 16",
      "col": 27,
      "row": 1,
      "x": 880,
      "y": 48,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_16",
      "name": "Plants 16",
      "col": 29,
      "row": 3,
      "x": 944,
      "y": 112,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_16",
      "name": "Plants 16",
      "col": 26,
      "row": 5,
      "x": 848,
      "y": 176,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_16",
      "name": "Plants 16",
      "col": 29,
      "row": 7,
      "x": 944,
      "y": 240,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_16",
      "name": "Plants 16",
      "col": 26,
      "row": 9,
      "x": 848,
      "y": 304,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_16",
      "name": "Plants 16",
      "col": 28,
      "row": 13,
      "x": 912,
      "y": 432,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_16",
      "name": "Plants 16",
      "col": 26,
      "row": 14,
      "x": 848,
      "y": 464,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_4",
      "name": "Shadow 4",
      "col": 22,
      "row": 16,
      "x": 720,
      "y": 528,
      "w": 44,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_4",
      "name": "Shadow 4",
      "col": 19,
      "row": 15,
      "x": 624,
      "y": 496,
      "w": 44,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_4",
      "name": "Shadow 4",
      "col": 26,
      "row": 11,
      "x": 848,
      "y": 368,
      "w": 44,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_4",
      "name": "Shadow 4",
      "col": 29,
      "row": 10,
      "x": 944,
      "y": 336,
      "w": 44,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_4",
      "name": "Shadow 4",
      "col": 22,
      "row": 8,
      "x": 720,
      "y": 272,
      "w": 44,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_4",
      "name": "Shadow 4",
      "col": 17,
      "row": 8,
      "x": 560,
      "y": 272,
      "w": 44,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_4",
      "name": "Shadow 4",
      "col": 29,
      "row": 5,
      "x": 944,
      "y": 176,
      "w": 44,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_4",
      "name": "Shadow 4",
      "col": 17,
      "row": 4,
      "x": 560,
      "y": 144,
      "w": 44,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_house_1",
      "name": "House 1",
      "col": 43,
      "row": 15,
      "x": 1392,
      "y": 496,
      "w": 116,
      "h": 112,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_house_1",
      "name": "House 1",
      "col": 43,
      "row": 18,
      "x": 1392,
      "y": 592,
      "w": 116,
      "h": 112,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_house_1",
      "name": "House 1",
      "col": 43,
      "row": 21,
      "x": 1392,
      "y": 688,
      "w": 116,
      "h": 112,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_plant_6",
      "name": "Plants 6",
      "col": 37,
      "row": 12,
      "x": 1200,
      "y": 400,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_6",
      "name": "Plants 6",
      "col": 37,
      "row": 13,
      "x": 1200,
      "y": 432,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_6",
      "name": "Plants 6",
      "col": 37,
      "row": 14,
      "x": 1200,
      "y": 464,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_6",
      "name": "Plants 6",
      "col": 37,
      "row": 15,
      "x": 1200,
      "y": 496,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_6",
      "name": "Plants 6",
      "col": 37,
      "row": 16,
      "x": 1200,
      "y": 528,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_6",
      "name": "Plants 6",
      "col": 37,
      "row": 17,
      "x": 1200,
      "y": 560,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_6",
      "name": "Plants 6",
      "col": 37,
      "row": 18,
      "x": 1200,
      "y": 592,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_6",
      "name": "Plants 6",
      "col": 36,
      "row": 20,
      "x": 1168,
      "y": 656,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_6",
      "name": "Plants 6",
      "col": 37,
      "row": 19,
      "x": 1200,
      "y": 624,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_6",
      "name": "Plants 6",
      "col": 37,
      "row": 20,
      "x": 1200,
      "y": 656,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_6",
      "name": "Plants 6",
      "col": 37,
      "row": 21,
      "x": 1200,
      "y": 688,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_6",
      "name": "Plants 6",
      "col": 36,
      "row": 21,
      "x": 1168,
      "y": 688,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_6",
      "name": "Plants 6",
      "col": 36,
      "row": 23,
      "x": 1168,
      "y": 752,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_6",
      "name": "Plants 6",
      "col": 37,
      "row": 22,
      "x": 1200,
      "y": 720,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_6",
      "name": "Plants 6",
      "col": 37,
      "row": 23,
      "x": 1200,
      "y": 752,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_6",
      "name": "Plants 6",
      "col": 36,
      "row": 22,
      "x": 1168,
      "y": 720,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_6",
      "name": "Plants 6",
      "col": 36,
      "row": 18,
      "x": 1168,
      "y": 592,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_6",
      "name": "Plants 6",
      "col": 36,
      "row": 19,
      "x": 1168,
      "y": 624,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_6",
      "name": "Plants 6",
      "col": 36,
      "row": 16,
      "x": 1168,
      "y": 528,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_6",
      "name": "Plants 6",
      "col": 36,
      "row": 15,
      "x": 1168,
      "y": 496,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_6",
      "name": "Plants 6",
      "col": 36,
      "row": 14,
      "x": 1168,
      "y": 464,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_6",
      "name": "Plants 6",
      "col": 36,
      "row": 13,
      "x": 1168,
      "y": 432,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_6",
      "name": "Plants 6",
      "col": 36,
      "row": 12,
      "x": 1168,
      "y": 400,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_6",
      "name": "Plants 6",
      "col": 35,
      "row": 12,
      "x": 1136,
      "y": 400,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_6",
      "name": "Plants 6",
      "col": 35,
      "row": 13,
      "x": 1136,
      "y": 432,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_6",
      "name": "Plants 6",
      "col": 35,
      "row": 13,
      "x": 1136,
      "y": 432,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_6",
      "name": "Plants 6",
      "col": 35,
      "row": 15,
      "x": 1136,
      "y": 496,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_6",
      "name": "Plants 6",
      "col": 35,
      "row": 14,
      "x": 1136,
      "y": 464,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_6",
      "name": "Plants 6",
      "col": 35,
      "row": 16,
      "x": 1136,
      "y": 528,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_6",
      "name": "Plants 6",
      "col": 35,
      "row": 18,
      "x": 1136,
      "y": 592,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_6",
      "name": "Plants 6",
      "col": 35,
      "row": 17,
      "x": 1136,
      "y": 560,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_6",
      "name": "Plants 6",
      "col": 35,
      "row": 19,
      "x": 1136,
      "y": 624,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_6",
      "name": "Plants 6",
      "col": 35,
      "row": 20,
      "x": 1136,
      "y": 656,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_6",
      "name": "Plants 6",
      "col": 35,
      "row": 21,
      "x": 1136,
      "y": 688,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_6",
      "name": "Plants 6",
      "col": 35,
      "row": 22,
      "x": 1136,
      "y": 720,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_6",
      "name": "Plants 6",
      "col": 35,
      "row": 23,
      "x": 1136,
      "y": 752,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_18",
      "name": "Plants 18",
      "col": 9,
      "row": 3,
      "x": 304,
      "y": 112,
      "w": 52,
      "h": 130,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_18",
      "name": "Plants 18",
      "col": 9,
      "row": 7,
      "x": 304,
      "y": 240,
      "w": 52,
      "h": 130,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_18",
      "name": "Plants 18",
      "col": 9,
      "row": 11,
      "x": 304,
      "y": 368,
      "w": 52,
      "h": 130,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_18",
      "name": "Plants 18",
      "col": 9,
      "row": 15,
      "x": 304,
      "y": 496,
      "w": 52,
      "h": 130,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_18",
      "name": "Plants 18",
      "col": 9,
      "row": 19,
      "x": 304,
      "y": 624,
      "w": 52,
      "h": 130,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_18",
      "name": "Plants 18",
      "col": 9,
      "row": 23,
      "x": 304,
      "y": 752,
      "w": 52,
      "h": 130,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_house_4",
      "name": "House 4",
      "col": 3,
      "row": 4,
      "x": 112,
      "y": 144,
      "w": 154,
      "h": 149,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_house_4",
      "name": "House 4",
      "col": 3,
      "row": 10,
      "x": 112,
      "y": 336,
      "w": 154,
      "h": 149,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_house_4",
      "name": "House 4",
      "col": 3,
      "row": 16,
      "x": 112,
      "y": 528,
      "w": 154,
      "h": 149,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_house_4",
      "name": "House 4",
      "col": 3,
      "row": 22,
      "x": 112,
      "y": 720,
      "w": 154,
      "h": 149,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_bench_1",
      "name": "Bench 1",
      "col": 16,
      "row": 21,
      "x": 528,
      "y": 688,
      "w": 50,
      "h": 50,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_bench_2",
      "name": "Bench 2",
      "col": 18,
      "row": 21,
      "x": 592,
      "y": 688,
      "w": 50,
      "h": 50,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_lamp_1",
      "name": "Lamp 1",
      "col": 25,
      "row": 29,
      "x": 816,
      "y": 944,
      "w": 50,
      "h": 80,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_plant_3",
      "name": "Plants 3",
      "col": 11,
      "row": 2,
      "x": 368,
      "y": 80,
      "w": 12,
      "h": 14,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_3",
      "name": "Plants 3",
      "col": 11,
      "row": 3,
      "x": 368,
      "y": 112,
      "w": 12,
      "h": 14,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_3",
      "name": "Plants 3",
      "col": 11,
      "row": 4,
      "x": 368,
      "y": 144,
      "w": 12,
      "h": 14,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_3",
      "name": "Plants 3",
      "col": 11,
      "row": 5,
      "x": 368,
      "y": 176,
      "w": 12,
      "h": 14,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_3",
      "name": "Plants 3",
      "col": 11,
      "row": 6,
      "x": 368,
      "y": 208,
      "w": 12,
      "h": 14,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_3",
      "name": "Plants 3",
      "col": 11,
      "row": 7,
      "x": 368,
      "y": 240,
      "w": 12,
      "h": 14,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_3",
      "name": "Plants 3",
      "col": 12,
      "row": 7,
      "x": 400,
      "y": 240,
      "w": 12,
      "h": 14,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_3",
      "name": "Plants 3",
      "col": 12,
      "row": 6,
      "x": 400,
      "y": 208,
      "w": 12,
      "h": 14,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_3",
      "name": "Plants 3",
      "col": 12,
      "row": 5,
      "x": 400,
      "y": 176,
      "w": 12,
      "h": 14,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_3",
      "name": "Plants 3",
      "col": 12,
      "row": 4,
      "x": 400,
      "y": 144,
      "w": 12,
      "h": 14,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_3",
      "name": "Plants 3",
      "col": 12,
      "row": 3,
      "x": 400,
      "y": 112,
      "w": 12,
      "h": 14,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_3",
      "name": "Plants 3",
      "col": 12,
      "row": 2,
      "x": 400,
      "y": 80,
      "w": 12,
      "h": 14,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_3",
      "name": "Plants 3",
      "col": 13,
      "row": 2,
      "x": 432,
      "y": 80,
      "w": 12,
      "h": 14,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_3",
      "name": "Plants 3",
      "col": 13,
      "row": 3,
      "x": 432,
      "y": 112,
      "w": 12,
      "h": 14,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_3",
      "name": "Plants 3",
      "col": 13,
      "row": 4,
      "x": 432,
      "y": 144,
      "w": 12,
      "h": 14,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_3",
      "name": "Plants 3",
      "col": 13,
      "row": 5,
      "x": 432,
      "y": 176,
      "w": 12,
      "h": 14,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_3",
      "name": "Plants 3",
      "col": 13,
      "row": 6,
      "x": 432,
      "y": 208,
      "w": 12,
      "h": 14,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_3",
      "name": "Plants 3",
      "col": 13,
      "row": 7,
      "x": 432,
      "y": 240,
      "w": 12,
      "h": 14,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_3",
      "name": "Plants 3",
      "col": 13,
      "row": 7,
      "x": 432,
      "y": 240,
      "w": 12,
      "h": 14,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_3",
      "name": "Plants 3",
      "col": 14,
      "row": 7,
      "x": 464,
      "y": 240,
      "w": 12,
      "h": 14,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_3",
      "name": "Plants 3",
      "col": 14,
      "row": 6,
      "x": 464,
      "y": 208,
      "w": 12,
      "h": 14,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_3",
      "name": "Plants 3",
      "col": 14,
      "row": 5,
      "x": 464,
      "y": 176,
      "w": 12,
      "h": 14,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_3",
      "name": "Plants 3",
      "col": 14,
      "row": 4,
      "x": 464,
      "y": 144,
      "w": 12,
      "h": 14,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_3",
      "name": "Plants 3",
      "col": 14,
      "row": 3,
      "x": 464,
      "y": 112,
      "w": 12,
      "h": 14,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_3",
      "name": "Plants 3",
      "col": 14,
      "row": 2,
      "x": 464,
      "y": 80,
      "w": 12,
      "h": 14,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_3",
      "name": "Plants 3",
      "col": 14,
      "row": 1,
      "x": 464,
      "y": 48,
      "w": 12,
      "h": 14,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_3",
      "name": "Plants 3",
      "col": 13,
      "row": 1,
      "x": 432,
      "y": 48,
      "w": 12,
      "h": 14,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_3",
      "name": "Plants 3",
      "col": 13,
      "row": 1,
      "x": 432,
      "y": 48,
      "w": 12,
      "h": 14,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_3",
      "name": "Plants 3",
      "col": 11,
      "row": 1,
      "x": 368,
      "y": 48,
      "w": 12,
      "h": 14,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_3",
      "name": "Plants 3",
      "col": 12,
      "row": 1,
      "x": 400,
      "y": 48,
      "w": 12,
      "h": 14,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_3",
      "name": "Plants 3",
      "col": 15,
      "row": 1,
      "x": 496,
      "y": 48,
      "w": 12,
      "h": 14,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_3",
      "name": "Plants 3",
      "col": 15,
      "row": 2,
      "x": 496,
      "y": 80,
      "w": 12,
      "h": 14,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_3",
      "name": "Plants 3",
      "col": 15,
      "row": 3,
      "x": 496,
      "y": 112,
      "w": 12,
      "h": 14,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_3",
      "name": "Plants 3",
      "col": 15,
      "row": 4,
      "x": 496,
      "y": 144,
      "w": 12,
      "h": 14,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_3",
      "name": "Plants 3",
      "col": 15,
      "row": 6,
      "x": 496,
      "y": 208,
      "w": 12,
      "h": 14,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_3",
      "name": "Plants 3",
      "col": 15,
      "row": 7,
      "x": 496,
      "y": 240,
      "w": 12,
      "h": 14,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_3",
      "name": "Plants 3",
      "col": 15,
      "row": 5,
      "x": 496,
      "y": 176,
      "w": 12,
      "h": 14,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_supply_19",
      "name": "Supplies 19",
      "col": 12,
      "row": 25,
      "x": 400,
      "y": 816,
      "w": 59,
      "h": 67,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_supply_19",
      "name": "Supplies 19",
      "col": 31,
      "row": 21,
      "x": 1008,
      "y": 688,
      "w": 59,
      "h": 67,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_supply_20",
      "name": "Supplies 20",
      "col": 46,
      "row": 19,
      "x": 1488,
      "y": 624,
      "w": 45,
      "h": 56,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_supply_21",
      "name": "Supplies 21",
      "col": 46,
      "row": 21,
      "x": 1488,
      "y": 688,
      "w": 48,
      "h": 53,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_supply_22",
      "name": "Supplies 22",
      "col": 46,
      "row": 17,
      "x": 1488,
      "y": 560,
      "w": 47,
      "h": 38,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_supply_22",
      "name": "Supplies 22",
      "col": 3,
      "row": 19,
      "x": 112,
      "y": 624,
      "w": 47,
      "h": 38,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_supply_22",
      "name": "Supplies 22",
      "col": 2,
      "row": 13,
      "x": 80,
      "y": 432,
      "w": 47,
      "h": 38,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_decor_2",
      "name": "Decor 2",
      "col": 5,
      "row": 19,
      "x": 176,
      "y": 624,
      "w": 41,
      "h": 38,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_decor_2",
      "name": "Decor 2",
      "col": 16,
      "row": 10,
      "x": 528,
      "y": 336,
      "w": 41,
      "h": 38,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_decor_2",
      "name": "Decor 2",
      "col": 17,
      "row": 10,
      "x": 560,
      "y": 336,
      "w": 41,
      "h": 38,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_decor_3",
      "name": "Decor 3",
      "col": 20,
      "row": 11,
      "x": 656,
      "y": 368,
      "w": 40,
      "h": 40,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_decor_3",
      "name": "Decor 3",
      "col": 19,
      "row": 11,
      "x": 624,
      "y": 368,
      "w": 40,
      "h": 40,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_4",
      "name": "Shadow 4",
      "col": 44,
      "row": 28,
      "x": 1424,
      "y": 912,
      "w": 44,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_4",
      "name": "Shadow 4",
      "col": 41,
      "row": 29,
      "x": 1328,
      "y": 944,
      "w": 44,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_4",
      "name": "Shadow 4",
      "col": 37,
      "row": 28,
      "x": 1200,
      "y": 912,
      "w": 44,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_4",
      "name": "Shadow 4",
      "col": 40,
      "row": 22,
      "x": 1296,
      "y": 720,
      "w": 44,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_4",
      "name": "Shadow 4",
      "col": 40,
      "row": 19,
      "x": 1296,
      "y": 624,
      "w": 44,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_4",
      "name": "Shadow 4",
      "col": 44,
      "row": 24,
      "x": 1424,
      "y": 784,
      "w": 44,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_4",
      "name": "Shadow 4",
      "col": 43,
      "row": 7,
      "x": 1392,
      "y": 240,
      "w": 44,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_4",
      "name": "Shadow 4",
      "col": 41,
      "row": 8,
      "x": 1328,
      "y": 272,
      "w": 44,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_4",
      "name": "Shadow 4",
      "col": 40,
      "row": 6,
      "x": 1296,
      "y": 208,
      "w": 44,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_4",
      "name": "Shadow 4",
      "col": 39,
      "row": 5,
      "x": 1264,
      "y": 176,
      "w": 44,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_4",
      "name": "Shadow 4",
      "col": 40,
      "row": 3,
      "x": 1296,
      "y": 112,
      "w": 44,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_4",
      "name": "Shadow 4",
      "col": 42,
      "row": 3,
      "x": 1360,
      "y": 112,
      "w": 44,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_4",
      "name": "Shadow 4",
      "col": 43,
      "row": 4,
      "x": 1392,
      "y": 144,
      "w": 44,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_4",
      "name": "Shadow 4",
      "col": 35,
      "row": 7,
      "x": 1136,
      "y": 240,
      "w": 44,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_4",
      "name": "Shadow 4",
      "col": 37,
      "row": 5,
      "x": 1200,
      "y": 176,
      "w": 44,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_4",
      "name": "Shadow 4",
      "col": 36,
      "row": 3,
      "x": 1168,
      "y": 112,
      "w": 44,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_4",
      "name": "Shadow 4",
      "col": 38,
      "row": 7,
      "x": 1232,
      "y": 240,
      "w": 44,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_stone_6",
      "name": "Stone 6",
      "col": 34,
      "row": 5,
      "x": 1104,
      "y": 176,
      "w": 11,
      "h": 9,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_stone_6",
      "name": "Stone 6",
      "col": 36,
      "row": 8,
      "x": 1168,
      "y": 272,
      "w": 11,
      "h": 9,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_tent_3",
      "name": "Tent 3",
      "col": 31,
      "row": 29,
      "x": 1008,
      "y": 944,
      "w": 65,
      "h": 62,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_tent_1",
      "name": "Tent 1",
      "col": 28,
      "row": 29,
      "x": 912,
      "y": 944,
      "w": 73,
      "h": 65,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_tent_2",
      "name": "Tent 2",
      "col": 21,
      "row": 29,
      "x": 688,
      "y": 944,
      "w": 64,
      "h": 61,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_tent_3",
      "name": "Tent 3",
      "col": 17,
      "row": 29,
      "x": 560,
      "y": 944,
      "w": 65,
      "h": 62,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_decor_8",
      "name": "Decor 8",
      "col": 19,
      "row": 29,
      "x": 624,
      "y": 944,
      "w": 28,
      "h": 42,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_box_1",
      "name": "Box 1",
      "col": 15,
      "row": 29,
      "x": 496,
      "y": 944,
      "w": 20,
      "h": 22,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_box_2",
      "name": "Box 2",
      "col": 26,
      "row": 30,
      "x": 848,
      "y": 976,
      "w": 20,
      "h": 22,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_box_3",
      "name": "Box 3",
      "col": 15,
      "row": 21,
      "x": 496,
      "y": 688,
      "w": 16,
      "h": 21,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_box_3",
      "name": "Box 3",
      "col": 29,
      "row": 29,
      "x": 944,
      "y": 944,
      "w": 16,
      "h": 21,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_box_3",
      "name": "Box 3",
      "col": 29,
      "row": 21,
      "x": 944,
      "y": 688,
      "w": 16,
      "h": 21,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_box_5",
      "name": "Box 5",
      "col": 28,
      "row": 21,
      "x": 912,
      "y": 688,
      "w": 18,
      "h": 25,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_plant_14",
      "name": "Plants 14",
      "col": 5,
      "row": 1,
      "x": 176,
      "y": 48,
      "w": 23,
      "h": 33,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_14",
      "name": "Plants 14",
      "col": 1,
      "row": 1,
      "x": 48,
      "y": 48,
      "w": 23,
      "h": 33,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_14",
      "name": "Plants 14",
      "col": 2,
      "row": 1,
      "x": 80,
      "y": 48,
      "w": 23,
      "h": 33,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_14",
      "name": "Plants 14",
      "col": 3,
      "row": 1,
      "x": 112,
      "y": 48,
      "w": 23,
      "h": 33,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_14",
      "name": "Plants 14",
      "col": 4,
      "row": 1,
      "x": 144,
      "y": 48,
      "w": 23,
      "h": 33,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_14",
      "name": "Plants 14",
      "col": 1,
      "row": 7,
      "x": 48,
      "y": 240,
      "w": 23,
      "h": 33,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_14",
      "name": "Plants 14",
      "col": 2,
      "row": 7,
      "x": 80,
      "y": 240,
      "w": 23,
      "h": 33,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_14",
      "name": "Plants 14",
      "col": 3,
      "row": 7,
      "x": 112,
      "y": 240,
      "w": 23,
      "h": 33,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_14",
      "name": "Plants 14",
      "col": 5,
      "row": 7,
      "x": 176,
      "y": 240,
      "w": 23,
      "h": 33,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_14",
      "name": "Plants 14",
      "col": 4,
      "row": 7,
      "x": 144,
      "y": 240,
      "w": 23,
      "h": 33,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_14",
      "name": "Plants 14",
      "col": 1,
      "row": 13,
      "x": 48,
      "y": 432,
      "w": 23,
      "h": 33,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_17",
      "name": "Plants 17",
      "col": 9,
      "row": 27,
      "x": 304,
      "y": 880,
      "w": 52,
      "h": 130,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_20",
      "name": "Plants 20",
      "col": 2,
      "row": 27,
      "x": 80,
      "y": 880,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_20",
      "name": "Plants 20",
      "col": 3,
      "row": 27,
      "x": 112,
      "y": 880,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_20",
      "name": "Plants 20",
      "col": 4,
      "row": 27,
      "x": 144,
      "y": 880,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_20",
      "name": "Plants 20",
      "col": 5,
      "row": 27,
      "x": 176,
      "y": 880,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_20",
      "name": "Plants 20",
      "col": 1,
      "row": 27,
      "x": 48,
      "y": 880,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_20",
      "name": "Plants 20",
      "col": 1,
      "row": 28,
      "x": 48,
      "y": 912,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_20",
      "name": "Plants 20",
      "col": 2,
      "row": 28,
      "x": 80,
      "y": 912,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_20",
      "name": "Plants 20",
      "col": 3,
      "row": 28,
      "x": 112,
      "y": 912,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_20",
      "name": "Plants 20",
      "col": 4,
      "row": 28,
      "x": 144,
      "y": 912,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_20",
      "name": "Plants 20",
      "col": 5,
      "row": 28,
      "x": 176,
      "y": 912,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_20",
      "name": "Plants 20",
      "col": 5,
      "row": 29,
      "x": 176,
      "y": 944,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_20",
      "name": "Plants 20",
      "col": 4,
      "row": 29,
      "x": 144,
      "y": 944,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_20",
      "name": "Plants 20",
      "col": 2,
      "row": 29,
      "x": 80,
      "y": 944,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_20",
      "name": "Plants 20",
      "col": 1,
      "row": 29,
      "x": 48,
      "y": 944,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_20",
      "name": "Plants 20",
      "col": 3,
      "row": 29,
      "x": 112,
      "y": 944,
      "w": 13,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_43",
      "name": "Plants 43",
      "col": 40,
      "row": 2,
      "x": 1296,
      "y": 80,
      "w": 22,
      "h": 17,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_41",
      "name": "Plants 41",
      "col": 42,
      "row": 1,
      "x": 1360,
      "y": 48,
      "w": 13,
      "h": 10,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_52",
      "name": "Plants 52",
      "col": 43,
      "row": 8,
      "x": 1392,
      "y": 272,
      "w": 48,
      "h": 59,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_52",
      "name": "Plants 52",
      "col": 45,
      "row": 1,
      "x": 1456,
      "y": 48,
      "w": 48,
      "h": 59,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_52",
      "name": "Plants 52",
      "col": 45,
      "row": 5,
      "x": 1456,
      "y": 176,
      "w": 48,
      "h": 59,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_52",
      "name": "Plants 52",
      "col": 45,
      "row": 9,
      "x": 1456,
      "y": 304,
      "w": 48,
      "h": 59,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_52",
      "name": "Plants 52",
      "col": 38,
      "row": 9,
      "x": 1232,
      "y": 304,
      "w": 48,
      "h": 59,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_decor_13",
      "name": "Decor 13",
      "col": 32,
      "row": 13,
      "x": 1040,
      "y": 432,
      "w": 43,
      "h": 54,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_decor_1",
      "name": "Decor 1",
      "col": 30,
      "row": 14,
      "x": 976,
      "y": 464,
      "w": 48,
      "h": 26,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_box_1",
      "name": "Box 1",
      "col": 32,
      "row": 15,
      "x": 1040,
      "y": 496,
      "w": 20,
      "h": 22,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_box_2",
      "name": "Box 2",
      "col": 30,
      "row": 12,
      "x": 976,
      "y": 400,
      "w": 20,
      "h": 22,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_decor_13",
      "name": "Decor 13",
      "col": 43,
      "row": 29,
      "x": 1392,
      "y": 944,
      "w": 43,
      "h": 54,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_decor_13",
      "name": "Decor 13",
      "col": 4,
      "row": 13,
      "x": 144,
      "y": 432,
      "w": 43,
      "h": 54,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_decor_13",
      "name": "Decor 13",
      "col": 13,
      "row": 14,
      "x": 432,
      "y": 464,
      "w": 43,
      "h": 54,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_grass_4",
      "name": "Grass 4",
      "col": 11,
      "row": 15,
      "x": 368,
      "y": 496,
      "w": 8,
      "h": 5,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_tent_4",
      "name": "Tent 4",
      "col": 13,
      "row": 9,
      "x": 432,
      "y": 304,
      "w": 64,
      "h": 71,
      "color": "#888888",
      "collidable": true,
      "info": ""
    }
  ]
};

// Same procedural tile painters mapLoader.js uses for the built-in tile
// types (grass/tree/water/path/sand/wall) - reused here so a tile type with
// no `imageKey` (e.g. this map's "wall") still gets real texture instead
// of a flat color fill, exactly like the editor's own preview does.
const CHAPTER5_BUILTIN_DRAWERS = {
  grass: drawGrass, tree: drawTree, water: drawWater,
  path: drawPath, sand: drawSand, wall: drawWall
};

// ---------------------------------------------------------------------------
// Asset-path resolvers - mirror editor.html's TILE_LIBRARY / OBJECT_LIBRARY
// naming so any tile/object key coming out of the map editor resolves to the
// right file under assets/src automatically, without needing a manual
// key->path table kept in sync by hand.
// ---------------------------------------------------------------------------
const CHAPTER5_TILE_KEY_SPECS = {
  fieldsTile: { dir: 'assets/src/1 Tiles', file: 'FieldsTile' },
  groundPath: { dir: 'assets/src/11 Ground Paths', file: 'GroundPath' },
  grassPathBlend: { dir: 'assets/src/12 Grass Path Blends', file: 'GrassPathBlend' },
  pathGrassBlend2: { dir: 'assets/src/13 Path Grass Blends 2', file: 'PathGrassBlend2' },
  specialGround: { dir: 'assets/src/14 Special Ground Patterns', file: 'SpecialGround' }
};
function resolveChapter5TileImagePath(key) {
  const m = key.match(/^(.+)_(\d+)$/);
  if (!m) return null;
  const spec = CHAPTER5_TILE_KEY_SPECS[m[1]];
  if (!spec) return null;
  return `${spec.dir}/${spec.file}_${m[2]}.png`;
}

const CHAPTER5_OBJECT_FOLDER_SPECS = {
  shadow: { base: 'assets/src/2 Objects', folder: '1 Shadow' },
  stone: { base: 'assets/src/2 Objects', folder: '2 Stone' },
  decor: { base: 'assets/src/2 Objects', folder: '3 Decor' },
  box: { base: 'assets/src/2 Objects', folder: '4 Box' },
  grass: { base: 'assets/src/2 Objects', folder: '5 Grass' },
  tent: { base: 'assets/src/2 Objects', folder: '6 Tent' },
  house: { base: 'assets/src/2 Objects', folder: '7 House' },
  bench: { base: 'assets/src/2 Objects', folder: '8 Bench' },
  lamp: { base: 'assets/src/2 Objects', folder: '9 Lamp' },
  fountain: { base: 'assets/src/2 Objects', folder: '10 Fountain' },
  vegetation: { base: 'assets/src/2 Objects', folder: '11 Vegetation' },
  border: { base: 'assets/src/2 Objects', folder: '12 Border' },
  building: { base: 'assets/src/2 Objects', folder: '13 Building' },
  plant: { base: 'assets/src', folder: '4 Plants' },
  supply: { base: 'assets/src', folder: '5 Supplies' },
  road1grass: { base: 'assets/src', folder: '6 Road1 Grass' },
  road1ground: { base: 'assets/src', folder: '7 Road1 Ground' },
  road2: { base: 'assets/src', folder: '8 Road2' },
  road2grass: { base: 'assets/src', folder: '9 Road2 Grass' },
  road2ground: { base: 'assets/src', folder: '10 Road2 Ground' }
};
function resolveChapter5ObjectImagePath(key) {
  if (key === 'obj_towerspot1') return 'assets/src/2 Objects/PlaceForTower1.png';
  if (key === 'obj_towerspot2') return 'assets/src/2 Objects/PlaceForTower2.png';
  const fenceMatch = key.match(/^obj_fence_(\d+)$/);
  if (fenceMatch) return `assets/src/1.1 Tiles/Tile2_${fenceMatch[1]}.png`;
  const m = key.match(/^obj_([a-z0-9]+)_(\d+)$/);
  if (!m) return null;
  const spec = CHAPTER5_OBJECT_FOLDER_SPECS[m[1]];
  if (!spec) return null;
  return `${spec.base}/${spec.folder}/${m[2]}.png`;
}

function chapter5HexToInt(css, fallback) {
  if (!css) return fallback;
  const n = parseInt(css.replace('#', ''), 16);
  return Number.isNaN(n) ? fallback : n;
}

// Builds the tileTypes config loadMap() expects (see mapLoader.js) straight
// out of CHAPTER5_MAP_DATA.tileTypes: real art where an imageKey is given,
// the matching procedural painter otherwise.
function buildChapter5TileTypes(mapData) {
  const cfg = {};
  Object.entries(mapData.tileTypes).forEach(([id, t]) => {
    cfg[id] = {
      name: t.name,
      color: chapter5HexToInt(t.color, 0x888888),
      solid: !!t.solid,
      imageKey: t.imageKey || undefined,
      noFlipY: true, // real art tiles (and hand-painted trees) shouldn't mirror
      draw: t.imageKey ? undefined : CHAPTER5_BUILTIN_DRAWERS[t.name]
    };
  });
  return cfg;
}

// --- "Keep the Story Alive" matching mini-game data ------------------------
// 4 term cards, each matched against its description (drag the card onto the
// matching slot). PLACEHOLDER CONTENT NOTE: only Alfombra and Pandangguhan
// had descriptions spelled out in the story doc's own example - those two
// are used verbatim below. Balut and Santa Marta didn't have example text
// in the doc, so their descriptions here are drafted to fit the same
// "living heritage" theme and are just as much a placeholder as the NPC art
// - reword or replace any of these later without touching the game logic.
const CHAPTER5_TRADITIONS = [
  {
    key: 'alfombra',
    name: 'Alfombra',
    desc: 'Traditional slipper-making associated with Pateros.'
  },
  {
    key: 'pandangguhan',
    name: 'Pandangguhan',
    desc: 'A cultural tradition associated with Santa Marta.'
  },
  {
    key: 'balut',
    name: 'Balut',
    desc: "Pateros' signature delicacy, carried on from generations of duck raising."
  },
  {
    key: 'santamarta',
    name: 'Santa Marta',
    desc: 'The patron saint of Pateros, honored each year with a feast and procession.'
  }
];

class Chapter5Scene extends Phaser.Scene {
  constructor() {
    super('Chapter5');
  }

  preload() {
    // Everything the plaza needs is derived straight from
    // CHAPTER5_MAP_DATA: load each tile type's image (if it has one) and
    // each placed object's image (if its key resolves to one under
    // assets/src). Every object in this map is decorative (houses, plants,
    // tents, benches, etc.) - none of them are quest/interactable keys like
    // Chapter 1 or 3 use, matching this chapter's "no exploration task"
    // design (see the doc note up top).
    Object.values(CHAPTER5_MAP_DATA.tileTypes).forEach(t => {
      if (t.imageKey) {
        const path = resolveChapter5TileImagePath(t.imageKey);
        if (path) this.load.image(t.imageKey, path);
        else console.warn('Chapter5Scene: no path resolver for tile image key', t.imageKey);
      }
    });

    const loadedObjectKeys = new Set();
    CHAPTER5_MAP_DATA.objects.forEach(o => {
      if (loadedObjectKeys.has(o.key)) return;
      const path = resolveChapter5ObjectImagePath(o.key);
      if (path) {
        this.load.image(o.key, path);
        loadedObjectKeys.add(o.key);
      } else {
        console.warn('Chapter5Scene: no path resolver for object key', o.key);
      }
    });
  }

  create() {
    SoundManager.playMusic(this, 'bg-game');
    const { width, height } = this.scale;
    const character = this.registry.get('selectedCharacter') || 'hiraya';
    const textureKey = character + '-sheet';
    this.prefix = character;
    this.speed = this.registry.get('playerSpeed') || 160;
    this.locked = false; // true during dialogue / modal minigame / quiz screens - movement disabled
    // mode: intro -> matching -> quiz -> chapterdone (then off to the
    // plaza - see PrologueScene.playEndingSequence() for what follows)
    this.mode = 'intro';

    // --- Heritage Square map (loaded from the editor's exported JSON, see
    //     CHAPTER5_MAP_DATA above) ---
    this.map = loadMap(this, CHAPTER5_MAP_DATA.tiles, {
      tileTypes: buildChapter5TileTypes(CHAPTER5_MAP_DATA)
    });

// --- player ---
     this.createPlayerAnims(textureKey);
     const startX = CHAPTER5_MAP_DATA.spawn.x;
     const startY = CHAPTER5_MAP_DATA.spawn.y;
     this.player = this.physics.add.sprite(startX, startY, textureKey, 0);
     this.player.setCollideWorldBounds(true);
     this.player.setSize(C5_FRAME_W * 0.5, C5_FRAME_H * 0.35);
     this.player.setOffset(C5_FRAME_W * 0.25, C5_FRAME_H * 0.6);
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
      right: Phaser.Input.Keyboard.KeyCodes.D
    });
    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.on('keydown-ESC', () => {
      if (!this.locked) { this.locked = true; showPauseMenu(this); }
    });

// --- Ate Clara & Maya --- (real sprite sheets, same 44x78 grid
     // convention as hiraya-sheet/lola-sheet/donemilio-sheet/kapitanandres-sheet/
     // mangcarding-sheet - frame 0 is each of their down-facing idle poses).
     // Positioned relative to the map's own spawn point so they stay put in
     // the plaza clearing even if the exported map's spawn tile ever moves.
     this.ateClara = this.add.sprite(startX, startY - 62, 'ateclara-sheet', 0);
     this.maya = this.add.sprite(startX + 60, startY - 46, 'maya-sheet', 0).setFlipX(true);
     // Static collision bodies sized to almost the whole sprite (not just the
     // feet) so the player can't walk into/overlap Ate Clara or Maya from any
     // side - top, bottom, or left/right. NOTE: Phaser's setSize(w, h, center)
     // only takes 3 params - passing a 4th offset value here used to silently
     // do nothing, and the truthy 3rd value made it auto-center the box in
     // the middle of the sprite instead, which is why the player used to be
     // able to walk in as far as waist/chest before colliding. setOffset()
     // must be called separately, after setSize(..., false) disables the
     // auto-centering.
     this.physics.add.existing(this.ateClara, true);
     this.ateClara.body.setSize(C5_FRAME_W * 0.6, C5_FRAME_H * 0.85, false);
     this.ateClara.body.setOffset(C5_FRAME_W * 0.2, C5_FRAME_H * 0.08);
     this.physics.add.existing(this.maya, true);
     this.maya.body.setSize(C5_FRAME_W * 0.6, C5_FRAME_H * 0.85, false);
     this.maya.body.setOffset(C5_FRAME_W * 0.2, C5_FRAME_H * 0.08);
     this.physics.add.collider(this.player, [this.ateClara, this.maya]);
     // Ensure Ate Clara and Maya render below player
     this.ateClara.setDepth(0);
     this.maya.setDepth(0);

    // --- decorative scenery (houses, plants, tents, benches, boxes, etc.
    // placed in the map editor) --- purely visual, except collidable ones
    // also get a static physics body so the player can't just walk through
    // a house or a tent. No quest/find logic here - see the doc note up top
    // for why this chapter skips that loop entirely.
    this.decorObstacles = [];
    CHAPTER5_MAP_DATA.objects.forEach(o => {
      const hasImage = this.textures.exists(o.key);
      let vis;
      if (hasImage) {
        vis = this.add.image(o.x, o.y, o.key).setDisplaySize(o.w, o.h);
      } else {
        vis = this.add.rectangle(o.x, o.y, o.w, o.h, chapter5HexToInt(o.color, 0x888888));
      }
      vis.setDepth(o.y);
      if (o.collidable) {
        this.physics.add.existing(vis, true);
        this.decorObstacles.push(vis);
      }
    });
    this.physics.add.collider(this.player, this.decorObstacles);

    // --- HUD --- (scrollFactor 0 so it stays pinned to the screen instead
    // of scrolling away with the map now that the camera follows the player)
    const displayName = character.charAt(0).toUpperCase() + character.slice(1);
    this.add.text(14, 12, displayName, {
      fontFamily: 'Georgia, serif', fontSize: 18, color: '#fff8e7'
    }).setShadow(1, 1, '#000000aa', 2, true, true).setScrollFactor(0).setDepth(900);

    this.add.text(width / 2, 16, 'Chapter 5: A Living Heritage', {
      fontFamily: 'Georgia, serif', fontSize: 16, color: '#f5e2c8'
    }).setOrigin(0.5, 0).setShadow(1, 1, '#000000aa', 2, true, true).setScrollFactor(0).setDepth(900);

    // one shared progress readout, re-labeled per phase (see updateProgress)
    this.progressText = this.add.text(width / 2, 38, '', {
      fontFamily: 'sans-serif', fontSize: 13, color: '#f5e2c8'
    }).setOrigin(0.5, 0).setShadow(1, 1, '#000000aa', 2, true, true).setScrollFactor(0).setDepth(900);

    const journalBtn = createButton(this, 66, height - 30, 'Journal', () => {
      if (!this.locked && this.mode !== 'done') {
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

    this.add.text(width / 2, height - 12, 'Esc for menu', {
      fontFamily: 'sans-serif', fontSize: 12, color: '#9aa0aa'
    }).setOrigin(0.5, 1).setScrollFactor(0).setDepth(900);

    // The matching mini-game's card/slot divs and their drag listeners are
    // created in startMatchingGame() / buildMatchOverlayDom(). Registered
    // here so leaving the scene mid-game (ESC, Menu button) always cleans
    // up the DOM overlay instead of leaving an orphaned div behind.
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.cleanupMatchOverlay());
    this.events.once(Phaser.Scenes.Events.DESTROY, () => this.cleanupMatchOverlay());

    // --- curtain-open reveal - opening dialogue waits for it to finish ---
    this.locked = true;
    curtainOpen(this, () => {
      showDialogue(this, 'Ate Clara', [
        "Oh - hello! You must be the one going around collecting Lola Nena's stories.",
        "I'm Ate Clara. Around here, I try to keep an eye on the old traditions so they don't get forgotten.",
        "Pateros isn't only its history, you know. Some of it is still alive today - you just have to know where to look."
      ], () => {
        showDialogue(this, 'Maya', [
          "Hi! I'm Maya. Ate Clara's been teaching me all this since I was little.",
          "I used to think it was kind of boring, if I'm honest. Now I get why it matters.",
          "Here - help us with a few of these. Match each one to what it's about, and I promise it'll stick."
        ], () => this.startMatchingGame(), ['maya-wave', 'maya-happy', 'maya-wink']);
      }, ['ate-clara-wave', 'ate-clara-happy', 'ate-clara-wink']);
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

  // Shared top-center readout, re-labeled for whichever phase is active.
  updateProgress() {
    if (!this.progressText) return;
    if (this.mode === 'matching') {
      this.progressText.setText(`Matched: ${this.matchedCount || 0}/${CHAPTER5_TRADITIONS.length}`);
    } else {
      this.progressText.setText('');
    }
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

  // ==========================================================================
  // MINI-GAME - "Keep the Story Alive" (drag-and-drop matching)
  // 4 term cards on the left, 4 (shuffled) description slots on the right.
  // Drag a card onto its matching slot; a correct drop locks the card in
  // place, a miss just bounces the card back to where it started. Per the
  // doc: "This is basically a drag-and-drop matching game. Very easy to
  // develop. But educational."
  //
  // IMPLEMENTATION NOTE: built with real HTML <div> elements layered on top
  // of the Phaser <canvas>, not Phaser GameObjects. Phaser's Container +
  // setDraggable() approach kept misbehaving here because this scene's
  // camera scrolls to follow the player while the modal itself is pinned to
  // the screen (scrollFactor(0)) - pointer-based DOM dragging sidesteps
  // that completely, since it never touches Phaser's camera/input math.
  // Everything else in the chapter (dialogue, quiz, journal modal, map,
  // player movement) is untouched and still Phaser-only.
  // ==========================================================================
  startMatchingGame() {
    this.mode = 'matching';
    this.locked = true;
    this.matchedCount = 0;
    this.updateProgress();
    this.buildMatchOverlayDom();
  }

  // Builds the DOM overlay: a fixed-position div sized/positioned to match
  // the game canvas's actual on-screen bounding rect, containing a centered
  // panel with draggable card divs and static slot divs. The panel uses a
  // fixed 820x460 layout (same numbers as the old Phaser version) and is
  // scaled down with a CSS transform if the canvas is narrower than that.
  buildMatchOverlayDom() {
    const CARD_W = 220, CARD_H = 60;
    const SLOT_W = 280, SLOT_H = 72;
    this.MATCH_CARD_W = CARD_W;
    this.MATCH_CARD_H = CARD_H;

    const overlay = document.createElement('div');
    overlay.id = 'c5-match-overlay';
    Object.assign(overlay.style, {
      position: 'fixed',
      background: 'rgba(0,0,0,0.55)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: '10000'
    });

    const panel = document.createElement('div');
    Object.assign(panel.style, {
      position: 'relative',
      width: '820px',
      height: '460px',
      background: '#fff8e7',
      border: '4px solid #9c3b2e',
      borderRadius: '4px',
      boxSizing: 'border-box',
      transformOrigin: 'center center',
      flex: '0 0 auto'
    });

    const title = document.createElement('div');
    title.textContent = 'Keep the Story Alive';
    Object.assign(title.style, {
      position: 'absolute', top: '22px', left: '0', right: '0',
      textAlign: 'center', color: '#9c3b2e', fontWeight: 'bold',
      fontFamily: 'Georgia, serif', fontSize: '21px'
    });

    const subtitle = document.createElement('div');
    subtitle.textContent = 'Drag each card onto the tradition it belongs to.';
    Object.assign(subtitle.style, {
      position: 'absolute', top: '54px', left: '0', right: '0',
      textAlign: 'center', color: '#6b4a2f', fontFamily: 'sans-serif', fontSize: '13px'
    });

    panel.appendChild(title);
    panel.appendChild(subtitle);
    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    this.matchOverlayEl = overlay;
    this.matchPanelEl = panel;

    // --- layout (panel-relative coordinates, mirrors the old Phaser numbers) ---
    const panelW = 820;
    const leftX = panelW / 2 - 250;   // card column center-x
    const rightX = panelW / 2 + 210;  // slot column center-x
    const startY = 108;
    const gapY = 82;

    // terms (draggable cards) and slots (drop targets) are shuffled
    // independently so the layout never gives the answer away for free.
    const terms = Phaser.Utils.Array.Shuffle(CHAPTER5_TRADITIONS.slice());
    const slotsData = Phaser.Utils.Array.Shuffle(CHAPTER5_TRADITIONS.slice());

    this.matchCardEls = [];
    this.matchSlotEls = [];

    slotsData.forEach((s, i) => {
      const cy = startY + i * gapY;
      const slot = document.createElement('div');
      slot.textContent = s.desc;
      Object.assign(slot.style, {
        position: 'absolute',
        left: `${rightX - SLOT_W / 2}px`,
        top: `${cy - SLOT_H / 2}px`,
        width: `${SLOT_W}px`,
        height: `${SLOT_H}px`,
        boxSizing: 'border-box',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '6px',
        background: 'rgba(255,255,255,0.5)',
        border: '2px solid #6b4a2f',
        color: '#3b2410', fontFamily: 'sans-serif', fontSize: '12px',
        transition: 'background 0.15s ease-out'
      });
      panel.appendChild(slot);
      this.matchSlotEls.push({ el: slot, key: s.key, cx: rightX, cy, filled: false });
    });

    terms.forEach((t, i) => {
      const cy = startY + i * gapY;
      const card = document.createElement('div');
      card.textContent = t.name;
      card.dataset.key = t.key;
      Object.assign(card.style, {
        position: 'absolute',
        left: `${leftX - CARD_W / 2}px`,
        top: `${cy - CARD_H / 2}px`,
        width: `${CARD_W}px`,
        height: `${CARD_H}px`,
        boxSizing: 'border-box',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '6px',
        background: '#9c3b2e',
        border: '2px solid #f5e2c8',
        color: '#fff8e7', fontWeight: 'bold',
        fontFamily: 'Georgia, serif', fontSize: '15px',
        cursor: 'grab', userSelect: 'none', touchAction: 'none',
        transition: 'left 0.22s ease-out, top 0.22s ease-out'
      });
      card.homeLeft = leftX - CARD_W / 2;
      card.homeTop = cy - CARD_H / 2;
      card.matched = false;
      panel.appendChild(card);
      this.matchCardEls.push(card);
      this.wireCardDrag(card);
    });

    this.positionMatchOverlay();
    this._matchResizeHandler = () => this.positionMatchOverlay();
    window.addEventListener('resize', this._matchResizeHandler);
    this.scale.on('resize', this._matchResizeHandler);
  }

  // Keeps the DOM overlay aligned with the game canvas's actual on-screen
  // position/size (accounts for CSS scaling of the canvas, e.g. Phaser
  // Scale.FIT), and shrinks the fixed-size panel via CSS transform if the
  // canvas is too small to show it at full size.
  positionMatchOverlay() {
    if (!this.matchOverlayEl) return;
    const rect = this.sys.game.canvas.getBoundingClientRect();
    Object.assign(this.matchOverlayEl.style, {
      left: `${rect.left}px`,
      top: `${rect.top}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`
    });
    const scale = Math.min(1, (rect.width - 40) / 820, (rect.height - 40) / 460);
    this.matchScale = scale > 0 ? scale : 1;
    if (this.matchPanelEl) this.matchPanelEl.style.transform = `scale(${this.matchScale})`;
  }

  // Pointer-based drag (deliberately not the native HTML5 drag/drop API -
  // that API is unreliable on touch devices and fires far fewer
  // intermediate move events). setPointerCapture keeps move/up events
  // firing on this exact element even if the pointer moves faster than the
  // browser can hit-test each frame, or slides off the card mid-drag.
  wireCardDrag(card) {
    let startClientX = 0, startClientY = 0, startLeft = 0, startTop = 0;

    const onPointerMove = (e) => {
      const scale = this.matchScale || 1;
      const dx = (e.clientX - startClientX) / scale;
      const dy = (e.clientY - startClientY) / scale;
      card.style.left = `${startLeft + dx}px`;
      card.style.top = `${startTop + dy}px`;
    };

    const onPointerUp = (e) => {
      card.releasePointerCapture(e.pointerId);
      card.removeEventListener('pointermove', onPointerMove);
      card.removeEventListener('pointerup', onPointerUp);
      card.style.cursor = card.matched ? 'default' : 'grab';
      card.style.transition = 'left 0.22s ease-out, top 0.22s ease-out';
      this.resolveCardDrop(card);
    };

    const onPointerDown = (e) => {
      if (card.matched) return;
      card.setPointerCapture(e.pointerId);
      startClientX = e.clientX;
      startClientY = e.clientY;
      startLeft = parseFloat(card.style.left);
      startTop = parseFloat(card.style.top);
      card.style.transition = 'none';
      card.style.zIndex = '10';
      card.style.cursor = 'grabbing';
      card.addEventListener('pointermove', onPointerMove);
      card.addEventListener('pointerup', onPointerUp);
    };

    card.addEventListener('pointerdown', onPointerDown);
    card._cleanupDrag = () => {
      card.removeEventListener('pointerdown', onPointerDown);
      card.removeEventListener('pointermove', onPointerMove);
      card.removeEventListener('pointerup', onPointerUp);
    };
  }

  // Snaps a dropped card into whichever slot its center is closest to
  // (within range); a correct match locks it in place, anything else - a
  // miss, or no slot nearby at all - tweens the card back to its start spot
  // (via the CSS transition set on the card, re-enabled in onPointerUp).
  resolveCardDrop(card) {
    const cardW = this.MATCH_CARD_W, cardH = this.MATCH_CARD_H;
    const cx = parseFloat(card.style.left) + cardW / 2;
    const cy = parseFloat(card.style.top) + cardH / 2;
    const DROP_RADIUS = 80;

    let target = null;
    this.matchSlotEls.forEach(slot => {
      if (slot.filled) return;
      const d = Math.hypot(cx - slot.cx, cy - slot.cy);
      if (d < DROP_RADIUS) target = slot;
    });

    if (!target) {
      card.style.left = `${card.homeLeft}px`;
      card.style.top = `${card.homeTop}px`;
      return;
    }

    if (target.key === card.dataset.key) {
      card.matched = true;
      target.filled = true;
      card.style.left = `${target.cx - cardW / 2}px`;
      card.style.top = `${target.cy - 50 - cardH / 2}px`;
      card.style.background = '#3c7a3e';
      card.style.pointerEvents = 'none';
      card._cleanupDrag && card._cleanupDrag();
      target.el.style.background = 'rgba(60,122,62,0.22)';
      target.el.style.border = '3px solid #3c7a3e';

      this.matchedCount++;
      this.updateProgress();
      if (this.matchedCount >= CHAPTER5_TRADITIONS.length) {
        this.time.delayedCall(500, () => this.finishMatchingGame());
      }
    } else {
      target.el.style.background = 'rgba(194,74,56,0.3)';
      this.time.delayedCall(280, () => {
        if (!target.filled) target.el.style.background = 'rgba(255,255,255,0.5)';
      });
      card.style.left = `${card.homeLeft}px`;
      card.style.top = `${card.homeTop}px`;
    }
  }

  // Tears down the DOM overlay and its listeners. Safe to call more than
  // once (normal completion, or the player bailing out mid-game via ESC /
  // Menu) since every step checks the element still exists first. Also
  // hooked to the scene's shutdown/destroy events in create() so a
  // mid-game exit never leaves an orphaned overlay div behind.
  cleanupMatchOverlay() {
    if (this._matchResizeHandler) {
      window.removeEventListener('resize', this._matchResizeHandler);
      this.scale.off('resize', this._matchResizeHandler);
      this._matchResizeHandler = null;
    }
    if (this.matchCardEls) {
      this.matchCardEls.forEach(card => card._cleanupDrag && card._cleanupDrag());
      this.matchCardEls = null;
    }
    this.matchSlotEls = null;
    if (this.matchOverlayEl) {
      this.matchOverlayEl.remove();
      this.matchOverlayEl = null;
      this.matchPanelEl = null;
    }
  }

  finishMatchingGame() {
    this.cleanupMatchOverlay();
    this.mode = 'between';
    this.updateProgress();
    showDialogue(this, 'Ate Clara', [
      'Perfect. Alfombra, Pandangguhan, balut, Santa Marta - all still part of life here, if you know where to look.',
      "None of it survives on its own, though. It survives because people keep choosing to pass it on."
    ], () => {
      showDialogue(this, 'Maya', [
        "That's kind of the whole point, actually.",
        "Let's see how much of it stuck - three quick questions."
      ], () => this.startQuiz(), ['maya-happy', 'maya-wink']);
    }, ['ate-clara-wink', 'ate-clara-happy']);
  }

  // --- End-of-chapter quiz -------------------------------------------------
  startQuiz() {
    this.mode = 'quiz';
    this.updateProgress();
    this.quizIndex = 0;
    this.quizScore = 0;
    this.quizQuestions = [
      {
        q: 'Who does Maya represent in this chapter?',
        options: ['The younger generation carrying traditions forward', 'A Spanish colonial official', 'A revolutionary soldier', 'A fisherman from Barrio Aguho'],
        correct: 0,
        explanation: "Maya represents the younger generation - someone learning to value traditions she once found boring."
      },
      {
        q: "What craft does Alfombra-making represent in Pateros' living heritage?",
        options: ['Traditional slipper-making', 'Pottery', 'Weaving', 'Boat-building'],
        correct: 0,
        explanation: 'Alfombra is tied to traditional slipper-making associated with Pateros.'
      },
      {
        q: 'What is Pandangguhan a tradition associated with?',
        options: ['Santa Marta', "Pateros' founding as a municipality", 'The Philippine Revolution', 'The balut industry'],
        correct: 0,
        explanation: 'Pandangguhan is a cultural tradition associated with Santa Marta.'
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
    const qNum = this.add.text(width / 2, height / 2 - 154, `Question ${this.quizIndex + 1} / ${this.quizQuestions.length}`, {
      fontFamily: 'sans-serif', fontSize: 13, color: '#9c3b2e'
    }).setOrigin(0.5);
    const qText = this.add.text(width / 2, height / 2 - 128, qData.q, {
      fontFamily: 'Georgia, serif', fontSize: 19, color: '#3b2410', align: 'center',
      wordWrap: { width: 460 }
    }).setOrigin(0.5, 0);

    container.add([overlay, panel, qNum, qText]);

    const optionButtons = [];
    qData.options.forEach((opt, i) => {
      const y = height / 2 - 50 + i * 42;
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
    const verdict = this.add.text(width / 2, height / 2 + 106, isCorrect ? 'Correct!' : 'Not quite.', {
      fontFamily: 'Georgia, serif', fontSize: 17, fontStyle: 'bold',
      color: isCorrect ? '#3c7a3e' : '#9c3b2e'
    }).setOrigin(0.5);
    const explanationTxt = this.add.text(width / 2, height / 2 + 128, qData.explanation || '', {
      fontFamily: 'sans-serif', fontSize: 13, color: '#3b2410', align: 'center',
      wordWrap: { width: 460 }
    }).setOrigin(0.5, 0);

    container.add([verdict, explanationTxt]);

    const { rect, txt } = createButton(this, width / 2, height / 2 + 172, 'Continue', () => {
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
    this.mode = 'chapterdone';
    this.updateProgress();
    const pages = this.registry.get('journalPages') || [];
    if (!pages.includes(5)) pages.push(5);
    this.registry.set('journalPages', pages);
    // No chapter comes after Chapter 5, but this keeps the pattern
    // consistent in case a future chapter is added to CHAPTER_ORDER.
    ChapterProgress.unlockNextAfter('Chapter5');

    // A short wrap-up from Ate Clara before the reward panel, so this last
    // chapter closes out like the rest of the conversation instead of
    // cutting straight to a modal the instant the quiz ends - fitting,
    // since this is the one that sends the player back to the plaza for
    // the ending sequence.
    this.locked = true;
    showDialogue(this, 'Ate Clara', [
      'You have all five pages now — the river, the town, the revolution, the ducks, and today.',
      'Go on back to the plaza. I think it is time you saw the whole journal, together.'
    ], () => this.showJournalReward(), ['ate-clara-happy', 'ate-clara-wink']);
  }

  showJournalReward() {
const { width, height } = this.scale;
     const container = this.add.container(0, 0).setDepth(10500).setScrollFactor(0);
    const overlay = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.55).setInteractive().setScrollFactor(0);
    const panel = this.add.rectangle(width / 2, height / 2, 460, 240, 0xfff8e7, 1).setStrokeStyle(4, 0x9c3b2e);
    const title = this.add.text(width / 2, height / 2 - 80, 'Journal Page #5 Unlocked!', {
      fontFamily: 'Georgia, serif', fontSize: 22, color: '#9c3b2e', fontStyle: 'bold'
    }).setOrigin(0.5);
    const scoreTxt = this.add.text(width / 2, height / 2 - 34, `You remembered ${this.quizScore} / ${this.quizQuestions.length}.`, {
      fontFamily: 'sans-serif', fontSize: 16, color: '#3b2410'
    }).setOrigin(0.5);
    const flavor = this.add.text(width / 2, height / 2, 'A Living Heritage - recorded in the journal. Only one page was ever missing.', {
      fontFamily: 'sans-serif', fontSize: 14, color: '#6b4a2f', align: 'center', wordWrap: { width: 380 }
    }).setOrigin(0.5, 0);

    container.add([overlay, panel, title, scoreTxt, flavor]);

    const { rect, txt } = createButton(this, width / 2, height / 2 + 88, 'Continue', () => {
      // The doc's final beat happens back at the plaza, not here in the
      // Heritage Square - PrologueScene picks up the "Restore the Journal"
      // reflection + final title card when it sees this flag (see its
      // playEndingSequence()).
      container.destroy();
      this.registry.set('gameEnding', true);
      curtainClose(this, () => this.scene.start('Prologue'));
    }, { width: 190, height: 44, fontSize: 17, color: 0x3c7a3e, hoverColor: 0x4c9a4e });
    container.add([rect, txt]);
  }

  update() {
    // No free-roam phase in this chapter (per the doc: "Instead of another
    // exploration mission..."), so the player sprite just holds its idle
    // pose throughout - this is still here, structured the same way as
    // Chapter1-4's update(), in case a future revision adds one.
    if (this.locked || this.mode === 'matching' || this.mode === 'quiz' || this.mode === 'epilogue' || this.mode === 'done') {
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