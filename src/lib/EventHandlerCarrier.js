/*
 * Wrap event handler for carrying to partial components
 *
 * It is mainly to avoid dependence on "this"
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
    const boundHandler = this._eventHandler.bind(emitter);
    return event => boundHandler(event, { emitter });
  }
}
