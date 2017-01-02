import { range } from 'lodash';

import { DEFAULTS, PARAMETERS } from '../../consts';
import NamingMixin from '../../mixins/NamingMixin';
import Model from '../Model';


class PrototypeStageModel extends Model {}
Object.assign(PrototypeStageModel.prototype, NamingMixin);


export default class StageModel extends PrototypeStageModel {

  constructor({ armyName = null, unitTypeIds = [], defaultUnitTypeId = null }) {
    super();

    this._armyName = armyName;
    this._unitTypeIds = unitTypeIds;
    this._defaultUnitTypeId = defaultUnitTypeId || DEFAULTS.UNIT_TYPE_ID;

    if (this._unitTypeIds.length > PARAMETERS.MAX_BATTLER_COUNT) {
      throw new Error('A number of unitTypeIds is too many');
    }
  }

  generateUnitDeck() {
    const unitDeck = this._unitTypeIds.slice();
    range(PARAMETERS.MAX_BATTLER_COUNT - unitDeck.length).forEach(() => {
      unitDeck.push(this._defaultUnitTypeId);
    });
    return unitDeck;
  }
}
