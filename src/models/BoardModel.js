import assert from 'assert';
import lodash from 'lodash';
import reversi from 'reversi';

import { REVERSI_PIECE_TYPES } from '../consts';
import Model from './Model';
import SquareModel from './SquareModel';


export default class BoardModel extends Model {

  constructor(options = {}) {
    super();

    options = Object.assign({
      extent: [8, 8],
    }, options);

    this._squares = BoardModel._createSquares(options.extent);
    this._reversiBoard = new reversi.Board({
      rowCount: options.extent[0],
      colCount: options.extent[1],
    });
  }

  static _createSquares([rowLength, columnLength]) {
    return lodash.range(rowLength).map(rowIndex => {
      return lodash.range(columnLength).map(columnIndex => {
        return new SquareModel({
          position: [rowIndex, columnIndex],
        });
      });
    });
  }

  getExtent() {
    return [this._squares.length, this._squares[0].length];
  }

  getRowLength() {
    return this.getExtent()[0];
  }

  getColumnLength() {
    return this.getExtent()[1];
  }

  getSquare(position) {
    const [rowIndex, columnIndex] = position;
    if (!this._squares[rowIndex] || !this._squares[rowIndex][columnIndex]) { return null; }
    return this._squares[rowIndex][columnIndex];
  }

  ensureSquare(position) {
    const square = this.getSquare(position);
    if (!square) {
      throw new Error(`Can not find the square by [${ position }]`);
    }
    return square;
  }

  /*
   * Convert from position to reversi.Board's position
   */
  _convertToReversiBoardPosition(position) {
    return [position[0], position[1]];
  }

  _convertToPosition(reversiBoardPosition) {
    return [reversiBoardPosition[0], reversiBoardPosition[1]];
  }

  _convertToReversiBoardPieceType(reversiPieceType) {
    assert.notStrictEqual(
      lodash.values(REVERSI_PIECE_TYPES).indexOf(reversiPieceType), -1, 'Invalied reversiPieceType');
    return {
      [REVERSI_PIECE_TYPES.BLACK]: reversi.PIECE_TYPES.BLACK,
      [REVERSI_PIECE_TYPES.EMPTY]: reversi.PIECE_TYPES.BLANK,
      [REVERSI_PIECE_TYPES.WHITE]: reversi.PIECE_TYPES.WHITE,
    }[reversiPieceType];
  }

  _convertToReversiPieceType(reversiBoardPieceType) {
    assert.notStrictEqual(
      lodash.values(reversi.PIECE_TYPES).indexOf(reversiBoardPieceType), -1, 'Invalied reversiBoardPieceType');
    return {
      [reversi.PIECE_TYPES.BLACK]: REVERSI_PIECE_TYPES.BLACK,
      [reversi.PIECE_TYPES.BLANK]: REVERSI_PIECE_TYPES.EMPTY,
      [reversi.PIECE_TYPES.WHITE]: REVERSI_PIECE_TYPES.WHITE,
    }[reversiBoardPieceType];
  }

  /*
   * @return {reversi.Square|null}
   */
  _getReversiBoardSquare(position) {
    return this._reversiBoard._getSquare(...this._convertToReversiBoardPosition(position));
  }

  isPlacableSquare(position, reversiPieceType) {
    return this._reversiBoard.isPlacableSquare(
      ...this._convertToReversiBoardPosition(position),
      this._convertToReversiBoardPieceType(reversiPieceType)
    );
  }

  getPlacableSquares(reversiPieceType) {
    return lodash.flatten(this._squares).filter(square => {
      return this.isPlacableSquare(square.position, reversiPieceType);
    });
  }

  _syncFromReversiBoard() {
    this._reversiBoard.squares.forEach(reversiBoardRowSquares => {
      reversiBoardRowSquares.forEach(reversiBoardSquare => {
        const square = this.ensureSquare(
          this._convertToPosition([reversiBoardSquare.rowIndex, reversiBoardSquare.colIndex])
        );
        square.reversiPieceType = this._convertToReversiPieceType(reversiBoardSquare.pieceType);
      });
    });
  }

  putPiece(position, reversiPieceType) {
    this._reversiBoard._putPiece(
      ...this._convertToReversiBoardPosition(position),
      this._convertToReversiBoardPieceType(reversiPieceType)
    );
    this._syncFromReversiBoard();
  }

  placePiece(position, reversiPieceType) {
    assert(this.isPlacableSquare(position, reversiPieceType), 'Can not place the piece');
    const reversedReversiBoardPositions = this._reversiBoard.placePiece(
      ...this._convertToReversiBoardPosition(position),
      this._convertToReversiBoardPieceType(reversiPieceType)
    );
    this._syncFromReversiBoard();
    return reversedReversiBoardPositions.map(v => this._convertToPosition(v));
  }

  presentProps() {
    const props = {
      squares: this._squares.map(rowSquares => {
        return rowSquares.map(square => {
          return square.presentProps();
        });
      }),
    };
    return props;
  }
}
