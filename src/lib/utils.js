import assert from 'assert';
import { values } from 'lodash';

import { ARMY_COLORS, REVERSI_PIECE_TYPES } from '../consts';


/*
 * @param {string} armyColor - One of ARMY_COLORS
 */
export const getReversiPieceTypeFromArmyColor = (armyColor) => {
  assert(values(ARMY_COLORS).indexOf(armyColor) !== -1, `${ armyColor } is not a one of ARMY_COLORS`);
  return {
    [ARMY_COLORS.BLACK]: REVERSI_PIECE_TYPES.BLACK,
    [ARMY_COLORS.WHITE]: REVERSI_PIECE_TYPES.WHITE,
  }[armyColor];
};

/*
 * @param {string} armyColor - One of ARMY_COLORS
 */
export const getArmyColorFromReversiPieceType = (reversiPieceType) => {
  assert(values(REVERSI_PIECE_TYPES).indexOf(reversiPieceType) !== -1,
    `${ reversiPieceType } is not a one of ARMY_COLORS`);
  return {
    [REVERSI_PIECE_TYPES.BLACK]: ARMY_COLORS.BLACK,
    [REVERSI_PIECE_TYPES.WHITE]: ARMY_COLORS.WHITE,
  }[reversiPieceType];
};

/*
 * @return {number} - The distance between two positions
 */
export const measureDistance = (positionA, positionB) => {
  return Math.abs(positionA[0] - positionB[0]) + Math.abs(positionA[1] - positionB[1]);
};
