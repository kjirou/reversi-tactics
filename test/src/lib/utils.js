import assert from 'assert';

import { createClassBasedResourceList } from 'src/lib/utils';


describe('src/lib/utils', () => {

  it('createClassBasedResourceList', () => {
    class Item {}
    const itemList = createClassBasedResourceList(Item, [
      {
        constants: {
          label: 'Bomb',
        },
        properties: {
          damage: 10,
          price: 100,
        },
      },
      {},
    ]);

    assert(itemList[0].prototype instanceof Item);
    assert.strictEqual(itemList[0].label, 'Bomb');

    const item = new itemList[0];
    assert.strictEqual(item.damage, 10);
    assert.strictEqual(item.price, 100);

    new itemList[1]();  // should be created as a class
  });
});
