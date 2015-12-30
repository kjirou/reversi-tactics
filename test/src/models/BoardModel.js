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
});
