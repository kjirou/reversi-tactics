import assert from 'assert';

import AutomaticNamingMixin from 'src/mixins/AutomaticNamingMixin';
import TypeIdMixin from 'src/mixins/TypeIdMixin';


describe('src/mixins/AutomaticNamingMixin', () => {

  it('should return titleized typeId as name', () => {
    class Foo {}
    Object.assign(Foo, TypeIdMixin);
    Object.assign(Foo.prototype, AutomaticNamingMixin);

    const foo = new Foo();
    assert.strictEqual(foo.getName(), null);
    Foo._typeId = 'my_name-is taro';
    assert.strictEqual(foo.getName(), 'My Name Is Taro');
    foo._name = 'my_name is jiro';
    assert.strictEqual(foo.getName(), 'my_name is jiro');
  });
});
