import assert from 'assert';

import IconizedMixin from 'src/models/mixins/IconizedMixin';
import TypeIdMixin from 'src/models/mixins/TypeIdMixin';


describe('src/models/mixins/IconizedMixin', () => {

  it('getIconId', () => {
    const foo = {};
    Object.assign(foo, IconizedMixin);
    assert.strictEqual(foo.getIconId(), 'invalid');
    foo._iconId = 'foo';
    assert.strictEqual(foo.getIconId(), 'foo');
  });

  it('should guess from typeId', () => {
    const foo = {};
    Object.assign(foo, TypeIdMixin, IconizedMixin);
    foo._typeId = 'goblin';
    assert.strictEqual(foo.getIconId(), 'goblin');
  });
});
