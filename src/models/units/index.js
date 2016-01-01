import dictify from 'dictify';
import { classify } from 'underscore.string';

import { createClassBasedResourceList } from '../../lib/utils';
import UnitModel from './UnitModel';


export const unitResourceList = createClassBasedResourceList(UnitModel, [
  {
    constants: {
      _typeId: 'fighter',
    },
    properties: {
      _maxHp: 4,
      _attackPower: 2,
    },
  },
  {
    constants: {
      _typeId: 'goblin',
    },
    properties: {
      _maxHp: 3,
    },
  },
]);
export const unitResourceDict = dictify(unitResourceList, obj => obj.getTypeId());
