import lodash from 'lodash';

import { ARMY_COLORS, REVERSI_PIECE_TYPES } from '../consts';
import ArmyModel from './ArmyModel';
import BoardModel from './BoardModel';
import Model from './Model';
import { unitResourceDict } from './units';


export default class GameModel extends Model {

  constructor() {
    super();

    this._board = new BoardModel();
    this._board.putPiece([3, 3], REVERSI_PIECE_TYPES.WHITE);
    this._board.putPiece([3, 4], REVERSI_PIECE_TYPES.BLACK);
    this._board.putPiece([4, 3], REVERSI_PIECE_TYPES.BLACK);
    this._board.putPiece([4, 4], REVERSI_PIECE_TYPES.WHITE);

    this._blackArmy = new ArmyModel({
      name: 'Uruk Hai',
      color: ARMY_COLORS.BLACK,
      unitDeck: lodash.range(32).map(() => {
        return {
          0: 'goblin',
          1: 'goblin',
          2: 'orc',
        }[lodash.random(2)];
      }),
    });
    this._whiteArmy = new ArmyModel({
      name: 'The Rohan',
      color: ARMY_COLORS.WHITE,
      unitDeck: lodash.range(32).map(() => {
        return {
          0: 'vigilante',
          1: 'vigilante',
          2: 'fighter',
          3: 'knight',
        }[lodash.random(3)];
      }),
    });
    this._armies = {
      [ARMY_COLORS.BLACK]: this._blackArmy,
      [ARMY_COLORS.WHITE]: this._whiteArmy,
    };
  }

  get board() { return this._board; }
  get armies() { return this._armies; }
}
