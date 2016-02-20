import { createClassBasedResourceList } from '@kjirou/utils';
import dictify from 'dictify';

import StageModel from './StageModel';


export const stageResourceList = createClassBasedResourceList(StageModel, [
  {
    constants: {
      _typeId: 'fighter',
    },
  },
//  {
//    constants: {
//      _typeId: 'goblin',
//    },
//    properties: {
//      _maxHp: 3,
//    },
//  },
]);
export const stageResourceDict = dictify(stageResourceList, obj => obj.getTypeId());
export const stageTypeIds = Object.keys(stageResourceDict);
