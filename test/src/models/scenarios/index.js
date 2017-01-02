import assert from 'assert';
import { values } from 'lodash';

import { scenarioResourceList, scenarioResourceDict } from 'src/models/scenarios';
import ScenarioModel from 'src/models/scenarios/ScenarioModel';
import StageModel from 'src/models/scenarios/StageModel';


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

  it('a one of resource', () => {
    const AnyScenarioModel = scenarioResourceList[0];
    const model = AnyScenarioModel.create();
    assert(model instanceof AnyScenarioModel);
    assert(model._stages.length > 0);
    assert(model._stages[0] instanceof StageModel);
  });
});
