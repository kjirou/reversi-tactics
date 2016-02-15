import React from 'react';

import { EVENTS } from '../../consts';
import Scene from './Scene';


export default class WelcomeScene extends Scene {
  _onMouseDown() {
    this.dispatch(EVENTS.TOUCH_START);
  }

  render() {
    return (
      <div className="scene welcome-scene" onMouseDown={ this._onMouseDown.bind(this) }>
        <h1>Reversi Tactics</h1>
        <div className="touch-start">- Touch Start -</div>
      </div>
    );
  }
}
