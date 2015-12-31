import assert from 'assert';

import AutomaticNamingMixin from 'src/models/mixins/AutomaticNamingMixin';


describe('src/models/mixins/AutomaticNamingMixin', () => {

  it('should return titleized typeId as name', () => {
    class Foo {
    }
    Object.assign(Foo.prototype, AutomaticNamingMixin);
    const foo = new Foo();
    assert.strictEqual(foo.getName(), null);
    Foo.typeId = 'my_name-is taro';
    assert.strictEqual(foo.getName(), 'My Name Is Taro');
    foo._name = 'Jiro';
    assert.strictEqual(foo.getName(), 'Jiro');
  });
});
