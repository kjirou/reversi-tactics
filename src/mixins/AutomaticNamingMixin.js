import { humanize, titleize } from 'underscore.string';

import NamingMixin from './NamingMixin';


const AutomaticNamingMixin = Object.assign({}, NamingMixin, {

  getName() {
    if (this._name) {
      return this._name;
    }
    const typeId = this.typeId || (this.constructor || {}).typeId || null;
    if (typeId) {
      return titleize(humanize(typeId));
    }
    return null;
  }
});


export default AutomaticNamingMixin;
