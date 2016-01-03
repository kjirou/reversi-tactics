import assert from 'assert';

import { ARMY_COLORS } from '../consts';


/*
 * Mix in battler role to UnitModel
 */
const BattlerMixin = {

  /*
   * The army that it belongs
   * {ArmyModel|null}
   */
  _belongingArmy: null,

  _position: null,

  battlerMixinConstructor({ belongingArmy }) {
    assert(this.hasOwnProperty('_hp'), 'This object is not a UnitModel, probably');
    assert(Boolean(belongingArmy), 'belongingArmy is not defined');
    this._belongingArmy = belongingArmy;
  },

  getBelongingArmy() {
    return this._belongingArmy;
  },

  setPosition(value) {
    this._position = value;
  },

  isPlaced() {
    return this._position !== null;
  },

  /*
   * @param {BoardModel} board
   */
  bePlacedToBoard(board, position) {
    board.placeBattler(position, this);
  },
};


export default BattlerMixin;

export const isMixedBattler = (any) => {
  return 'bePlacedToBoard' in any;
};
