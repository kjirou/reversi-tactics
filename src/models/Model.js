import lodash from 'lodash';


export default class Model {

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
