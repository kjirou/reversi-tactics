/*
 * Pass event handler to child components
 *
 * TODO: Is this right?
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
   * @param {Event} event
   */
  bindContexts(emitter, event) {
    return this._eventHandler.bind(emitter, event, { emitter });
  }
}
