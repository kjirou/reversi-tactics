import { Flux } from 'flumpt';
import React from 'react';

import Root from './components/Root';
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
  }

  render(state) {
    return React.createElement(Root, state);
  }
}
