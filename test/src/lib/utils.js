import assert from 'assert';

import { ARMY_COLORS, REVERSI_PIECE_TYPES } from 'src/consts';
import {
  getArmyColorFromReversiPieceType,
  getReversiPieceTypeFromArmyColor,
  measureDistance,
} from 'src/lib/utils';


describe('src/lib/utils', () => {

  it('getReversiPieceTypeFromArmyColor', () => {
    assert.strictEqual(getReversiPieceTypeFromArmyColor(ARMY_COLORS.BLACK), REVERSI_PIECE_TYPES.BLACK);
    assert.strictEqual(getReversiPieceTypeFromArmyColor(ARMY_COLORS.WHITE), REVERSI_PIECE_TYPES.WHITE);
  });

  it('getArmyColorFromReversiPieceType', () => {
    assert.strictEqual(getArmyColorFromReversiPieceType(REVERSI_PIECE_TYPES.BLACK), ARMY_COLORS.BLACK);
    assert.strictEqual(getArmyColorFromReversiPieceType(REVERSI_PIECE_TYPES.WHITE), ARMY_COLORS.WHITE);
  });

  it('measureDistance', () => {
    assert.strictEqual(measureDistance([1, 2], [3, 6]), 3 - 1 + 6 - 2);
    assert.strictEqual(measureDistance([3, 6], [1, 2]), 3 - 1 + 6 - 2);
  });
});
