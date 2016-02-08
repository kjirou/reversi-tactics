import assert from 'assert';

import { ARMY_COLORS, REVERSI_PIECE_TYPES } from 'src/consts';
import {
  createClassBasedResourceList,
  getReversiPieceTypeFromArmyColor,
  measureDistance,
  toSignedNumber,
} from 'src/lib/utils';


describe('src/lib/utils', () => {

  it('toSignedNumber', () => {
    assert.strictEqual(toSignedNumber(1), '+1');
    assert.strictEqual(toSignedNumber(-1), '-1');
    assert.strictEqual(toSignedNumber(0), '0');
    assert.strictEqual(toSignedNumber(0, 'x'), 'x0');
  });

  it('createClassBasedResourceList', () => {
    class Item {}
    const itemList = createClassBasedResourceList(Item, [
      {
        constants: {
          label: 'Bomb',
        },
        properties: {
          damage: 10,
          price: 100,
        },
      },
      {},
    ]);

    assert(itemList[0].prototype instanceof Item);
    assert.strictEqual(itemList[0].label, 'Bomb');

    const item = new itemList[0];
    assert.strictEqual(item.damage, 10);
    assert.strictEqual(item.price, 100);

    new itemList[1]();  // should be created as a class
  });

  it('getReversiPieceTypeFromArmyColor', () => {
    assert.strictEqual(getReversiPieceTypeFromArmyColor(ARMY_COLORS.BLACK), REVERSI_PIECE_TYPES.BLACK);
    assert.strictEqual(getReversiPieceTypeFromArmyColor(ARMY_COLORS.WHITE), REVERSI_PIECE_TYPES.WHITE);
  });

  it('getArmyColorFromReversiPieceType', () => {
    assert.strictEqual(getReversiPieceTypeFromArmyColor(REVERSI_PIECE_TYPES.BLACK), ARMY_COLORS.BLACK);
    assert.strictEqual(getReversiPieceTypeFromArmyColor(REVERSI_PIECE_TYPES.WHITE), ARMY_COLORS.WHITE);
  });

  it('measureDistance', () => {
    assert.strictEqual(measureDistance([1, 2], [3, 6]), 3 - 1 + 6 - 2);
    assert.strictEqual(measureDistance([3, 6], [1, 2]), 3 - 1 + 6 - 2);
  });
});
