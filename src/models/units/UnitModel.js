import { aggregators } from 'rpgparameter';

import { PARAMETERS } from '../../consts';
import { within } from '../../lib/utils';
import Model from '../Model';
import AutomaticNamingMixin from '../mixins/AutomaticNamingMixin';
import IconizedMixin from '../mixins/IconizedMixin';
import ParametersMixin from '../mixins/ParametersMixin';
import TypeIdMixin from '../mixins/TypeIdMixin';


// This is necessary for extending mixed same name methods
class PrototypeUnitModel extends Model {}
Object.assign(PrototypeUnitModel, TypeIdMixin, IconizedMixin);
Object.assign(PrototypeUnitModel.prototype, AutomaticNamingMixin, ParametersMixin);


export default class UnitModel extends PrototypeUnitModel {

  constructor() {
    super();

    this._hp = PARAMETERS.MIN_MAX_HP;
  }

  get hp() { return this._hp; }
  get wound() { return this._getWound(); }
  get hpRate() { return this._getHpRate(); }
  get woundRate() { return this._getWoundRate(); }

  getMaxHp() {
    const maxHp = aggregators.aggregateIntegers([
      this.getRawMaxHp(),
    ]);
    return within(maxHp, PARAMETERS.MIN_MAX_HP, PARAMETERS.MAX_MAX_HP);
  }

  _getWound() {
    return Math.max(this.getMaxHp() - this.hp, 0);
  }

  _getHpRate() {
    return within(this.hp / this.getMaxHp(), 0, 1);
  }

  _getWoundRate() {
    return 1.0 - this.hpRate;
  }

  isFullHp() {
    return this.hpRate >= 1.0;
  }

  _updateHp(nextHp) {
    nextHp = within(nextHp, 0, this.getMaxHp());
    this._hp = nextHp;
  }

  _updateHpByRate(nextHpRate) {
    const nextHp = Math.ceil(this.getMaxHp() * nextHpRate);
    this._updateHp(nextHp);
  }

  beHealed(points) {
    points = Math.max(points, 0);
    const nextHp = this._hp + points;
    this._updateHp(nextHp);
    return points;
  }

  beHealedByRate(rate) {
    const points = Math.ceil(this.getMaxHp() * rate);
    return this.beHealed(points);
  }

  beHealedFully() {
    return this.beHealedByRate(1.0);
  }

  beDamaged(points, options = {}) {
    options = Object.assign({
      shouldSurvive: false,
    }, options);
    points = Math.max(points, 0);
    let nextHp = this.hp - points;
    if (options.shouldSurvive && nextHp < 1) nextHp = 1;
    this._updateHp(nextHp);
    return points;
  }

  beDamagedByRate(rate) {
    const points = Math.ceil(this.getMaxHp() * rate);
    return this.beDamaged(points);
  }

  beDamagedFully() {
    return this.beDamagedByRate(1.0);
  }

  isDead() {
    return this._hp === 0;
  }

  isAlive() {
    return !this.isDead();
  }
}
