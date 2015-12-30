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

  static _createInitialState() {
    const modelContainer = ModelContainer.getInstance();
    const state = {
      squares: modelContainer.squares,
    };
    return state;
  }

  /*
   * Attach logging to events triggered by "dispatch"
   */
  _onDispatch(eventName, handler) {
    this.on(eventName, (...args) => {
      console.log('dispatch:', eventName, ...args);
      handler(...args);
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
