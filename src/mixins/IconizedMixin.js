import { ICON_IDS } from '../lib/icon-ids';


const IconizedMixin = {

  _iconId: null,

  _guessIconId() {
    if (this.getTypeId && ICON_IDS.indexOf(this.getTypeId()) !== -1) {
      return this.getTypeId();
    }
    return 'invalid';
  },

  getIconId() {
    return this._iconId || this._guessIconId();
  },
};


export default IconizedMixin;
