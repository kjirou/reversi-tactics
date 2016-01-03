import assert from 'assert';
import { values } from 'lodash';

import { ARMY_COLORS, REVERSI_PIECE_TYPES } from '../consts';


export const within = (num, minNum, maxNum) => {
  return Math.min(Math.max(num, minNum), maxNum);
};

export const preventDefaultEvent = (event) => {
  if (event.preventDefault) {
    event.preventDefault();
  } else {
    event.returnValue = false;  // For IE
  }
};

export const preventEvents = (event) => {
  preventDefaultEvent(event);
  event.stopPropagation();
};

/*
 * Create class-based resources
 *
 * Mainly use this when you define the game data from JSON
 *
 * TODO: I want to set function.name
 *
 * @param {Function} BaseResource
 * @param {Array<object>} sourceDataList
 * @return {Array<Function>} - Sub class list
 */
export const createClassBasedResourceList = (BaseResource, sourceDataList) => {
  return sourceDataList.map(({ constants = {}, properties = {} }) => {
    class Resource extends BaseResource {
      constructor(...args) {
        super(...args);
        Object.assign(this, properties);
      }
    };
    Object.assign(Resource, constants);
    return Resource;
  });
};

/*
 * @param {string} armyColor - One of ARMY_COLORS
 */
export const getReversiPieceTypeFromArmyColor = (armyColor) => {
  assert(values(ARMY_COLORS).indexOf(armyColor) !== -1, `${ armyColor } is not a one of ARMY_COLORS`);
  return {
    [ARMY_COLORS.BLACK]: REVERSI_PIECE_TYPES.BLACK,
    [ARMY_COLORS.WHITE]: REVERSI_PIECE_TYPES.WHITE,
  }[armyColor];
};
