var path = require('path');


// For image-driver.js
var ICON_POSITIONS = [

  // characters
  ['characters', [0, 3], 'alchemist'],
  ['characters', [2, 2], 'bird_male'],
  ['characters', [2, 3], 'bird_female'],
  ['characters', [0, 4], 'cleric'],
  ['characters', [0, 0], 'fighter'],
  ['characters', [1, 1], 'healer'],
  ['characters', [1, 3], 'knight'],
  ['characters', [0, 1], 'mage'],
  ['characters', [0, 8], 'nerd'],
  ['characters', [0, 2], 'ranger'],
  ['characters', [0, 5], 'thief'],
  ['characters', [1, 5], 'vigilante'],

  // enemies
  ['enemies', [0, 1], 'bat'],
  ['enemies', [0, 7], 'dragon'],
  ['enemies', [2, 1], 'frog'],
  ['enemies', [0, 11], 'ghost'],
  ['enemies', [3, 13], 'goblin'],
  ['enemies', [1, 3], 'minotaur'],
  ['enemies', [3, 7], 'orc'],
  ['enemies', [0, 2], 'skeleton'],
  ['enemies', [1, 13], 'slime'],
  ['enemies', [0, 5], 'snake'],

  // icons
  ['icons', [1, 1], 'brain'],
  ['icons', [1, 5], 'crossed_swords'],
  ['icons', [1, 2], 'flash'],
  ['icons', [0, 14], 'happy'],
  ['icons', [0, 0], 'heart'],
  ['icons', [4, 15], 'invalid'],
  ['icons', [3, 0], 'running'],
  ['icons', [0, 13], 'unhappy'],

  // items
  ['items', [3, 12], 'armor'],
  ['items', [0, 6], 'arrow'],
  ['items', [1, 4], 'book'],
  ['items', [0, 5], 'bow'],
  ['items', [2, 15], 'broad_sword'],
  ['items', [0, 4], 'gold'],
  ['items', [1, 1], 'jewel'],
  ['items', [0, 10], 'jewel_box'],
  ['items', [2, 14], 'katana'],
  ['items', [0, 14], 'key'],
  ['items', [4, 12], 'lantern'],
  ['items', [1, 3], 'mail_armor'],
  ['items', [0, 2], 'shield'],
  ['items', [4, 11], 'torch'],
  ['items', [0, 1], 'sword'],

  // objects
  ['objects', [2, 7], 'chest'],
  ['objects', [0, 12], 'downstairs'],
  ['objects', [2, 9], 'horizontal_bridge'],
  ['objects', [0, 1], 'signboard'],
  ['objects', [0, 6], 'treasure_box'],
  ['objects', [0, 11], 'upstairs'],
  ['objects', [2, 8], 'vertical_bridge'],

  // tiles
  ['tiles', [8, 8], 'village']//,
];

var SOURCE_IMAGE_PATH =
  path.join(__dirname, '../../src/materials/images/denzi/Denzi140330-12-1--32x32.png');
var REVERSED_COLOR_SOURCE_IMAGE_PATH =
  path.join(__dirname, '../../src/materials/images/denzi/Denzi140330-12-1--32x32--reversed-color.png');

var ICON_DATA_LIST = [];
ICON_POSITIONS.forEach(function(iconPosition) {
  ICON_DATA_LIST.push([SOURCE_IMAGE_PATH].concat(iconPosition));
  ICON_DATA_LIST.push([
    REVERSED_COLOR_SOURCE_IMAGE_PATH,
    iconPosition[0],
    iconPosition[1],
    iconPosition[2] + '_reversed'
  ]);
});

var _iconIds = [];
var ICON_IDS = ICON_DATA_LIST.map(function(iconData) {
  var iconId = iconData[3];
  if (_iconIds.indexOf(iconId) > -1) {
    throw new Error(iconId + ' is duplicated icon-id');
  }
  _iconIds.push(iconId);
  return iconId;
});

module.exports = {
  ICON_DATA_LIST: ICON_DATA_LIST,
  ICON_IDS: ICON_IDS
};
