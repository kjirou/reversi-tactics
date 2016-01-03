import assert from 'assert';

import { REVERSI_PIECE_TYPES } from 'src/consts';
import SquareModel from 'src/models/SquareModel';


describe('src/models/SquareModel', () => {

  it('presentProps', () => {
    const square = new SquareModel({ position: [2, 3] });
    assert.deepEqual(square.presentProps(), {
      position: [2, 3],
      rowIndex: 2,
      columnIndex: 3,
      reversiPieceType: REVERSI_PIECE_TYPES.EMPTY,
      iconId: null,
    });
  });
});
