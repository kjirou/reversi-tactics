import { within } from '@kjirou/utils';

//import { ARMY_COLORS, PARAMETERS } from '../../consts';
import AutomaticNamingMixin from '../../mixins/AutomaticNamingMixin';
import IconizedMixin from '../../mixins/IconizedMixin';
import TypeIdMixin from '../../mixins/TypeIdMixin';
import Model from '../Model';
import StageModel from './StageModel';


class PrototypeScenarioModel extends Model {}
Object.assign(PrototypeScenarioModel, TypeIdMixin, IconizedMixin);
Object.assign(PrototypeScenarioModel.prototype, AutomaticNamingMixin);


export default class ScenarioModel extends PrototypeScenarioModel {

  constructor() {
    super();

    this._stagesSource = [];
    this._stages = [];
  }

  initialize() {
    this._stages = this._stagesSource.map(stageSource => {
      return new StageModel({
        armyName: stageSource.armyName,
        unitTypeIds: stageSource.unitTypeIds,
        defaultUnitTypeId: stageSource.defaultUnitTypeId,
      });
    });
  }

  getTypeId() {
    return this.constructor.getTypeId();
  }

  //getIconId() {
  //  if (this.isDead()) {
  //    return 'bones';
  //  }
  //  return this.constructor.getIconId();
  //}

  presentProps() {
  }

  static create(...args) {
    const instance = new this(...args);
    instance.initialize();
    return instance;
  }
}
