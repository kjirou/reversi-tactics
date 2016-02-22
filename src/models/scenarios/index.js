import { createClassBasedResourceList } from '@kjirou/utils';
import dictify from 'dictify';

import ScenarioModel from './ScenarioModel';


export const scenarioResourceList = createClassBasedResourceList(ScenarioModel, [
  {
    constants: {
      _typeId: 'goblin_cave',
      _stages: [
      ],
    },
  },
]);
export const scenarioResourceDict = dictify(scenarioResourceList, obj => obj.getTypeId());
export const scenarioTypeIds = Object.keys(scenarioResourceDict);
