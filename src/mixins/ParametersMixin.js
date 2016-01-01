import lodash from 'lodash';
import { defineIntegerParameter } from 'rpgparameter';

import { PARAMETERS } from '../consts';


const ParametersMixin = {};

defineIntegerParameter(ParametersMixin, 'maxHp', {
  default: PARAMETERS.MIN_MAX_HP,
});
defineIntegerParameter(ParametersMixin, 'attackPower');


export default ParametersMixin;
