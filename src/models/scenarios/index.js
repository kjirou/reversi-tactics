import { createClassBasedResourceList } from '@kjirou/utils';
import dictify from 'dictify';
import { times } from 'lodash';

import ScenarioModel from './ScenarioModel';


export const scenarioResourceList = createClassBasedResourceList(ScenarioModel, [
  {
    constants: {
      _typeId: 'training_range',
    },
    properties: {
      _stagesSource: [
        {
          defaultUnitTypeId: 'militia',
        },
        {
          defaultUnitTypeId: 'militia',
          unitTypeIds: times(8).map(() => 'soldier'),
        },
        {
          defaultUnitTypeId: 'militia',
          unitTypeIds: times(16).map(() => 'soldier'),
        },
      ],
    },
  },
  {
    constants: {
      _typeId: 'goblin_cave',
    },
    properties: {
      _stagesSource: [
        {
          defaultUnitTypeId: 'goblin',
        },
        {
          defaultUnitTypeId: 'goblin',
          unitTypeIds: ['orc', 'orc'],
        },
        {
          defaultUnitTypeId: 'goblin',
          unitTypeIds: ['orc', 'orc', 'orc', 'orc'],
        },
      ],
    },
  },
  {
    constants: {
      _typeId: 'orc_keep',
    },
    properties: {
      _stagesSource: [
        {
          defaultUnitTypeId: 'orc',
          unitTypeIds: [ ...times(16).map(() => 'goblin') ],
        },
        {
          defaultUnitTypeId: 'orc',
          unitTypeIds: [ ...times(8).map(() => 'goblin') ],
        },
        {
          defaultUnitTypeId: 'orc',
          unitTypeIds: [ ...times(4).map(() => 'goblin'), ...times(4).map(() => 'minotaur') ],
        },
      ],
    },
  },
]);
export const scenarioResourceDict = dictify(scenarioResourceList, obj => obj.getTypeId());
export const scenarioTypeIds = Object.keys(scenarioResourceDict);
