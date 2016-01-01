import lodash from 'lodash';

import { ARMY_COLORS } from '../consts';
import ArmyModel from './ArmyModel';
import BoardModel from './BoardModel';
import Model from './Model';


export default class AppModel extends Model {

  constructor() {
    super();

    // TODO: Game initialization
    this._board = new BoardModel();
    this._board.putPiece([3, 3], 'WHITE');
    this._board.putPiece([3, 4], 'BLACK');
    this._board.putPiece([4, 3], 'BLACK');
    this._board.putPiece([4, 4], 'WHITE');

    const blackArmy = new ArmyModel();
    blackArmy.color = ARMY_COLORS.BLACK;
    const whiteArmy = new ArmyModel();
    whiteArmy.color = ARMY_COLORS.WHITE;
    this._armies = [blackArmy, whiteArmy];
  }

  // TODO: Props should be created at inside
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
