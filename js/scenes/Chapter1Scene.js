const C1_FRAME_W = 44;
const C1_FRAME_H = 78;
const INTERACT_RADIUS = 80;

// Full journal table of contents (per the story doc) - used by the Journal
// modal to show which pages have been unlocked so far via this.registry
// 'journalPages'. Only Chapter 1 exists right now, so pages 2-5 will simply
// stay "Locked" until those chapters are built and push their own id in.
const JOURNAL_CHAPTERS = [
  { id: 1, title: 'Aguho: The River Remembers' },
  { id: 2, title: 'The Birth of a Municipality' },
  { id: 3, title: 'Pateros in the Revolution' },
  { id: 4, title: 'The Balut Capital' },
  { id: 5, title: 'A Living Heritage' }
];

// ---------------------------------------------------------------------------
// MAP DATA - exported straight from the map editor (editor.html -> "Export
// JSON" for the chapter1_river_remembers map). This is a verbatim copy of
// that JSON; re-export from the editor and paste the object over this one
// any time the riverside layout changes, no other code below needs to
// change as long as new tile/object keys still follow the editor's normal
// "<prefix>_<number>" naming (see resolveChapter1TileImagePath /
// resolveChapter1ObjectImagePath).
// ---------------------------------------------------------------------------
const CHAPTER1_MAP_DATA = {
  "name": "chapter1_river_remembers",
  "cols": 48,
  "rows": 32,
  "tileSize": 32,
  "spawn": {
    "col": 22,
    "row": 18,
    "x": 720,
    "y": 592
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
    }
  },
  "tiles": [
    "222222222222222222222222222222222222222222222222",
    "222222222222222222222222222222222222222222222222",
    "222222222222222222222222222222222222222222222222",
    "222222222222222222222222222222222222222222222222",
    "144444444444444444444443344444444444444444444441",
    "144444444444444444444443344444444444444444444441",
    "100000000000000000000003300000000000000000000001",
    "100000000000000000000003300000000000000000000001",
    "100000000000000000000003300000000000000000000001",
    "100000000000000000000003300000000000000000000001",
    "100000000000000000000003300000000000000000000001",
    "100000000000000000000003300000000000000000000001",
    "100000000000000000000003300000000000000000000001",
    "100000000000000000000003300000000000000000000001",
    "100000000000000000000003300000000000000000000001",
    "100000000000000000000003300000000000000000000001",
    "100000000000000000000003300000000000000000000001",
    "333333333333333333333333333333333333333333333333",
    "333333333333333333333333333333333333333333333333",
    "100000000000000000000003300000000000000000000001",
    "100000000000000000000003300000000000000000000001",
    "100000000000000000000003300000000000000000000001",
    "100000000000000000000003300000000000000000000001",
    "100000000000000000000003300000000000000000000001",
    "100000000000000000000003300000000000000000000001",
    "100000000000000000000003300000000000000000000001",
    "100000000000000000000003300000000000000000000001",
    "100000000000000000000003300000000000000000000001",
    "100000000000000000000003300000000000000000000001",
    "100000000000000000000003300000000000000000000001",
    "100000000000000000000003300000000000000000000001",
    "111111111111111111111111111111111111111111111111"
  ],
  "objects": [
    {
      "key": "boat",
      "name": "Boat",
      "col": 37,
      "row": 5,
      "x": 1185,
      "y": 165,
      "w": 46,
      "h": 46,
      "color": "#6b4a2f",
      "collidable": false,
      "info": "Boats like this banca carried people and goods along the river."
    },
    {
      "key": "goods",
      "name": "Goods",
      "col": 8,
      "row": 11,
      "x": 285,
      "y": 375,
      "w": 46,
      "h": 46,
      "color": "#b5893b",
      "collidable": false,
      "info": "Rice, fish, and woven goods were common items traded along the river."
    },
    {
      "key": "agoho",
      "name": "Agoho Tree",
      "col": 28,
      "row": 8,
      "x": 912,
      "y": 272,
      "w": 46,
      "h": 46,
      "color": "#3c7a3e",
      "collidable": false,
      "info": "Agoho trees were associated with the historical name \"Aguho.\""
    },
    {
      "key": "house",
      "name": "House",
      "col": 34,
      "row": 24,
      "x": 1104,
      "y": 784,
      "w": 46,
      "h": 46,
      "color": "#8a5a3a",
      "collidable": false,
      "info": "Riverside houses were built close to the water for easy trade and travel."
    },
    {
      "key": "stall",
      "name": "Trading Stall",
      "col": 11,
      "row": 22,
      "x": 375,
      "y": 705,
      "w": 46,
      "h": 46,
      "color": "#c24a38",
      "collidable": false,
      "info": "The embarcadero was a landing point where boats loaded and unloaded goods."
    },
    {
      "key": "obj_shadow_3",
      "name": "Shadow 3",
      "col": 1,
      "row": 5,
      "x": 48,
      "y": 176,
      "w": 30,
      "h": 26,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_3",
      "name": "Shadow 3",
      "col": 1,
      "row": 4,
      "x": 48,
      "y": 144,
      "w": 30,
      "h": 26,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_3",
      "name": "Shadow 3",
      "col": 1,
      "row": 6,
      "x": 48,
      "y": 208,
      "w": 30,
      "h": 26,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_3",
      "name": "Shadow 3",
      "col": 1,
      "row": 7,
      "x": 48,
      "y": 240,
      "w": 30,
      "h": 26,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_3",
      "name": "Shadow 3",
      "col": 1,
      "row": 8,
      "x": 48,
      "y": 272,
      "w": 30,
      "h": 26,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_3",
      "name": "Shadow 3",
      "col": 1,
      "row": 10,
      "x": 48,
      "y": 336,
      "w": 30,
      "h": 26,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_3",
      "name": "Shadow 3",
      "col": 1,
      "row": 11,
      "x": 48,
      "y": 368,
      "w": 30,
      "h": 26,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_3",
      "name": "Shadow 3",
      "col": 1,
      "row": 9,
      "x": 48,
      "y": 304,
      "w": 30,
      "h": 26,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_3",
      "name": "Shadow 3",
      "col": 1,
      "row": 12,
      "x": 48,
      "y": 400,
      "w": 30,
      "h": 26,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_3",
      "name": "Shadow 3",
      "col": 1,
      "row": 14,
      "x": 48,
      "y": 464,
      "w": 30,
      "h": 26,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_3",
      "name": "Shadow 3",
      "col": 1,
      "row": 13,
      "x": 48,
      "y": 432,
      "w": 30,
      "h": 26,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_3",
      "name": "Shadow 3",
      "col": 1,
      "row": 15,
      "x": 48,
      "y": 496,
      "w": 30,
      "h": 26,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_3",
      "name": "Shadow 3",
      "col": 1,
      "row": 16,
      "x": 48,
      "y": 528,
      "w": 30,
      "h": 26,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_3",
      "name": "Shadow 3",
      "col": 1,
      "row": 19,
      "x": 48,
      "y": 624,
      "w": 30,
      "h": 26,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_3",
      "name": "Shadow 3",
      "col": 1,
      "row": 20,
      "x": 48,
      "y": 656,
      "w": 30,
      "h": 26,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_3",
      "name": "Shadow 3",
      "col": 1,
      "row": 21,
      "x": 48,
      "y": 688,
      "w": 30,
      "h": 26,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_3",
      "name": "Shadow 3",
      "col": 1,
      "row": 22,
      "x": 48,
      "y": 720,
      "w": 30,
      "h": 26,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_3",
      "name": "Shadow 3",
      "col": 1,
      "row": 23,
      "x": 48,
      "y": 752,
      "w": 30,
      "h": 26,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_3",
      "name": "Shadow 3",
      "col": 1,
      "row": 25,
      "x": 48,
      "y": 816,
      "w": 30,
      "h": 26,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_3",
      "name": "Shadow 3",
      "col": 1,
      "row": 26,
      "x": 48,
      "y": 848,
      "w": 30,
      "h": 26,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_3",
      "name": "Shadow 3",
      "col": 1,
      "row": 24,
      "x": 48,
      "y": 784,
      "w": 30,
      "h": 26,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_3",
      "name": "Shadow 3",
      "col": 1,
      "row": 27,
      "x": 48,
      "y": 880,
      "w": 30,
      "h": 26,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_3",
      "name": "Shadow 3",
      "col": 1,
      "row": 29,
      "x": 48,
      "y": 944,
      "w": 30,
      "h": 26,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_3",
      "name": "Shadow 3",
      "col": 1,
      "row": 30,
      "x": 48,
      "y": 976,
      "w": 30,
      "h": 26,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_3",
      "name": "Shadow 3",
      "col": 1,
      "row": 28,
      "x": 48,
      "y": 912,
      "w": 30,
      "h": 26,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_3",
      "name": "Shadow 3",
      "col": 2,
      "row": 30,
      "x": 80,
      "y": 976,
      "w": 30,
      "h": 26,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_3",
      "name": "Shadow 3",
      "col": 4,
      "row": 30,
      "x": 144,
      "y": 976,
      "w": 30,
      "h": 26,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_3",
      "name": "Shadow 3",
      "col": 3,
      "row": 30,
      "x": 112,
      "y": 976,
      "w": 30,
      "h": 26,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_3",
      "name": "Shadow 3",
      "col": 5,
      "row": 30,
      "x": 176,
      "y": 976,
      "w": 30,
      "h": 26,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_3",
      "name": "Shadow 3",
      "col": 6,
      "row": 30,
      "x": 208,
      "y": 976,
      "w": 30,
      "h": 26,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_3",
      "name": "Shadow 3",
      "col": 8,
      "row": 30,
      "x": 272,
      "y": 976,
      "w": 30,
      "h": 26,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_3",
      "name": "Shadow 3",
      "col": 7,
      "row": 30,
      "x": 240,
      "y": 976,
      "w": 30,
      "h": 26,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_3",
      "name": "Shadow 3",
      "col": 10,
      "row": 30,
      "x": 336,
      "y": 976,
      "w": 30,
      "h": 26,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_4",
      "name": "Shadow 4",
      "col": 9,
      "row": 30,
      "x": 304,
      "y": 976,
      "w": 44,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_4",
      "name": "Shadow 4",
      "col": 11,
      "row": 30,
      "x": 368,
      "y": 976,
      "w": 44,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_4",
      "name": "Shadow 4",
      "col": 13,
      "row": 30,
      "x": 432,
      "y": 976,
      "w": 44,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_4",
      "name": "Shadow 4",
      "col": 12,
      "row": 30,
      "x": 400,
      "y": 976,
      "w": 44,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_4",
      "name": "Shadow 4",
      "col": 15,
      "row": 30,
      "x": 496,
      "y": 976,
      "w": 44,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_4",
      "name": "Shadow 4",
      "col": 14,
      "row": 30,
      "x": 464,
      "y": 976,
      "w": 44,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_4",
      "name": "Shadow 4",
      "col": 16,
      "row": 30,
      "x": 528,
      "y": 976,
      "w": 44,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_4",
      "name": "Shadow 4",
      "col": 18,
      "row": 30,
      "x": 592,
      "y": 976,
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
      "row": 30,
      "x": 560,
      "y": 976,
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
      "row": 30,
      "x": 624,
      "y": 976,
      "w": 44,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_4",
      "name": "Shadow 4",
      "col": 21,
      "row": 30,
      "x": 688,
      "y": 976,
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
      "row": 30,
      "x": 720,
      "y": 976,
      "w": 44,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_4",
      "name": "Shadow 4",
      "col": 20,
      "row": 30,
      "x": 656,
      "y": 976,
      "w": 44,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_stone_1",
      "name": "Stone 1",
      "col": 20,
      "row": 5,
      "x": 656,
      "y": 176,
      "w": 10,
      "h": 9,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_stone_6",
      "name": "Stone 6",
      "col": 28,
      "row": 4,
      "x": 912,
      "y": 144,
      "w": 11,
      "h": 9,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_stone_6",
      "name": "Stone 6",
      "col": 8,
      "row": 5,
      "x": 272,
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
      "col": 3,
      "row": 7,
      "x": 112,
      "y": 240,
      "w": 11,
      "h": 9,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_decor_3",
      "name": "Decor 3",
      "col": 36,
      "row": 25,
      "x": 1168,
      "y": 816,
      "w": 40,
      "h": 50,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_decor_2",
      "name": "Decor 2",
      "col": 31,
      "row": 26,
      "x": 1008,
      "y": 848,
      "w": 41,
      "h": 38,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_box_1",
      "name": "Box 1",
      "col": 9,
      "row": 22,
      "x": 304,
      "y": 720,
      "w": 20,
      "h": 22,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_box_5",
      "name": "Box 5",
      "col": 9,
      "row": 23,
      "x": 304,
      "y": 752,
      "w": 18,
      "h": 25,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_box_5",
      "name": "Box 5",
      "col": 33,
      "row": 26,
      "x": 1072,
      "y": 848,
      "w": 18,
      "h": 25,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_box_5",
      "name": "Box 5",
      "col": 7,
      "row": 11,
      "x": 240,
      "y": 368,
      "w": 18,
      "h": 25,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_fence_41",
      "name": "Fence 41",
      "col": 39,
      "row": 3,
      "x": 1264,
      "y": 112,
      "w": 32,
      "h": 32,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_fence_41",
      "name": "Fence 41",
      "col": 39,
      "row": 2,
      "x": 1264,
      "y": 80,
      "w": 32,
      "h": 32,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_fence_41",
      "name": "Fence 41",
      "col": 38,
      "row": 3,
      "x": 1232,
      "y": 112,
      "w": 32,
      "h": 32,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_fence_41",
      "name": "Fence 41",
      "col": 38,
      "row": 2,
      "x": 1232,
      "y": 80,
      "w": 32,
      "h": 32,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_supply_19",
      "name": "Supplies 19",
      "col": 7,
      "row": 13,
      "x": 240,
      "y": 432,
      "w": 59,
      "h": 67,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_supply_20",
      "name": "Supplies 20",
      "col": 9,
      "row": 13,
      "x": 304,
      "y": 432,
      "w": 45,
      "h": 56,
      "color": "#888888",
      "collidable": true,
      "info": ""
    },
    {
      "key": "obj_plant_38",
      "name": "Plants 38",
      "col": 5,
      "row": 3,
      "x": 176,
      "y": 112,
      "w": 19,
      "h": 14,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_38",
      "name": "Plants 38",
      "col": 8,
      "row": 2,
      "x": 272,
      "y": 80,
      "w": 19,
      "h": 14,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_40",
      "name": "Plants 40",
      "col": 16,
      "row": 2,
      "x": 528,
      "y": 80,
      "w": 22,
      "h": 17,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_stone_1",
      "name": "Stone 1",
      "col": 44,
      "row": 2,
      "x": 1424,
      "y": 80,
      "w": 10,
      "h": 9,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_stone_4",
      "name": "Stone 4",
      "col": 45,
      "row": 5,
      "x": 1456,
      "y": 176,
      "w": 4,
      "h": 3,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_stone_4",
      "name": "Stone 4",
      "col": 35,
      "row": 1,
      "x": 1136,
      "y": 48,
      "w": 4,
      "h": 3,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_stone_5",
      "name": "Stone 5",
      "col": 2,
      "row": 2,
      "x": 80,
      "y": 80,
      "w": 9,
      "h": 8,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_stone_6",
      "name": "Stone 6",
      "col": 3,
      "row": 3,
      "x": 112,
      "y": 112,
      "w": 11,
      "h": 9,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 47,
      "row": 4,
      "x": 1520,
      "y": 144,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 47,
      "row": 5,
      "x": 1520,
      "y": 176,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 47,
      "row": 7,
      "x": 1520,
      "y": 240,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 47,
      "row": 8,
      "x": 1520,
      "y": 272,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 47,
      "row": 9,
      "x": 1520,
      "y": 304,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 47,
      "row": 10,
      "x": 1520,
      "y": 336,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 47,
      "row": 11,
      "x": 1520,
      "y": 368,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 47,
      "row": 12,
      "x": 1520,
      "y": 400,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 47,
      "row": 13,
      "x": 1520,
      "y": 432,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 47,
      "row": 14,
      "x": 1520,
      "y": 464,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 47,
      "row": 15,
      "x": 1520,
      "y": 496,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 47,
      "row": 16,
      "x": 1520,
      "y": 528,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 47,
      "row": 19,
      "x": 1520,
      "y": 624,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 47,
      "row": 20,
      "x": 1520,
      "y": 656,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 47,
      "row": 21,
      "x": 1520,
      "y": 688,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 47,
      "row": 22,
      "x": 1520,
      "y": 720,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 47,
      "row": 23,
      "x": 1520,
      "y": 752,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 47,
      "row": 24,
      "x": 1520,
      "y": 784,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 47,
      "row": 25,
      "x": 1520,
      "y": 816,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 47,
      "row": 26,
      "x": 1520,
      "y": 848,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 47,
      "row": 27,
      "x": 1520,
      "y": 880,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 47,
      "row": 28,
      "x": 1520,
      "y": 912,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 47,
      "row": 29,
      "x": 1520,
      "y": 944,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 47,
      "row": 30,
      "x": 1520,
      "y": 976,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 47,
      "row": 31,
      "x": 1520,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 46,
      "row": 31,
      "x": 1488,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 45,
      "row": 31,
      "x": 1456,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 44,
      "row": 31,
      "x": 1424,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 43,
      "row": 31,
      "x": 1392,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 42,
      "row": 31,
      "x": 1360,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 41,
      "row": 31,
      "x": 1328,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 40,
      "row": 31,
      "x": 1296,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 39,
      "row": 31,
      "x": 1264,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 38,
      "row": 31,
      "x": 1232,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 37,
      "row": 31,
      "x": 1200,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 36,
      "row": 31,
      "x": 1168,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 35,
      "row": 31,
      "x": 1136,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 34,
      "row": 31,
      "x": 1104,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 33,
      "row": 31,
      "x": 1072,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 32,
      "row": 31,
      "x": 1040,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 31,
      "row": 31,
      "x": 1008,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 30,
      "row": 31,
      "x": 976,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 29,
      "row": 31,
      "x": 944,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 27,
      "row": 31,
      "x": 880,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 28,
      "row": 31,
      "x": 912,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 26,
      "row": 31,
      "x": 848,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 25,
      "row": 31,
      "x": 816,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 24,
      "row": 31,
      "x": 784,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 23,
      "row": 31,
      "x": 752,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 22,
      "row": 31,
      "x": 720,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 20,
      "row": 31,
      "x": 656,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 21,
      "row": 31,
      "x": 688,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 19,
      "row": 31,
      "x": 624,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 18,
      "row": 31,
      "x": 592,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 17,
      "row": 31,
      "x": 560,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 16,
      "row": 31,
      "x": 528,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 15,
      "row": 31,
      "x": 496,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 14,
      "row": 31,
      "x": 464,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 13,
      "row": 31,
      "x": 432,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 12,
      "row": 31,
      "x": 400,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 10,
      "row": 31,
      "x": 336,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 11,
      "row": 31,
      "x": 368,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 9,
      "row": 31,
      "x": 304,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 8,
      "row": 31,
      "x": 272,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 7,
      "row": 31,
      "x": 240,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 6,
      "row": 31,
      "x": 208,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 5,
      "row": 31,
      "x": 176,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 4,
      "row": 31,
      "x": 144,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 3,
      "row": 31,
      "x": 112,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 2,
      "row": 31,
      "x": 80,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 1,
      "row": 31,
      "x": 48,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 0,
      "row": 31,
      "x": 16,
      "y": 1008,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 0,
      "row": 30,
      "x": 16,
      "y": 976,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 0,
      "row": 29,
      "x": 16,
      "y": 944,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 0,
      "row": 28,
      "x": 16,
      "y": 912,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 0,
      "row": 27,
      "x": 16,
      "y": 880,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 0,
      "row": 26,
      "x": 16,
      "y": 848,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 0,
      "row": 25,
      "x": 16,
      "y": 816,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 0,
      "row": 24,
      "x": 16,
      "y": 784,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 0,
      "row": 23,
      "x": 16,
      "y": 752,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 0,
      "row": 22,
      "x": 16,
      "y": 720,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 0,
      "row": 21,
      "x": 16,
      "y": 688,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 0,
      "row": 20,
      "x": 16,
      "y": 656,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 0,
      "row": 19,
      "x": 16,
      "y": 624,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 0,
      "row": 16,
      "x": 16,
      "y": 528,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 0,
      "row": 15,
      "x": 16,
      "y": 496,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 0,
      "row": 14,
      "x": 16,
      "y": 464,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 0,
      "row": 12,
      "x": 16,
      "y": 400,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 0,
      "row": 11,
      "x": 16,
      "y": 368,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 0,
      "row": 10,
      "x": 16,
      "y": 336,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 0,
      "row": 9,
      "x": 16,
      "y": 304,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 0,
      "row": 8,
      "x": 16,
      "y": 272,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 0,
      "row": 7,
      "x": 16,
      "y": 240,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 0,
      "row": 6,
      "x": 16,
      "y": 208,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 0,
      "row": 5,
      "x": 16,
      "y": 176,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_34",
      "name": "Plants 34",
      "col": 0,
      "row": 4,
      "x": 16,
      "y": 144,
      "w": 35,
      "h": 47,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_84",
      "name": "Plants 84",
      "col": 40,
      "row": 24,
      "x": 1296,
      "y": 784,
      "w": 16,
      "h": 20,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_84",
      "name": "Plants 84",
      "col": 41,
      "row": 24,
      "x": 1328,
      "y": 784,
      "w": 16,
      "h": 20,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_84",
      "name": "Plants 84",
      "col": 42,
      "row": 24,
      "x": 1360,
      "y": 784,
      "w": 16,
      "h": 20,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_84",
      "name": "Plants 84",
      "col": 43,
      "row": 24,
      "x": 1392,
      "y": 784,
      "w": 16,
      "h": 20,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_84",
      "name": "Plants 84",
      "col": 44,
      "row": 24,
      "x": 1424,
      "y": 784,
      "w": 16,
      "h": 20,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_84",
      "name": "Plants 84",
      "col": 45,
      "row": 24,
      "x": 1456,
      "y": 784,
      "w": 16,
      "h": 20,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_84",
      "name": "Plants 84",
      "col": 39,
      "row": 24,
      "x": 1264,
      "y": 784,
      "w": 16,
      "h": 20,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_84",
      "name": "Plants 84",
      "col": 39,
      "row": 26,
      "x": 1264,
      "y": 848,
      "w": 16,
      "h": 20,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_84",
      "name": "Plants 84",
      "col": 40,
      "row": 26,
      "x": 1296,
      "y": 848,
      "w": 16,
      "h": 20,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_84",
      "name": "Plants 84",
      "col": 42,
      "row": 25,
      "x": 1360,
      "y": 816,
      "w": 16,
      "h": 20,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_84",
      "name": "Plants 84",
      "col": 39,
      "row": 25,
      "x": 1264,
      "y": 816,
      "w": 16,
      "h": 20,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_84",
      "name": "Plants 84",
      "col": 40,
      "row": 25,
      "x": 1296,
      "y": 816,
      "w": 16,
      "h": 20,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_84",
      "name": "Plants 84",
      "col": 41,
      "row": 25,
      "x": 1328,
      "y": 816,
      "w": 16,
      "h": 20,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_84",
      "name": "Plants 84",
      "col": 43,
      "row": 25,
      "x": 1392,
      "y": 816,
      "w": 16,
      "h": 20,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_84",
      "name": "Plants 84",
      "col": 44,
      "row": 25,
      "x": 1424,
      "y": 816,
      "w": 16,
      "h": 20,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_84",
      "name": "Plants 84",
      "col": 45,
      "row": 25,
      "x": 1456,
      "y": 816,
      "w": 16,
      "h": 20,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_84",
      "name": "Plants 84",
      "col": 45,
      "row": 26,
      "x": 1456,
      "y": 848,
      "w": 16,
      "h": 20,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_84",
      "name": "Plants 84",
      "col": 44,
      "row": 26,
      "x": 1424,
      "y": 848,
      "w": 16,
      "h": 20,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_84",
      "name": "Plants 84",
      "col": 43,
      "row": 26,
      "x": 1392,
      "y": 848,
      "w": 16,
      "h": 20,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_84",
      "name": "Plants 84",
      "col": 42,
      "row": 26,
      "x": 1360,
      "y": 848,
      "w": 16,
      "h": 20,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_84",
      "name": "Plants 84",
      "col": 41,
      "row": 26,
      "x": 1328,
      "y": 848,
      "w": 16,
      "h": 20,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_84",
      "name": "Plants 84",
      "col": 39,
      "row": 27,
      "x": 1264,
      "y": 880,
      "w": 16,
      "h": 20,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_84",
      "name": "Plants 84",
      "col": 40,
      "row": 27,
      "x": 1296,
      "y": 880,
      "w": 16,
      "h": 20,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_84",
      "name": "Plants 84",
      "col": 41,
      "row": 27,
      "x": 1328,
      "y": 880,
      "w": 16,
      "h": 20,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_84",
      "name": "Plants 84",
      "col": 42,
      "row": 27,
      "x": 1360,
      "y": 880,
      "w": 16,
      "h": 20,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_84",
      "name": "Plants 84",
      "col": 43,
      "row": 27,
      "x": 1392,
      "y": 880,
      "w": 16,
      "h": 20,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_84",
      "name": "Plants 84",
      "col": 45,
      "row": 27,
      "x": 1456,
      "y": 880,
      "w": 16,
      "h": 20,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_84",
      "name": "Plants 84",
      "col": 44,
      "row": 27,
      "x": 1424,
      "y": 880,
      "w": 16,
      "h": 20,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_102",
      "name": "Plants 102",
      "col": 39,
      "row": 28,
      "x": 1264,
      "y": 912,
      "w": 11,
      "h": 8,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_102",
      "name": "Plants 102",
      "col": 40,
      "row": 28,
      "x": 1296,
      "y": 912,
      "w": 11,
      "h": 8,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_102",
      "name": "Plants 102",
      "col": 41,
      "row": 28,
      "x": 1328,
      "y": 912,
      "w": 11,
      "h": 8,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_102",
      "name": "Plants 102",
      "col": 42,
      "row": 28,
      "x": 1360,
      "y": 912,
      "w": 11,
      "h": 8,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_102",
      "name": "Plants 102",
      "col": 43,
      "row": 28,
      "x": 1392,
      "y": 912,
      "w": 11,
      "h": 8,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_102",
      "name": "Plants 102",
      "col": 44,
      "row": 28,
      "x": 1424,
      "y": 912,
      "w": 11,
      "h": 8,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_102",
      "name": "Plants 102",
      "col": 45,
      "row": 28,
      "x": 1456,
      "y": 912,
      "w": 11,
      "h": 8,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_102",
      "name": "Plants 102",
      "col": 45,
      "row": 29,
      "x": 1456,
      "y": 944,
      "w": 11,
      "h": 8,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_102",
      "name": "Plants 102",
      "col": 44,
      "row": 29,
      "x": 1424,
      "y": 944,
      "w": 11,
      "h": 8,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_102",
      "name": "Plants 102",
      "col": 43,
      "row": 29,
      "x": 1392,
      "y": 944,
      "w": 11,
      "h": 8,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_102",
      "name": "Plants 102",
      "col": 41,
      "row": 29,
      "x": 1328,
      "y": 944,
      "w": 11,
      "h": 8,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_102",
      "name": "Plants 102",
      "col": 40,
      "row": 29,
      "x": 1296,
      "y": 944,
      "w": 11,
      "h": 8,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_102",
      "name": "Plants 102",
      "col": 39,
      "row": 29,
      "x": 1264,
      "y": 944,
      "w": 11,
      "h": 8,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_plant_102",
      "name": "Plants 102",
      "col": 42,
      "row": 29,
      "x": 1360,
      "y": 944,
      "w": 11,
      "h": 8,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_decor_8",
      "name": "Decor 8",
      "col": 32,
      "row": 28,
      "x": 1040,
      "y": 912,
      "w": 28,
      "h": 42,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_decor_13",
      "name": "Decor 13",
      "col": 38,
      "row": 22,
      "x": 1232,
      "y": 720,
      "w": 43,
      "h": 54,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_decor_4",
      "name": "Decor 4",
      "col": 35,
      "row": 26,
      "x": 1136,
      "y": 848,
      "w": 40,
      "h": 20,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_decor_5",
      "name": "Decor 5",
      "col": 37,
      "row": 26,
      "x": 1200,
      "y": 848,
      "w": 50,
      "h": 30,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_3",
      "name": "Shadow 3",
      "col": 6,
      "row": 8,
      "x": 208,
      "y": 272,
      "w": 30,
      "h": 26,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_3",
      "name": "Shadow 3",
      "col": 7,
      "row": 8,
      "x": 240,
      "y": 272,
      "w": 30,
      "h": 26,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_3",
      "name": "Shadow 3",
      "col": 6,
      "row": 9,
      "x": 208,
      "y": 304,
      "w": 30,
      "h": 26,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_1",
      "name": "Shadow 1",
      "col": 11,
      "row": 13,
      "x": 368,
      "y": 432,
      "w": 20,
      "h": 21,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_1",
      "name": "Shadow 1",
      "col": 10,
      "row": 13,
      "x": 336,
      "y": 432,
      "w": 20,
      "h": 21,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_3",
      "name": "Shadow 3",
      "col": 10,
      "row": 14,
      "x": 336,
      "y": 464,
      "w": 30,
      "h": 26,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_3",
      "name": "Shadow 3",
      "col": 35,
      "row": 9,
      "x": 1136,
      "y": 304,
      "w": 30,
      "h": 26,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_3",
      "name": "Shadow 3",
      "col": 36,
      "row": 9,
      "x": 1168,
      "y": 304,
      "w": 30,
      "h": 26,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_4",
      "name": "Shadow 4",
      "col": 35,
      "row": 10,
      "x": 1136,
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
      "col": 40,
      "row": 13,
      "x": 1296,
      "y": 432,
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
      "row": 14,
      "x": 1328,
      "y": 464,
      "w": 44,
      "h": 37,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_5",
      "name": "Shadow 5",
      "col": 37,
      "row": 19,
      "x": 1200,
      "y": 624,
      "w": 55,
      "h": 44,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_5",
      "name": "Shadow 5",
      "col": 38,
      "row": 19,
      "x": 1232,
      "y": 624,
      "w": 55,
      "h": 44,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_5",
      "name": "Shadow 5",
      "col": 30,
      "row": 23,
      "x": 976,
      "y": 752,
      "w": 55,
      "h": 44,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_5",
      "name": "Shadow 5",
      "col": 31,
      "row": 23,
      "x": 1008,
      "y": 752,
      "w": 55,
      "h": 44,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_5",
      "name": "Shadow 5",
      "col": 30,
      "row": 24,
      "x": 976,
      "y": 784,
      "w": 55,
      "h": 44,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_1",
      "name": "Shadow 1",
      "col": 27,
      "row": 8,
      "x": 880,
      "y": 272,
      "w": 20,
      "h": 21,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_1",
      "name": "Shadow 1",
      "col": 27,
      "row": 9,
      "x": 880,
      "y": 304,
      "w": 20,
      "h": 21,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_1",
      "name": "Shadow 1",
      "col": 28,
      "row": 9,
      "x": 912,
      "y": 304,
      "w": 20,
      "h": 21,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_1",
      "name": "Shadow 1",
      "col": 28,
      "row": 9,
      "x": 912,
      "y": 304,
      "w": 20,
      "h": 21,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_1",
      "name": "Shadow 1",
      "col": 29,
      "row": 9,
      "x": 944,
      "y": 304,
      "w": 20,
      "h": 21,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_1",
      "name": "Shadow 1",
      "col": 29,
      "row": 8,
      "x": 944,
      "y": 272,
      "w": 20,
      "h": 21,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_1",
      "name": "Shadow 1",
      "col": 29,
      "row": 7,
      "x": 944,
      "y": 240,
      "w": 20,
      "h": 21,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_1",
      "name": "Shadow 1",
      "col": 27,
      "row": 7,
      "x": 880,
      "y": 240,
      "w": 20,
      "h": 21,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_1",
      "name": "Shadow 1",
      "col": 28,
      "row": 7,
      "x": 912,
      "y": 240,
      "w": 20,
      "h": 21,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_2",
      "name": "Shadow 2",
      "col": 6,
      "row": 20,
      "x": 208,
      "y": 656,
      "w": 29,
      "h": 25,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_2",
      "name": "Shadow 2",
      "col": 7,
      "row": 20,
      "x": 240,
      "y": 656,
      "w": 29,
      "h": 25,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_2",
      "name": "Shadow 2",
      "col": 6,
      "row": 21,
      "x": 208,
      "y": 688,
      "w": 29,
      "h": 25,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_2",
      "name": "Shadow 2",
      "col": 14,
      "row": 26,
      "x": 464,
      "y": 848,
      "w": 29,
      "h": 25,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_2",
      "name": "Shadow 2",
      "col": 15,
      "row": 26,
      "x": 496,
      "y": 848,
      "w": 29,
      "h": 25,
      "color": "#888888",
      "collidable": false,
      "info": ""
    },
    {
      "key": "obj_shadow_2",
      "name": "Shadow 2",
      "col": 14,
      "row": 27,
      "x": 464,
      "y": 880,
      "w": 29,
      "h": 25,
      "color": "#888888",
      "collidable": false,
      "info": ""
    }
  ]
};

