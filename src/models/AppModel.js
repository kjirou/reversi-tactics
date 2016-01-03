import assert from 'assert';
import { uniq, values } from 'lodash';

import { ARMY_COLORS } from '../consts';
import GameModel from './GameModel';
import Model from './Model';


const actions = {

  touchSquare(position) {
    if (!this._game) {
      return;
    }
    return this._game.proceed(position);
  },
};


export default class AppModel extends Model {

  constructor() {
    super();

    this._game = new GameModel();

    this._includeActions(actions);
  }

  /*
   * Define actions to prototype from function map
   *
   * TODO: Organize dependencies
   *
   * @param {Object} actions - e.g. { [actionName]: action, .. }
   */
  _includeActions(actions) {
    Object.keys(actions).forEach(actionName => {
      const boundAction = actions[actionName].bind(this);
      this[actionName] = (...args) => {
        // Convert to Promise-based API forcibly
        const result = boundAction(...args);
        if (result instanceof Promise) {
          return result;
        } else if (result instanceof Error) {
          return Promise.reject(result);
        } else {
          return Promise.resolve(result);
        }
      };
    });
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
