import assert from 'assert';

import ParametersMixin from 'src/models/mixins/ParametersMixin';


describe('src/models/mixins/ParametersMixin', () => {

  it('should apply to class',() => {
    class Foo {
      constructor() {
        this._maxHp = 10;
        this._attackPower = 5;
      }
    }
    Object.assign(Foo.prototype, ParametersMixin);

    const foo = new Foo();
    assert.strictEqual(foo.getMaxHp(), 10);
    assert.strictEqual(foo.getAttackPower(), 5);
  });
});
