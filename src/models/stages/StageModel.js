import { within } from '@kjirou/utils';

//import { ARMY_COLORS, PARAMETERS } from '../../consts';
import AutomaticNamingMixin from '../../mixins/AutomaticNamingMixin';
import IconizedMixin from '../../mixins/IconizedMixin';
import TypeIdMixin from '../../mixins/TypeIdMixin';
import Model from '../Model';


class PrototypeStageModel extends Model {}
Object.assign(PrototypeStageModel, TypeIdMixin, IconizedMixin);
Object.assign(PrototypeStageModel.prototype, AutomaticNamingMixin);


export default class StageModel extends PrototypeStageModel {

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
