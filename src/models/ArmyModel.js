import assert from 'assert';
import { shuffle } from 'lodash';

import { ARMY_COLORS, PARAMETERS } from '../consts';
import NamingMixin from '../mixins/NamingMixin';
import Model from './Model';
import { unitResourceDict, unitTypeIds } from './units';


class PrototypeArmyModel extends Model {}
Object.assign(PrototypeArmyModel.prototype, NamingMixin);


export default class ArmyModel extends PrototypeArmyModel {

  /*
   * @param {Array<string>} unitDeck - A list of UnitModel's typeId
   */
  constructor({ name = null, color, unitDeck }) {
    super();

    this._name = name || 'No Name';
    this._color = color;
    this._battlers = this._createBattlers(unitDeck);
  }

  get color() { return this._color; }

  _createBattlers(unitDeck) {
    unitDeck.forEach(typeId => assert(unitTypeIds.indexOf(typeId) !== -1, `${ typeId } is not a unitTypeId`));

    return shuffle(unitDeck)
      .map(typeId => unitResourceDict[typeId].beBornAsBattler({ belongingArmy: this }))
    ;
  }

  _findPlacedBattlers() {
    return this._battlers.filter(battler => battler.isPlaced());
  }

  _findUnplacedBattlers() {
    return this._battlers.filter(battler => !battler.isPlaced());
  }

  _getVisibleBattlers() {
    return this._findUnplacedBattlers().slice(0, PARAMETERS.MAX_VISIBLE_BATTLER_COUNT);
  }

  getNextBattler() {
    return this._findUnplacedBattlers()[0] || null;
  }

  _calculateScore() {
    return this._findPlacedBattlers().filter(battler => battler.isAlive()).length;
  }

  presentProps() {
    return {
      name: this.getName(),
      score: this._calculateScore(),
      visibleBattlers: this._getVisibleBattlers().map(battler => battler.presentProps()),
    };
  }
}
