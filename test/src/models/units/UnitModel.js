import assert from 'assert';
import sinon from 'sinon';

import { PARAMETERS } from 'src/consts';
import UnitModel from 'src/models/units/UnitModel';


describe('src/models/units/UnitModel', () => {

  it('constructor', () => {
    const unit = new UnitModel();
  });


  describe('parameters', () => {

    it('maxHp', () => {
      const unit = new UnitModel();
      const standardValue = unit.getMaxHp();

      unit._maxHp = unit._maxHp + 1;
      assert.strictEqual(unit.getMaxHp(), standardValue + 1);

      // limited value
      unit._maxHp = -99999999;
      assert.strictEqual(unit.getMaxHp(), PARAMETERS.MIN_MAX_HP);
      unit._maxHp = 99999999;
      assert.strictEqual(unit.getMaxHp(), PARAMETERS.MAX_MAX_HP);
    });

    it('attackPower', () => {
      const unit = new UnitModel();
      const standardValue = unit.getAttackPower();

      unit._attackPower = unit._attackPower + 1;
      assert.strictEqual(unit.getAttackPower(), standardValue + 1);
    });
  });


  describe('hp getters', () => {

    it('hp', () => {
      const unit = new UnitModel();
      unit._hp = 3;
      assert.strictEqual(unit.hp, 3);
    });

    it('wound', () => {
      const unit = new UnitModel();
      unit._hp = 3;
      sinon.stub(unit, 'getMaxHp', () => 10);
      assert.strictEqual(unit.wound, 7);
    });

    it('hpRate', () => {
      const unit = new UnitModel();
      unit._hp = 3;
      sinon.stub(unit, 'getMaxHp', () => 10);
      assert.strictEqual(unit.hpRate, 0.3);
      unit._hp = 11;
      assert.strictEqual(unit.hpRate, 1.0);
    });

    it('woundRate', () => {
      const unit = new UnitModel();
      unit._hp = 3;
      sinon.stub(unit, 'getMaxHp', () => 10);
      assert.strictEqual(unit.woundRate, 0.7);
    });
  });


  describe('hp management', function() {

    it('beHealed, isFullHp', () => {
      const unit = new UnitModel();
      unit._hp = 3;
      sinon.stub(unit, 'getMaxHp', () => 10);
      unit.beHealed(4);
      assert.strictEqual(unit.hp, 7);
      assert.strictEqual(unit.isFullHp(), false);
      unit.beHealed(99);
      assert.strictEqual(unit.hp, 10);
      assert.strictEqual(unit.isFullHp(), true);
      unit.beHealed(-1);
      assert.strictEqual(unit.hp, 10);
    });

    it('beHealedByRate', () => {
      const unit = new UnitModel();
      unit._hp = 3;
      sinon.stub(unit, 'getMaxHp', () => 10);
      unit.beHealedByRate(0.4);
      assert.strictEqual(unit.hp, 7);
      unit.beHealedByRate(0.0000001);
      assert.strictEqual(unit.hp, 8);
    });

    it('beHealedFully', () => {
      const unit = new UnitModel();
      unit._hp = 3;
      sinon.stub(unit, 'getMaxHp', () => 10);
      unit.beHealedFully();
      assert.strictEqual(unit.hp, 10);
    });

    it('beDamaged', () => {
      const unit = new UnitModel();
      unit._hp = 7;
      sinon.stub(unit, 'getMaxHp', () => 10);
      unit.beDamaged(4);
      assert.strictEqual(unit.hp, 3);
      unit.beDamaged(99, { shouldSurvive: true });
      assert.strictEqual(unit.hp, 1);
      unit.beDamaged(99);
      assert.strictEqual(unit.hp, 0);
      unit.beDamaged(-1);
      assert.strictEqual(unit.hp, 0);
    });

    it('beDamagedByRate', () => {
      const unit = new UnitModel();
      unit._hp = 7;
      sinon.stub(unit, 'getMaxHp', () => 10);
      unit.beDamagedByRate(0.4);
      assert.strictEqual(unit.hp, 3);
    });

    it('beDamagedFully', () => {
      const unit = new UnitModel();
      unit._hp = 7;
      sinon.stub(unit, 'getMaxHp', () => 10);
      unit.beDamagedFully();
      assert.strictEqual(unit.hp, 0);
    });
  });
});
