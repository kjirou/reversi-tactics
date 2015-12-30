/*
 * Pass event handler to child components
 */
export default class EventHandlerCarrier {

  /*
   * @param {Function} eventHandler
   */
  constructor(eventHandler = event => {}) {
    this._eventHandler = eventHandler;
  }

  /*
   * @param {ReactElement} emitter
   */
  bindContext(emitter) {
    return event => {
      this._eventHandler.bind(emitter)(event, { emitter })
    };
  }
}
