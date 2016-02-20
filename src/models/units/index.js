import { createClassBasedResourceList } from '@kjirou/utils';
import dictify from 'dictify';

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
  {
    constants: {
      _typeId: 'knight',
    },
    properties: {
      _maxHp: 8,
    },
  },
  {
    constants: {
      _typeId: 'orc',
    },
    properties: {
      _maxHp: 5,
      _attackPower: 2,
    },
  },
  {
    constants: {
      _typeId: 'vigilante',
    },
  },
]);
export const unitResourceDict = dictify(unitResourceList, obj => obj.getTypeId());
export const unitTypeIds = Object.keys(unitResourceDict);
