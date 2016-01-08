import assert from 'assert';
import lodash from 'lodash';
import reversi from 'reversi';

import { REVERSI_PIECE_TYPES } from 'src/consts';
import BoardModel from 'src/models/BoardModel';
import SquareModel from 'src/models/SquareModel';


describe('src/models/BoardModel', () => {

  const boardToText = (board) => {
    return board._squares.map(rowSquares => {
      return rowSquares.map(square => {
        return {
          [REVERSI_PIECE_TYPES.EMPTY]: '-',
          [REVERSI_PIECE_TYPES.BLACK]: 'x',
          [REVERSI_PIECE_TYPES.WHITE]: 'o',
        }[square.reversiPieceType] || '';
      }).join('');
    }).join('\n');
  };


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

  it('_convertToReversiBoardPosition', () => {
    const board = new BoardModel();
    assert.deepEqual(board._convertToReversiBoardPosition([1, 2]), [1, 2]);
  });

  it('_convertToPosition', () => {
    const board = new BoardModel();
    assert.deepEqual(board._convertToPosition([1, 2]), [1, 2]);
  });

  it('_convertToReversiBoardPieceType', () => {
    const board = new BoardModel();
    assert.strictEqual(board._convertToReversiBoardPieceType(REVERSI_PIECE_TYPES.EMPTY), reversi.PIECE_TYPES.BLANK);
    assert.strictEqual(board._convertToReversiBoardPieceType(REVERSI_PIECE_TYPES.BLACK), reversi.PIECE_TYPES.BLACK);
    assert.strictEqual(board._convertToReversiBoardPieceType(REVERSI_PIECE_TYPES.WHITE), reversi.PIECE_TYPES.WHITE);
  });

  it('_convertToReversiPieceType', () => {
    const board = new BoardModel();
    assert.strictEqual(board._convertToReversiPieceType(reversi.PIECE_TYPES.BLANK), REVERSI_PIECE_TYPES.EMPTY);
    assert.strictEqual(board._convertToReversiPieceType(reversi.PIECE_TYPES.BLACK), REVERSI_PIECE_TYPES.BLACK);
    assert.strictEqual(board._convertToReversiPieceType(reversi.PIECE_TYPES.WHITE), REVERSI_PIECE_TYPES.WHITE);
  });

  it('_getReversiBoardSquare', () => {
    const board = new BoardModel();
    const reversiBoardSquare = board._getReversiBoardSquare([1, 2]);
    assert(reversiBoardSquare instanceof reversi.Square);
    assert.strictEqual(reversiBoardSquare.rowIndex, 1);
    assert.strictEqual(reversiBoardSquare.colIndex, 2);
    assert.strictEqual(board._getReversiBoardSquare([0, 8]), null);
  });

  it('isPlaceableSquare', () => {
    const board = new BoardModel();
    assert.strictEqual(board.isPlaceableSquare([0, 0], REVERSI_PIECE_TYPES.BLACK), false);
  });

  it('getPlaceableSquares', () => {
    const board = new BoardModel();
    assert.strictEqual(board.getPlaceableSquares(REVERSI_PIECE_TYPES.WHITE).length, 0);
  });

  it('_syncFromReversiBoard', () => {
    const board = new BoardModel();

    lodash.flatten(board._squares).forEach(square => {
      assert.strictEqual(square.reversiPieceType, REVERSI_PIECE_TYPES.EMPTY);
    });

    board._reversiBoard._putPiece(0, 0, reversi.PIECE_TYPES.BLACK);
    board._reversiBoard._putPiece(7, 7, reversi.PIECE_TYPES.WHITE);
    board._syncFromReversiBoard();

    assert.strictEqual(board.ensureSquare([0, 0]).reversiPieceType, REVERSI_PIECE_TYPES.BLACK);
    assert.strictEqual(board.ensureSquare([7, 7]).reversiPieceType, REVERSI_PIECE_TYPES.WHITE);
    assert.strictEqual(board.ensureSquare([0, 1]).reversiPieceType, REVERSI_PIECE_TYPES.EMPTY);
  });

  it('putPiece', () => {
    const board = new BoardModel({ extent: [2, 2] });
    board.putPiece([0, 0], REVERSI_PIECE_TYPES.BLACK);
    assert.strictEqual(boardToText(board), [
      'x-',
      '--',
    ].join('\n'));

    board.putPiece([1, 1], REVERSI_PIECE_TYPES.WHITE);
    assert.strictEqual(boardToText(board), [
      'x-',
      '-o',
    ].join('\n'));

    board.putPiece([0, 0], REVERSI_PIECE_TYPES.EMPTY);
    assert.strictEqual(boardToText(board), [
      '--',
      '-o',
    ].join('\n'));
  });

  it('placePiece', () => {
    const board = new BoardModel({ extent: [2, 3] });
    let reversedPositionMap;

    board.putPiece([0, 0], REVERSI_PIECE_TYPES.BLACK);
    board.putPiece([0, 1], REVERSI_PIECE_TYPES.WHITE);
    board.putPiece([1, 1], REVERSI_PIECE_TYPES.BLACK);
    board.putPiece([1, 2], REVERSI_PIECE_TYPES.WHITE);
    assert.strictEqual(boardToText(board), [
      'xo-',
      '-xo',
    ].join('\n'));

    reversedPositionMap = board.placePiece([0, 2], REVERSI_PIECE_TYPES.BLACK);
    assert.strictEqual(boardToText(board), [
      'xxx',
      '-xo',
    ].join('\n'));
    assert.deepEqual(reversedPositionMap, [
      [ [0, 1] ],
      [
        [],
        [],
        [],
        [],
        [],
        [],
        [ [0, 1] ],
        [],
      ],
    ]);

    reversedPositionMap = board.placePiece([1, 0], REVERSI_PIECE_TYPES.WHITE);
    assert.strictEqual(boardToText(board), [
      'xxx',
      'ooo',
    ].join('\n'));
    assert.deepEqual(reversedPositionMap, [
      [ [1, 1] ],
      [
        [],
        [],
        [ [1, 1] ],
        [],
        [],
        [],
        [],
        [],
      ],
    ]);
  });
});
