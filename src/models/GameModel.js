import { pick, random, range } from 'lodash';
import { DIRECTIONS } from 'reversi';

import { ARMY_COLORS, REVERSI_PIECE_TYPES } from '../consts';
import { generateAnimatedIconTransition } from '../lib/transition-generator';
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
      unitDeck: range(32).map(() => {
        return {
          0: 'goblin',
          1: 'goblin',
          2: 'goblin',
          3: 'orc',
          4: 'orc',
          5: 'minotaur',
        }[random(5)];
      }),
    });
    this._whiteArmy = new ArmyModel({
      name: 'The Rohan',
      color: ARMY_COLORS.WHITE,
      unitDeck: range(32).map(() => {
        return {
          0: 'militia',
          1: 'soldier',
          2: 'fighter',
          3: 'knight',
        }[random(3)];
      }),
    });
    this._armies = {
      [ARMY_COLORS.BLACK]: this._blackArmy,
      [ARMY_COLORS.WHITE]: this._whiteArmy,
    };

    this._lastProceedingResult = null;
  }

  get board() { return this._board; }
  get armies() { return this._armies; }
  get nextArmyColor() { return this._nextArmyColor; }
  get lastProceedingResult() { return this._lastProceedingResult; }

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
   * @return {Array<Object>}
   */
  _attackToPosition(attacker, attackerPosition, targetPosition, options = {}) {
    options = Object.assign({
      isCritical: false,
      transitionDelay: null,
    }, options);

    let transition = [];

    const targetSquare = this._board.ensureSquare(targetPosition);
    const targetBattler = targetSquare.battler;

    if (
      targetBattler &&
      targetBattler.isAlive() &&
      targetBattler.getBelongingArmy().color !== attacker.getBelongingArmy().color
    ) {
      let damageRate = 1;
      if (options.isCritical) {
        damageRate = 2;
      }

      const damage = ~~(attacker.getAttackPower() * damageRate);
      // TODO: Sync to AnimatedIcon.propTypes
      const beforeProps = pick(targetBattler.presentProps(), 'hp', 'iconId');
      targetBattler.beDamaged(damage);

      let transitionType = 'slash';
      if (options.isCritical) {
        transitionType = 'crossed_slash';
      }
      transition = generateAnimatedIconTransition(beforeProps, transitionType, {
        delay: options.transitionDelay,
        hpDelta: -damage,
      });
    }

    return transition;
  }

  /*
   * @return {Object} - { [positionStr]: transition, .. }
   */
  _placeBattler(position, battler) {
    const transitionMap = {};
    const appendTransition = (position, transition) => {
      const positionStr = String(position);
      if (positionStr in transitionMap) {
        transitionMap[positionStr].push(...transition);
      } else {
        transitionMap[positionStr] = transition;
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

      // placed battler act
      positions.forEach(targetPosition => {
        const transition = this._attackToPosition(battler, position, targetPosition);
        appendTransition(targetPosition, transition);
      });

      // opposite battler react
      if (oppositeBattler && oppositeBattler.isAlive()) {
        // Friend: Cooperation attack
        if (oppositeBattler.getBelongingArmy().color === battlerColor) {
          positions.slice().reverse().forEach(position_ => {
            const transition = this._attackToPosition(oppositeBattler, oppositePosition, position_, {
              transitionDelay: 250,
            });
            appendTransition(position_, transition);
          })
        // Enemy: Critical hit
        } else {
          const transition = this._attackToPosition(battler, position, oppositePosition, { isCritical: true });
          appendTransition(oppositePosition, transition);
        }
      }
    });

    return transitionMap;
  }

  /*
   * Let proceed one turn
   */
  proceed(position) {
    let transitionMap = {};
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
      return transitionMap;
    }

    if (isPlaceableSquare && currentBattler) {
      transitionMap = this._placeBattler(position, currentBattler);
      this._nextArmyColor = this._toggleArmyColor(currentArmyColor);
    } else {
      console.log('Can not place the piece in there');
    }

    this._lastProceedingResult = transitionMap;
  }
}
