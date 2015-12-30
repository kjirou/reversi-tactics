import { Flux } from 'flumpt';
import React from 'react';

import Root from './components/Root';
import { EVENTS } from './consts';
import ModelContainer from './containers/ModelContainer';
import AppModel from './models/AppModel';


export default class App extends Flux {

  constructor({ renderer }) {
    const appModel = new AppModel();

    super({
      renderer,
      initialState: App._createState(appModel),
    });

    this._appModel = appModel;
  }

  static _createState(appModel) {
    const boardProps = appModel.board.presentProps();
    return {
      squares: boardProps.squares,
    };
  }

  _createState() {
    return App._createState(this._appModel);
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
      this._appModel.touchSquare([rowIndex, columnIndex]);
      this.update(state => this._createState() );
    })
  }

  render(state) {
    return React.createElement(Root, state);
  }
}
