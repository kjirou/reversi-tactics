import lodash from 'lodash';

import Model from './Model';
import BoardModel from './BoardModel';


export default class AppModel extends Model {

  constructor() {
    super();

    this._board = new BoardModel();
    // TODO: Tmp
    this._board.putPiece([3, 3], 'WHITE');
    this._board.putPiece([3, 4], 'BLACK');
    this._board.putPiece([4, 3], 'BLACK');
    this._board.putPiece([4, 4], 'WHITE');
  }

  get board() { return this._board; }

  touchSquare(position) {
    // TODO: Tmp
    this._nextReversiPieceType = this._nextReversiPieceType || 'BLACK';
    this._board.placePiece(position, this._nextReversiPieceType);
    this._nextReversiPieceType = {
      BLACK: 'WHITE',
      WHITE: 'BLACK',
    }[this._nextReversiPieceType];
    return Promise.resolve();
  }
}
