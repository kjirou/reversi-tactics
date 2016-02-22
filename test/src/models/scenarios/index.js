import assert from 'assert';
import { values } from 'lodash';

import { scenarioResourceList, scenarioResourceDict } from 'src/models/scenarios';
import ScenarioModel from 'src/models/scenarios/ScenarioModel';


describe('src/models/scenarios', () => {

  it('scenarioResourceList', () => {
    assert(scenarioResourceList.length > 0);
    assert(scenarioResourceList[0].prototype instanceof ScenarioModel);
  });

  it('scenarioResourceDict', () => {
    assert.strictEqual(values(scenarioResourceDict).length, scenarioResourceList.length);
    Object.keys(scenarioResourceDict).forEach(typeId => {
      const Resource = scenarioResourceDict[typeId];
      assert(Resource.prototype instanceof ScenarioModel);
      assert.strictEqual(typeId, Resource.getTypeId());
    });;
  });
});
