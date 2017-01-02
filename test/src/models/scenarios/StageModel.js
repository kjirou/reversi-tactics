import assert from 'assert';
import { range } from 'lodash';

import { DEFAULTS, PARAMETERS } from 'src/consts';
import StageModel from 'src/models/scenarios/StageModel';


describe('src/models/scenarios/StageModel', () => {

  describe('constructor', () => {

    it('should be', () => {
      const stage = new StageModel({});
    });

    it('should throw a error if too many unitTypeIds are set', () => {
      assert.throws(() => {
        new StageModel({
          unitTypeIds: range(PARAMETERS.MAX_BATTLER_COUNT + 1).map(() => DEFAULTS.UNIT_TYPE_ID),
        });
      }, /unit/);
    });
  });

  describe('generateUnitDeck', () => {

    it('should be', () => {
      const unitTypeIds = range(PARAMETERS.MAX_BATTLER_COUNT).map(() => 'goblin');
      const stage = new StageModel({ unitTypeIds });
      assert.deepEqual(stage.generateUnitDeck(), unitTypeIds);
    });

    it('use defaultUnitTypeId', () => {
      const stage = new StageModel({ unitTypeIds: ['fighter'], defaultUnitTypeId: 'goblin' });
      assert.deepEqual(stage.generateUnitDeck(), [
        'fighter',
        ...range(PARAMETERS.MAX_BATTLER_COUNT - 1).map(() => 'goblin'),
      ]);
    });
  });
});
