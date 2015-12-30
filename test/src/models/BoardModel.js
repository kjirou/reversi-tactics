import assert from 'assert';
import lodash from 'lodash';

import BoardModel from 'src/models/BoardModel';
import SquareModel from 'src/models/SquareModel';


describe('src/models/BoardModel', () => {

  it('_createSquares', () => {
    const squares = BoardModel._createSquares([2, 3]);
    assert.strictEqual(squares.length, 2);
    assert.strictEqual(squares[0].length, 3);
    lodash.flatten(squares).forEach(square => {
      assert(square instanceof SquareModel);
    });
  });

  it('presentProps', () => {
    const board = new BoardModel({ extent: [2, 3] });
    const props = board.presentProps();
    assert('squares' in props);
    assert.strictEqual(props.squares.length, 2);
    assert.strictEqual(props.squares[0].length, 3);
  });

  it('getSquare, ensureSquare', () => {
    const board = new BoardModel();

    assert(board.getSquare([0, 0]));
    assert(board.getSquare([7, 7]));
    assert.strictEqual(board.getSquare([-1, 0]), null);
    assert.strictEqual(board.getSquare([8, 0]), null);
    assert.strictEqual(board.getSquare([0, -1]), null);
    assert.strictEqual(board.getSquare([0, 8]), null);

    assert(board.ensureSquare([0, 0]));
    assert.throws(() => {
      board.ensureSquare([0, 8]);
    }, /Can not find/);
  });
});
