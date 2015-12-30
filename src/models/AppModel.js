import lodash from 'lodash';

import Model from './Model';
import BoardModel from './BoardModel';


export default class AppModel extends Model {

  constructor() {
    super();

    this._board = new BoardModel();
    // TODO: Tmp
    this._board._squares[3][3].reversiPieceType = 'WHITE';
    this._board._squares[3][4].reversiPieceType = 'BLACK';
    this._board._squares[4][3].reversiPieceType = 'BLACK';
    this._board._squares[4][4].reversiPieceType = 'WHITE';
  }

  get board() { return this._board; }

  touchSquare(position) {
    this._board.ensureSquare(position).reversiPieceType = 'BLACK';
  }
}
