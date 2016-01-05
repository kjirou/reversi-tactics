import lodash from 'lodash';

import { ARMY_COLORS, REVERSI_PIECE_TYPES } from '../consts';
import { getReversiPieceTypeFromArmyColor } from '../lib/utils';
import ArmyModel from './ArmyModel';
import BoardModel from './BoardModel';
import Model from './Model';
import { unitResourceDict } from './units';


export default class GameModel extends Model {

  constructor() {
    super();

    this._nextArmyColor = ARMY_COLORS.BLACK;

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
  get nextArmyColor() { return this._nextArmyColor; }

  getNextArmyPlaceableSquarePositions() {
    const reversiPieceType = getReversiPieceTypeFromArmyColor(this._nextArmyColor);
    return this._board.getPlaceableSquares(reversiPieceType)
      .map(square => square.position);
  }

  _toggleArmyColor(armyColor) {
    return {
      [ARMY_COLORS.BLACK]: ARMY_COLORS.WHITE,
      [ARMY_COLORS.WHITE]: ARMY_COLORS.BLACK,
    }[armyColor];
  }

  // TODO: return state diffs for animation
  proceed(position) {
    const currentArmyColor = this._nextArmyColor;
    const currentArmy = this._armies[currentArmyColor];
    const currentReversiPieceType = getReversiPieceTypeFromArmyColor(currentArmyColor);
    const placeableSquares = this._board.getPlaceableSquares(currentReversiPieceType);
    const isPlaceableSquare = this._board.isPlaceableSquare(position, currentReversiPieceType);
    const currentBattler = currentArmy.getNextBattler();

    // TODO: consider to turn of unplaceable piece
    if (placeableSquares.length === 0) {
      console.log('Can not place the piece in anywhere');
      this._nextArmyColor = this._toggleArmyColor(currentArmyColor);
      return;
    }

    if (isPlaceableSquare && currentBattler) {
      const reversedPositionMap = this._board.placeBattler(position, currentBattler);

      // TODO: tmp
      // TODO: attack reaction
      reversedPositionMap[0].forEach(position => {
        const square = this._board.ensureSquare(position);
        const battler = square.battler;
        if (battler && battler.getBelongingArmy().color !== currentArmyColor) {
          console.log(`Attack to the ${ battler.getName() } of [${ square.position }]`);
          battler.beDamaged(currentBattler.getAttackPower());
        }
      });

      this._nextArmyColor = this._toggleArmyColor(currentArmyColor);
    } else {
      console.log('Can not place the piece in there');
    }
  }
}
