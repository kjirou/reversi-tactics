import { Flux } from 'flumpt';
import React from 'react';

import Root from './components/Root';
import { EVENTS } from './consts';
import { bindLogics, logics } from './logics';
import AppModel from './models/AppModel';


export default class App extends Flux {

  constructor({ renderer }) {
    const appModel = new AppModel();  // Can not use "this" before super

    super({
      renderer,
      initialState: App._createState(appModel),
      middlewares: [
        state => {
          console.log('update:', state);
          return state;
        }
      ]
    });

    this._appModel = appModel;

    // If use the original "subscribe" in called constructor,
    //   it could not pass values via "this".
    this._subscribe();
  }

  static _createState(appModel) {
    return appModel.presentProps();
  }

  _createState() {
    return App._createState(this._appModel);
  }

  /*
   * Register event handler with some preprocessing
   */
  _onDispatch(eventName, handler) {
    const boundHandler = handler.bind(this);
    this.on(eventName, (...args) => {
      console.log('dispatch:', eventName, ...args);
      boundHandler(...args);
    });
  }

  _subscribe() {
    const {
      touchSquare,
      touchStart,
    } = bindLogics(logics, this._appModel);

    const queueUpdate = promise => {
      promise
        .then(() => this.update(() => this._createState()))
        .catch(err => console.error(err.stack || err))
      ;
    };

    this._onDispatch(EVENTS.TOUCH_SQUARE, ({ position }) => {
      queueUpdate(touchSquare(position));
    });

    this._onDispatch(EVENTS.TOUCH_START, () => {
      queueUpdate(touchStart());
    });
  }

  render(state) {
    return React.createElement(Root, state);
  }
}
