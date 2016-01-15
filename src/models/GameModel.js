import lodash from 'lodash';
import { DIRECTIONS } from 'reversi';

import { ARMY_COLORS, REVERSI_PIECE_TYPES } from '../consts';
import { createDelayQuery, createSlashQuery, createCrossedSlashQuery } from '../lib/animation-query-builder';
import { getReversiPieceTypeFromArmyColor, measureDistance } from '../lib/utils';
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

  /*
   * @param {Battler} attacker
   * @return {Array|null} - animationQuery
   */
  _attackToPosition(attacker, attackerPosition, targetPosition, isCritical = false) {
    let animationQuery = null;

    const targetSquare = this._board.ensureSquare(targetPosition);
    const targetBattler = targetSquare.battler;

    if (
      targetBattler &&
      targetBattler.isAlive() &&
      targetBattler.getBelongingArmy().color !== attacker.getBelongingArmy().color
    ) {
      let damageRate = 1;
      if (isCritical) {
        damageRate = 2;
      }

      const damage = ~~(attacker.getAttackPower() * damageRate);
      targetBattler.beDamaged(damage);

      if (isCritical) {
        animationQuery = createCrossedSlashQuery(damage);
      } else {
        animationQuery = createSlashQuery(damage);
      }

      const distance = measureDistance(attackerPosition, targetPosition);
      const delayQuery = createDelayQuery((distance - 1) * 50);
      animationQuery.unshift(...delayQuery);
    }

    return animationQuery;
  }

  /*
   * @return {Object} - { [positionStr]: animationQuery, .. }
   */
  _placeBattler(position, battler) {
    const animationQueryDict = {};
    const appendAnimationQuery = (position, animationQuery) => {
      const positionStr = String(position);
      if (positionStr in animationQueryDict) {
        animationQueryDict[positionStr].push(...animationQuery);
      } else {
        animationQueryDict[positionStr] = animationQuery;
      }
    };

    const reversedPositionMap = this._board.placeBattler(position, battler);
    const battlerColor = battler.getBelongingArmy().color;

    reversedPositionMap[1].forEach((positions, directionIndex) => {
      if (positions.length === 0) {
        return;
      }

      const lastPosition = positions[positions.length - 1];
      const directionCoords = DIRECTIONS[directionIndex];
      const oppositePosition = [lastPosition[0] + directionCoords[0], lastPosition[1] + directionCoords[1]];
      const oppositeSquare = this._board.ensureSquare(oppositePosition);
      const oppositeBattler = oppositeSquare.battler;

      positions.forEach(targetPosition => {
        const aq = this._attackToPosition(battler, position, targetPosition, false);
        if (aq) {
          appendAnimationQuery(targetPosition, aq);
        }
      });

      if (oppositeBattler && oppositeBattler.isAlive()) {
        // Friend: Cooperation attack
        if (oppositeBattler.getBelongingArmy().color === battlerColor) {
          positions.slice().reverse().forEach(position_ => {
            const aq = this._attackToPosition(oppositeBattler, oppositePosition, position_, false);
            if (aq) {
              aq.unshift(...createDelayQuery(250));
              appendAnimationQuery(position_, aq);
            }
          })
        // Enemy: Critical hit
        } else {
          const aq = this._attackToPosition(battler, position, oppositePosition, true);
          if (aq) {
            appendAnimationQuery(oppositePosition, aq);
          }
        }
      }
    });

    return animationQueryDict;
  }

  /*
   * @return {object}
   */
  proceed(position) {
    let animationQueryDict = {};
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
      return animationQueryDict;
    }

    if (isPlaceableSquare && currentBattler) {
      animationQueryDict = this._placeBattler(position, currentBattler);
      this._nextArmyColor = this._toggleArmyColor(currentArmyColor);
    } else {
      console.log('Can not place the piece in there');
    }

    return animationQueryDict;
  }
}
