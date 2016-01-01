import { ARMY_COLORS } from '../consts';
import Model from './Model';

import NamingMixin from './mixins/NamingMixin';


class PrototypeArmyModel extends Model {}
Object.assign(PrototypeArmyModel.prototype, NamingMixin);


export default class ArmyModel extends PrototypeArmyModel {

  constructor() {
    super();

    this._color = null;
  }

  get color() { return this._color; }
  set color(value) { this._color = value; }
}
