import lodash from 'lodash';

import { ARMY_COLORS } from '../consts';
import ArmyModel from './ArmyModel';
import BoardModel from './BoardModel';
import GameModel from './GameModel';
import Model from './Model';


export default class AppModel extends Model {

  constructor() {
    super();

    this._game = new GameModel();
  }

  touchSquare(position) {
    if (!this._game) {
      return Promise.resolve();
    }

    this._nextReversiPieceType = this._nextReversiPieceType || 'BLACK';
    this._game._board.placePiece(position, this._nextReversiPieceType);
    this._nextReversiPieceType = {
      BLACK: 'WHITE',
      WHITE: 'BLACK',
    }[this._nextReversiPieceType];

    return Promise.resolve();
  }

  presentProps() {
    let squares = null;
    if (this._game) {
      const boardProps = this._game.board.presentProps();
      squares = boardProps.squares;
    }

    return {
      squares,
    };
  }
}
