import { Flux } from 'flumpt';
import React from 'react';

import Root from './components/Root';
import { EVENTS } from './consts';
import ModelContainer from './containers/ModelContainer';


export default class App extends Flux {

  constructor({ renderer }) {
    super({
      renderer,
      initialState: App._createInitialState(),
    });
  }

  static _createState() {
    const modelContainer = ModelContainer.getInstance();
    const boardProps = modelContainer.board.presentProps();
    return {
      squares: boardProps.squares,
    };
  }

  static _createInitialState() {
    return App._createState();
  }

  /*
   * Attach logging to events triggered by "dispatch"
   */
  _onDispatch(eventName, handler) {
    const boundHandler = handler.bind(this);
    this.on(eventName, (...args) => {
      console.log('dispatch:', eventName, ...args);
      boundHandler(...args);
    });
  }

  subscribe() {
    this._onDispatch(EVENTS.TOUCH_SQUARE, ({ rowIndex, columnIndex }) => {
    })
  }

  render(state) {
    return React.createElement(Root, state);
  }
}
