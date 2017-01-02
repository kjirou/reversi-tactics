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


  describe('presentProps', () => {

    it('should be', () => {
      class FooScenarioModel extends ScenarioModel {}
      FooScenarioModel._typeId = 'foo_hoge';
      FooScenarioModel._iconId = 'bar_fuga';

      const model = FooScenarioModel.create();
      const props = model.presentProps();

      assert.deepEqual(props, {
        name: 'Foo Hoge',
        iconId: 'bar_fuga',
      });
    });
  });
});