// The 5 "river life" objects Hiraya needs to find are placed in the editor
// like any other object, just with these specific keys so this scene can
// pick them out of CHAPTER1_MAP_DATA.objects and wire up the find/interact
// logic below. Everything else in .objects is treated as non-interactive
// scenery (plants, fences, boxes, shadows, etc).
const CHAPTER1_QUEST_KEYS = ['boat', 'goods', 'agoho', 'house', 'stall'];

// Real art for the 5 river-life objects above (see preload() - loaded
// separately since CHAPTER1_QUEST_KEYS is excluded from the generic
// object loader). Sizes keep each icon's native aspect ratio, scaled
// down from their source canvas to roughly the footprint the old
// placeholder box used.
const CHAPTER1_QUEST_ICONS = {
  boat: { key: 'quest_boat', w: 108, h: 112 },
  goods: { key: 'quest_goods', w: 98, h: 112 },
  agoho: { key: 'quest_agoho', w: 106, h: 112 },
  house: { key: 'quest_house', w: 100, h: 112 },
  stall: { key: 'quest_trading_stall', w: 100, h: 112 }
};

// Same procedural tile painters mapLoader.js uses for the built-in tile
// types (grass/tree/water/path/sand/wall) - reused here so a tile type
// with no `imageKey` (e.g. this map's "wall") still gets real texture
// instead of a flat color fill, exactly like the editor's own preview does.
const CHAPTER1_BUILTIN_DRAWERS = {
  grass: drawGrass, tree: drawTree, water: drawWater,
  path: drawPath, sand: drawSand, wall: drawWall
};

