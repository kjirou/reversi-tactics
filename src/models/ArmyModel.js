import assert from 'assert';
import { shuffle } from 'lodash';

import { ARMY_COLORS } from '../consts';
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

    this._name = name;
    this._color = color;
    this._battlers = this._createBattlers(unitDeck);
  }

  _createBattlers(unitDeck) {
    unitDeck.forEach(typeId => assert(unitTypeIds.indexOf(typeId) !== -1, `${ typeId } is not a unitTypeId`));

    return shuffle(unitDeck)
      .map(typeId => unitResourceDict[typeId].beBornAsBattler({ belongingArmy: this }))
    ;
  }
}
