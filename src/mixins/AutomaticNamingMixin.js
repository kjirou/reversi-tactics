import { humanize, titleize } from 'underscore.string';

import NamingMixin from './NamingMixin';


const AutomaticNamingMixin = Object.assign({}, NamingMixin, {

  getName() {
    if (this._name) {
      return this._name;
    }

    let typeId = this.getTypeId && this.getTypeId() ||
      this.constructor && this.constructor.getTypeId && this.constructor.getTypeId() ||
      null;

    if (typeId) {
      typeId = titleize(humanize(typeId));
    }

    return typeId;
  }
});


export default AutomaticNamingMixin;