// ---------------------------------------------------------------------------
// Asset-path resolvers - mirror editor.html's TILE_LIBRARY / OBJECT_LIBRARY
// naming so any tile/object key coming out of the map editor resolves to
// the right file under assets/src automatically, without needing a manual
// key->path table kept in sync by hand.
// ---------------------------------------------------------------------------
const CHAPTER1_TILE_KEY_SPECS = {
  fieldsTile: { dir: 'assets/src/1 Tiles', file: 'FieldsTile' },
  groundPath: { dir: 'assets/src/11 Ground Paths', file: 'GroundPath' },
  grassPathBlend: { dir: 'assets/src/12 Grass Path Blends', file: 'GrassPathBlend' },
  pathGrassBlend2: { dir: 'assets/src/13 Path Grass Blends 2', file: 'PathGrassBlend2' },
  specialGround: { dir: 'assets/src/14 Special Ground Patterns', file: 'SpecialGround' }
};
function resolveChapter1TileImagePath(key) {
  const m = key.match(/^(.+)_(\d+)$/);
  if (!m) return null;
  const spec = CHAPTER1_TILE_KEY_SPECS[m[1]];
  if (!spec) return null;
  return `${spec.dir}/${spec.file}_${m[2]}.png`;
}

const CHAPTER1_OBJECT_FOLDER_SPECS = {
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
function resolveChapter1ObjectImagePath(key) {
  if (key === 'obj_towerspot1') return 'assets/src/2 Objects/PlaceForTower1.png';
  if (key === 'obj_towerspot2') return 'assets/src/2 Objects/PlaceForTower2.png';
  const fenceMatch = key.match(/^obj_fence_(\d+)$/);
  if (fenceMatch) return `assets/src/1.1 Tiles/Tile2_${fenceMatch[1]}.png`;
  const m = key.match(/^obj_([a-z0-9]+)_(\d+)$/);
  if (!m) return null;
  const spec = CHAPTER1_OBJECT_FOLDER_SPECS[m[1]];
  if (!spec) return null;
  return `${spec.base}/${spec.folder}/${m[2]}.png`;
}

function chapter1HexToInt(css, fallback) {
  if (!css) return fallback;
  const n = parseInt(css.replace('#', ''), 16);
  return Number.isNaN(n) ? fallback : n;
}

// Builds the tileTypes config loadMap() expects (see mapLoader.js) straight
// out of CHAPTER1_MAP_DATA.tileTypes: real art where an imageKey is given,
// the matching procedural painter otherwise.
function buildChapter1TileTypes(mapData) {
  const cfg = {};
  Object.entries(mapData.tileTypes).forEach(([id, t]) => {
    cfg[id] = {
      name: t.name,
      color: chapter1HexToInt(t.color, 0x888888),
      solid: !!t.solid,
      imageKey: t.imageKey || undefined,
      noFlipY: true, // real art tiles (and hand-painted trees) shouldn't mirror
      draw: t.imageKey ? undefined : CHAPTER1_BUILTIN_DRAWERS[t.name]
    };
  });
  return cfg;
}

class Chapter1Scene extends Phaser.Scene {
  constructor() {
    super('Chapter1');
  }

  preload() {
    // Everything the riverside needs is derived straight from
    // CHAPTER1_MAP_DATA: load each tile type's image (if it has one) and
    // each placed object's image (if its key resolves to one under
    // assets/src). Quest keys (boat/goods/agoho/house/stall) aren't
    // covered by that generic resolver, so their icons are loaded
    // explicitly below (see CHAPTER1_QUEST_ICONS).
    this.load.image('quest_boat', 'assets/icons/ch1-boat.png');
    this.load.image('quest_goods', 'assets/icons/ch1-goods.png');
    this.load.image('quest_agoho', 'assets/icons/ch1-agoho-tree.png');
    this.load.image('quest_house', 'assets/icons/ch1-house.png');
    this.load.image('quest_trading_stall', 'assets/icons/ch1-trading-stall.png');

    Object.values(CHAPTER1_MAP_DATA.tileTypes).forEach(t => {
      if (t.imageKey) {
        const path = resolveChapter1TileImagePath(t.imageKey);
        if (path) this.load.image(t.imageKey, path);
        else console.warn('Chapter1Scene: no path resolver for tile image key', t.imageKey);
      }
    });

    const loadedObjectKeys = new Set();
    CHAPTER1_MAP_DATA.objects.forEach(o => {
      if (CHAPTER1_QUEST_KEYS.includes(o.key)) return; // no art for these, by design
      if (loadedObjectKeys.has(o.key)) return;
      const path = resolveChapter1ObjectImagePath(o.key);
      if (path) {
        this.load.image(o.key, path);
        loadedObjectKeys.add(o.key);
      } else {
        console.warn('Chapter1Scene: no path resolver for object key', o.key);
      }
    });
  }

  create() {
    SoundManager.playMusic(this, 'bg-game');
    const { width, height } = this.scale;
    const character = 'hiraya';
    const textureKey = character + '-sheet';
    this.prefix = character;
    this.speed = this.registry.get('playerSpeed') || 160;
    this.locked = false; // true during dialogue / popup / quiz - movement disabled
    this.mode = 'intro'; // intro -> explore -> quiz -> done

    // --- riverside map (loaded from the editor's exported JSON, see
    //     CHAPTER1_MAP_DATA above) ---
    this.map = loadMap(this, CHAPTER1_MAP_DATA.tiles, {
      tileTypes: buildChapter1TileTypes(CHAPTER1_MAP_DATA)
    });

// --- player ---
     this.createPlayerAnims(textureKey);
     const startX = CHAPTER1_MAP_DATA.spawn.x;
     const startY = CHAPTER1_MAP_DATA.spawn.y;
     this.player = this.physics.add.sprite(startX, startY, textureKey, 0);
     this.player.setCollideWorldBounds(true);
     this.player.setSize(C1_FRAME_W * 0.5, C1_FRAME_H * 0.35);
     this.player.setOffset(C1_FRAME_W * 0.25, C1_FRAME_H * 0.6);
     this.player.facing = 'down';
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

// --- Lola Nena --- (frame 0 of lola-sheet = down-facing idle, same convention
     // GameScene/Chapter1Scene use for a stationary player: static frame, no anim needed)
     this.lola = this.add.sprite(startX - 60, startY, 'lola-sheet', 0);
     // Static collision body sized to almost the whole sprite (not just the
     // feet) so the player can't walk into/overlap Lola from any side - top,
     // bottom, or left/right. NOTE: Phaser's setSize(w, h, center) only takes
     // 3 params - passing a 4th offset value here used to silently do
     // nothing, and the truthy 3rd value made it auto-center the box in the
     // middle of the sprite instead, which is why the player used to be able
     // to walk in as far as her waist/chest before colliding. setOffset()
     // must be called separately, after setSize(..., false) disables the
     // auto-centering.
     this.physics.add.existing(this.lola, true);
     this.lola.body.setSize(C1_FRAME_W * 0.6, C1_FRAME_H * 0.85, false);
     this.lola.body.setOffset(C1_FRAME_W * 0.2, C1_FRAME_H * 0.08);
     this.physics.add.collider(this.player, this.lola);
     // Ensure Lola renders below player
     this.lola.setDepth(0);
    this.lolaPrompt = this.add.text(this.lola.x, this.lola.y - 90, '', {
      fontFamily: 'sans-serif', fontSize: 13, color: '#fff8e7', backgroundColor: '#000000aa',
      padding: { x: 6, y: 3 }
    }).setOrigin(0.5).setVisible(false);
    // Generic "near a river-life object" hint - repositioned each frame
    // above whichever quest object (boat/goods/agoho/house/stall) the
    // player is closest to.
    this.interactPrompt = this.add.text(0, 0, 'Press E to interact', {
      fontFamily: 'sans-serif', fontSize: 13, color: '#fff8e7', backgroundColor: '#000000aa',
      padding: { x: 6, y: 3 }
    }).setOrigin(0.5).setVisible(false).setDepth(100000);
    this.returnFlag = this.add.text(this.lola.x, this.lola.y - 60, '❗', { fontSize: 26 })
      .setOrigin(0.5).setVisible(false);

    // --- 5 river-life interactables to find ---
    // Pulled from CHAPTER1_MAP_DATA.objects by key, so position/color/info
    // all come straight from what was placed in the map editor.
    this.objects = CHAPTER1_MAP_DATA.objects
      .filter(o => CHAPTER1_QUEST_KEYS.includes(o.key))
      .map(o => ({
        key: o.key,
        name: o.name,
        x: o.x,
        y: o.y,
        color: chapter1HexToInt(o.color, 0x888888),
        info: o.info
      }));

    // These 5 river-life objects are solid (like a fence or a crate) rather
    // than walk-over-able map decoration, so each gets a static physics
    // body - same technique as the decorObstacles below. Their name labels
    // have been removed in favor of a "Press E to interact" prompt (see
    // this.interactPrompt / update()) shown only while the player is near.
    this.questObstacles = [];
    this.objectSprites = this.objects.map(o => {
      const icon = CHAPTER1_QUEST_ICONS[o.key];
      const hasIcon = icon && this.textures.exists(icon.key);
      const rect = hasIcon
        ? this.add.image(o.x, o.y, icon.key).setDisplaySize(icon.w, icon.h).setDepth(o.y)
        : this.add.rectangle(o.x, o.y, 46, 46, o.color).setStrokeStyle(2, 0xf5e2c8).setDepth(o.y);
      this.physics.add.existing(rect, true);
      this.questObstacles.push(rect);
      const check = this.add.text(o.x, o.y, '✓', {
        fontFamily: 'sans-serif', fontSize: 22, color: '#3c7a3e', fontStyle: 'bold'
      }).setOrigin(0.5).setVisible(false).setDepth(o.y + 1);
      o.found = false;
      o.rect = rect;
      o.check = check;
      o.promptY = o.y - (icon ? icon.h / 2 : 23) - 12; // just above the icon's top edge
      return { rect, check };
    });
    this.physics.add.collider(this.player, this.questObstacles);

    // --- decorative scenery (plants, fences, boxes, shadows, stalls, etc.) ---
    // Everything in CHAPTER1_MAP_DATA.objects that isn't a quest item above:
    // purely visual, except collidable ones also get a static physics body
    // so the player can't just walk through a fence or a crate.
    this.decorObstacles = [];
    CHAPTER1_MAP_DATA.objects
      .filter(o => !CHAPTER1_QUEST_KEYS.includes(o.key))
      .forEach(o => {
        const hasImage = this.textures.exists(o.key);
        let vis;
        if (hasImage) {
          vis = this.add.image(o.x, o.y, o.key).setDisplaySize(o.w, o.h);
        } else {
          vis = this.add.rectangle(o.x, o.y, o.w, o.h, chapter1HexToInt(o.color, 0x888888));
        }
        vis.setDepth(o.y);
        if (o.collidable) {
          this.physics.add.existing(vis, true);
          this.decorObstacles.push(vis);
        }
      });
    this.physics.add.collider(this.player, this.decorObstacles);

    // 6th task - not a findable object, just walking back to report to Lola
    // once the 5 above are all found. See getTaskList().
    this.reportDone = false;

    // --- HUD --- (scrollFactor 0 so it stays pinned to the screen instead
    // of scrolling away with the map now that the camera follows the player)
    const displayName = character.charAt(0).toUpperCase() + character.slice(1);
    this.add.text(14, 12, displayName, {
      fontFamily: 'Georgia, serif', fontSize: 18, color: '#fff8e7'
    }).setShadow(1, 1, '#000000aa', 2, true, true).setScrollFactor(0).setDepth(900);

    this.add.text(width / 2, 16, 'Chapter 1: Aguho — The River Remembers', {
      fontFamily: 'Georgia, serif', fontSize: 16, color: '#f5e2c8'
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(900);

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
      showDialogue(this, 'Lola Nena', [
        'Long before the Pateros you know today, this place was called Aguho.',
        'The river was part of everyday life.',
        'People came here to trade, travel, and exchange goods.',
        'Go on — walk around and find what remains of that old river life. Come back when you have.'
      ], () => {
        this.locked = false;
        this.mode = 'explore';
        // Lola's task has now actually been given - reveal the Task button.
        this.taskBtnRect.setVisible(true);
        this.taskBtnTxt.setVisible(true);
      }, ['lola-wave', 'lola-happy', 'lola-happy', 'lola-wink']);
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

  // Full task list for the HUD counter / objectives modal: the 5 findable
  // objects, plus a 6th "Report to Lola Nena" task that only appears once
  // all 5 have been found (goes 5/5 -> 5/6, then 6/6 once you talk to her).
  getTaskList() {
    const list = this.objects.map(o => ({ name: o.name, found: o.found, info: o.info, type: 'item' }));
    if (this.objects.every(o => o.found)) {
      list.push({
        name: 'Report to Lola Nena',
        found: this.reportDone,
        info: 'Walk back to Lola Nena and press E to tell her what you found.',
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

  // --- Objectives modal: what to find, x1 each, highlighted once found ----
  // Hovering a row that's already found pops up the info line learned from it.
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
    const allObjectsFound = this.objects.every(o => o.found);
    const subtitle = this.add.text(width / 2, top + 50,
      allObjectsFound ? 'All found — now report back to Lola:' : 'Find these around the riverside:', {
      fontFamily: 'sans-serif', fontSize: 13, color: '#6b4a2f'
    }).setOrigin(0.5);
    const hint = this.add.text(width / 2, top + 70, 'Hover a found item to see what you learned', {
      fontFamily: 'sans-serif', fontSize: 11, color: '#9aa0aa', fontStyle: 'italic'
    }).setOrigin(0.5);

    container.add([overlay, panel, title, subtitle, hint]);

    // Shared tooltip element - one instance, repositioned/retexted per hover.
    const tooltipTxt = this.add.text(width / 2, top + headerH + tasks.length * rowH + 14, '', {
      fontFamily: 'sans-serif', fontSize: 12, color: '#3b2410', align: 'center',
      wordWrap: { width: 330 }
    }).setOrigin(0.5, 0).setVisible(false);
    container.add(tooltipTxt);

    tasks.forEach((o, i) => {
      const y = top + headerH + i * rowH;
      const found = o.found;
      const mark = this.add.text(width / 2 - 150, y, found ? '✓' : '—', {
        fontFamily: 'sans-serif', fontSize: 16, fontStyle: 'bold',
        color: found ? '#3c7a3e' : '#9aa0aa'
      }).setOrigin(0, 0.5);
      const label = this.add.text(width / 2 - 122, y, o.type === 'task' ? o.name : `${o.name} x1`, {
        fontFamily: 'sans-serif', fontSize: 15,
        color: found ? '#3c7a3e' : '#3b2410'
      }).setOrigin(0, 0.5);
      const status = this.add.text(width / 2 + 150, y, found
        ? (o.type === 'task' ? 'Done' : 'Found')
        : (o.type === 'task' ? 'Go talk to her' : 'Not found'), {
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
          tooltipTxt.setText(o.info).setVisible(true);
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

    const dLola = Phaser.Math.Distance.Between(p.x, p.y, this.lola.x, this.lola.y);
    if (dLola < bestDist) { best = { type: 'lola' }; bestDist = dLola; }

    this.objects.forEach(o => {
      if (o.found) return;
      const d = Phaser.Math.Distance.Between(p.x, p.y, o.x, o.y);
      if (d < bestDist) { best = { type: 'object', obj: o }; bestDist = d; }
    });

    return best;
  }

  talkToLola() {
    const allFound = this.objects.every(o => o.found);
    if (!allFound) {
      this.locked = true;
      showDialogue(this, 'Lola Nena', [
        `You've found ${this.objects.filter(o => o.found).length} of 5 so far.`,
        'Keep looking around the riverside.'
      ], () => { this.locked = false; }, ['lola-happy', 'lola-wave']);
      return;
    }

    this.locked = true;
    this.returnFlag.setVisible(false);
    this.reportDone = true;
    this.updateProgress();
    showDialogue(this, 'Lola Nena', [
      'You found them all — the boat, the goods, the agoho tree, the house, and the trading stall by the embarcadero.',
      'This place used to be called Aguho, named after those very agoho trees along the riverbank.',
      'Boats loaded and unloaded goods right there at the embarcadero — that was everyday life for the people here.',
      'Let\'s see what you remember.'
    ], () => this.startQuiz(), ['lola-happy', 'lola-happy', 'lola-happy', 'lola-wink']);
  }

  interactWithObject(o) {
    this.locked = true;
    showInfoPopup(this, o.name.toUpperCase(), o.info, () => {
      o.found = true;
      // setAlpha works on both the Image (real icon) and the Rectangle
      // (fallback if an icon ever fails to load) - setFillStyle only
      // exists on the latter, so it can't be used here anymore.
      o.rect.setAlpha(0.45);
      o.check.setVisible(true);
      this.updateProgress();
      this.locked = false;
      if (this.objects.every(x => x.found)) {
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
        q: 'What was Pateros historically called?',
        options: ['Aguho', 'Manila', 'Taguig', 'Makati'],
        correct: 0,
        explanation: 'Pateros was historically known as "Aguho," named after the agoho trees that once lined the riverside.'
      },
      {
        q: 'Agoho trees were associated with what?',
        options: ['The name "Aguho"', 'A type of boat', 'A Spanish general', 'The town fiesta'],
        correct: 0,
        explanation: 'The agoho trees growing along the river gave the area its old name, "Aguho."'
      },
      {
        q: 'What happened at the embarcadero?',
        options: ['Boats loaded and unloaded goods', 'Rice was planted', 'Church mass was held', 'Ducks were raised'],
        correct: 0,
        explanation: 'The embarcadero was the riverside landing point where boats loaded and unloaded goods for trade.'
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
     if (!pages.includes(1)) pages.push(1);
     this.registry.set('journalPages', pages);
     // Persist to localStorage so Chapter 2 shows up unlocked in the main
     // menu's Chapter list even after a page reload.
     ChapterProgress.unlockNextAfter('Chapter1');

    // A short wrap-up from Lola Nena before the reward panel, so the chapter
    // closes out like the rest of the conversation instead of cutting
    // straight to a modal the instant the last quiz question is answered.
    this.locked = true;
    showDialogue(this, 'Lola Nena', [
      'You really do understand Aguho now — the river, the trade, the community that grew up around it.',
      'Keep this page safe. There is more of the journal waiting for you.'
    ], () => this.showJournalReward(), ['lola-happy', 'lola-wink']);
  }

  showJournalReward() {
     const { width, height } = this.scale;
     const container = this.add.container(0, 0).setDepth(10500).setScrollFactor(0);
    const overlay = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.55).setInteractive().setScrollFactor(0);
    const panel = this.add.rectangle(width / 2, height / 2, 460, 240, 0xfff8e7, 1).setStrokeStyle(4, 0x9c3b2e);
    const title = this.add.text(width / 2, height / 2 - 80, 'Journal Page #1 Unlocked!', {
      fontFamily: 'Georgia, serif', fontSize: 22, color: '#9c3b2e', fontStyle: 'bold'
    }).setOrigin(0.5);
    const scoreTxt = this.add.text(width / 2, height / 2 - 34, `You remembered ${this.quizScore} / ${this.quizQuestions.length}.`, {
      fontFamily: 'sans-serif', fontSize: 16, color: '#3b2410'
    }).setOrigin(0.5);
    const flavor = this.add.text(width / 2, height / 2, 'Aguho: The River Remembers — recorded in the journal.', {
      fontFamily: 'sans-serif', fontSize: 14, color: '#6b4a2f', align: 'center', wordWrap: { width: 380 }
    }).setOrigin(0.5, 0);

    container.add([overlay, panel, title, scoreTxt, flavor]);

    const { rect, txt } = createButton(this, width / 2, height / 2 + 88, 'Continue', () => {
      // Curtain-close here (with its whoosh) pairs with Chapter2Scene's own
      // curtain-open on create(), so this reads as one continuous transition
      // - and, crucially, one you can actually hear - rather than a hard cut.
      curtainClose(this, () => this.scene.start('Chapter2'));
    }, { width: 160, height: 44, fontSize: 17, color: 0x3c7a3e, hoverColor: 0x4c9a4e });
    container.add([rect, txt]);
  }

  update() {
    // interaction prompt + key handling
    if (!this.locked && (this.mode === 'explore')) {
      const nearest = this.nearestInteractable();
      if (nearest && nearest.type === 'lola') {
        this.lolaPrompt.setText('Press E to talk').setVisible(true);
        this.interactPrompt.setVisible(false);
      } else if (nearest && nearest.type === 'object') {
        this.lolaPrompt.setVisible(false);
        this.interactPrompt.setPosition(nearest.obj.x, nearest.obj.promptY).setVisible(true);
      } else {
        this.lolaPrompt.setVisible(false);
        this.interactPrompt.setVisible(false);
      }

      if (Phaser.Input.Keyboard.JustDown(this.keys.interact) && nearest) {
        if (nearest.type === 'lola') this.talkToLola();
        else this.interactWithObject(nearest.obj);
      }
    } else {
      this.lolaPrompt.setVisible(false);
      this.interactPrompt.setVisible(false);
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