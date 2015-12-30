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

  subscribe() {
    this.on(EVENTS.TOUCH_SQUARE, (data) => {
      console.log(data);
    })
  }

  render(state) {
    return React.createElement(Root, state);
  }
}
