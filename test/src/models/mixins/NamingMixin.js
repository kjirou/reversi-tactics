import assert from 'assert';

import NamingMixin from 'src/models/mixins/NamingMixin';


describe('src/models/mixins/NamingMixin', () => {

  it('should apply to object', () => {
    const foo = {};
    Object.assign(foo, NamingMixin, {
      _name: 'foo',
      _shortName: 'fo',
      _abbreviation: 'f'
    });

    assert.strictEqual(foo.getName(), 'foo');
    assert.strictEqual(foo.getShortName(), 'fo');
    assert.strictEqual(foo.getAbbreviation(), 'f');

    foo._abbreviation = null;
    assert.strictEqual(foo.getAbbreviation(), 'fo');

    foo._shortName = null;
    assert.strictEqual(foo.getShortName(), 'foo');
    assert.strictEqual(foo.getAbbreviation(), 'foo');
  });
});
