import { Flux } from 'flumpt';
import React from 'react';

import Root from './components/Root';
import { EVENTS } from './consts';
import { bindLogics, logics } from './logics';
import AppModel from './models/AppModel';


export default class App extends Flux {

  constructor({ renderer }) {
    const appModel = new AppModel();

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
    this._logics = bindLogics(logics, appModel);
  }

  static _createState(appModel) {
    const appProps = appModel.presentProps();
    return appProps;
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

  _onPromiseError(err) {
    console.error(err.stack || err);
  }

  subscribe() {
    this._onDispatch(EVENTS.TOUCH_SQUARE, ({ position }) => {
      this._logics
        .touchSquare(position)
        .then(() => this.update(() => this._createState()))
        .catch(this._onPromiseError)
      ;
    })

    this._onDispatch(EVENTS.TOUCH_START, () => {
      this._logics
        .touchStart()
        .then(() => this.update(() => this._createState()))
        .catch(this._onPromiseError)
      ;
    })
  }

  render(state) {
    return React.createElement(Root, state);
  }
}
