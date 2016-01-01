import assert from 'assert';
import lodash from 'lodash';

import { unitResourceDict, unitResourceList } from 'src/models/units';
import UnitModel from 'src/models/units/UnitModel';


describe('src/models/units', () => {

  it('unitResourceList', () => {
    assert(unitResourceList.length > 0);
    assert(unitResourceList[0].prototype instanceof UnitModel);
  });

  it('unitResourceDict', () => {
    assert.strictEqual(lodash.values(unitResourceDict).length, unitResourceList.length);
    Object.keys(unitResourceDict).forEach(typeId => {
      const Resource = unitResourceDict[typeId];
      assert(Resource.prototype instanceof UnitModel);
      assert.strictEqual(typeId, Resource.getTypeId());
    });;
  });
});
