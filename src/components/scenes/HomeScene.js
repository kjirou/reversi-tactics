import React from 'react';

import { EVENTS } from '../../consts';
import NavigationBar from './NavigationBar';
import Scene from './Scene';


export default class HomeScene extends Scene {
  _onClickStartBattle() {
    this.dispatch(EVENTS.TOUCH_START_BATTLE);
  }

  render() {
    return (
      <div className="scene home-scene">
        <NavigationBar />
        <div className="scene-except-navigation-bar">
          <h1>Your Army</h1>
          <div className="start-battle" onClick={ this._onClickStartBattle.bind(this) }>Start a Battle</div>
        </div>
      </div>
    );
  }
}
