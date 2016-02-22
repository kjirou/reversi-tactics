import { within } from '@kjirou/utils';

//import { ARMY_COLORS, PARAMETERS } from '../../consts';
import AutomaticNamingMixin from '../../mixins/AutomaticNamingMixin';
import IconizedMixin from '../../mixins/IconizedMixin';
import TypeIdMixin from '../../mixins/TypeIdMixin';
import Model from '../Model';


class PrototypeScenarioModel extends Model {}
Object.assign(PrototypeScenarioModel, TypeIdMixin, IconizedMixin);
Object.assign(PrototypeScenarioModel.prototype, AutomaticNamingMixin);


export default class ScenarioModel extends PrototypeScenarioModel {

  constructor() {
    super();
  }

  //getTypeId() {
  //  return this.constructor.getTypeId();
  //}

  //getIconId() {
  //  if (this.isDead()) {
  //    return 'bones';
  //  }
  //  return this.constructor.getIconId();
  //}
}
