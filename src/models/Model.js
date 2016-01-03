import lodash from 'lodash';
import uuid from 'uuid';


export default class Model {

  constructor() {
    this._uid = this._createUid();
  }

  get uid() { return this._uid; }

  _createUid() {
    return uuid.v4();
  }

  /*
   * Present primitive variables for a view that is one-to-one this model
   *
   * In most cases, it is used for React.Component
   *
   * @return {Object}
   */
  presentProps() {
    throw new Error('Not Implemented');
  }
}
