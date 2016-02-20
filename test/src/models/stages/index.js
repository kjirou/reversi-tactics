import assert from 'assert';
import { values } from 'lodash';

import { stageResourceList, stageResourceDict } from 'src/models/stages';
import StageModel from 'src/models/stages/StageModel';


describe('src/models/stages', () => {

  it('stageResourceList', () => {
    assert(stageResourceList.length > 0);
    assert(stageResourceList[0].prototype instanceof StageModel);
  });

  it('stageResourceDict', () => {
    assert.strictEqual(values(stageResourceDict).length, stageResourceList.length);
    Object.keys(stageResourceDict).forEach(typeId => {
      const Resource = stageResourceDict[typeId];
      assert(Resource.prototype instanceof StageModel);
      assert.strictEqual(typeId, Resource.getTypeId());
    });;
  });
});
