import lodash from 'lodash';
import { defineIntegerParameter } from 'rpgparameter';


const ParametersMixin = {};

defineIntegerParameter(ParametersMixin, 'maxHp');
defineIntegerParameter(ParametersMixin, 'attackPower');


export default ParametersMixin;
