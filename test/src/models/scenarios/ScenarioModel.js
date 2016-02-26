import assert from 'assert';

import ScenarioModel from 'src/models/scenarios/ScenarioModel';
import StageModel from 'src/models/scenarios/StageModel';


describe('src/models/scenarios/ScenarioModel', () => {

  it('constructor', () => {
    const model = new ScenarioModel();
  });


  describe('initialize', () => {

    it('should be', () => {
      const model = new ScenarioModel();
      model._stagesSource = [
        { defaultUnitTypeId: 'goblin' },
        { defaultUnitTypeId: 'orc' },
      ];
      model.initialize();

      assert(model._stages[0] instanceof StageModel);
      assert(model._stages[1] instanceof StageModel);
    });
  });
});
