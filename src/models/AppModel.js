import assert from 'assert';
import { uniq, values } from 'lodash';

import { ARMY_COLORS, SCENE_IDS } from '../consts';
import { getReversiPieceTypeFromArmyColor } from '../lib/utils';
import GameModel from './GameModel';
import Model from './Model';


export default class AppModel extends Model {

  constructor() {
    super();

    this._sceneId = SCENE_IDS.WELCOME;

    this._lastProceedingResult = null;
    this._game = new GameModel();
  }

  /*
   * @return {Array<object>} - A list of square props
   */
  static _generateSquares(gameModel, transitionMap) {
    const boardProps = gameModel.board.presentProps();
    const nextArmyPlaceableSquarePositions = gameModel.getNextArmyPlaceableSquarePositions();
    const nextReversiPieceType = getReversiPieceTypeFromArmyColor(gameModel.nextArmyColor);

    return boardProps.squares.map(rowSquares => {
      return rowSquares.map(square => {
        return Object.assign({}, square, {
          placementSuggestion: (
            nextArmyPlaceableSquarePositions.some(position => {
              return position[0] === square.position[0] && position[1] === square.position[1];
            })
          ) ? nextReversiPieceType : null,
          iconTransition: transitionMap[square.positionId] || [],
        });
      });
    });
  }

  presentProps() {
    let scene = {};

    if (this._sceneId === SCENE_IDS.GAME) {
      if (this._game) {
        const transitionMap = this._lastProceedingResult || {};
        const squares = this.constructor._generateSquares(this._game, transitionMap);

        scene = Object.assign(scene, {
          squares,
          armies: {
            [ARMY_COLORS.BLACK]: this._game.armies[ARMY_COLORS.BLACK].presentProps(),
            [ARMY_COLORS.WHITE]: this._game.armies[ARMY_COLORS.WHITE].presentProps(),
          },
          nextArmyColor: this._game.nextArmyColor,
        });
      }
    }

    return {
      sceneId: this._sceneId,
      scene,
    };
  }
}
