import React from 'react';

import { EVENTS } from '../../consts';
import NavigationBar from './NavigationBar';
import Scene from './Scene';


export default class HomeScene extends Scene {
  render() {
    return (
      <div className="scene home-scene">
        <NavigationBar />
        <div className="scene-except-navigation-bar">
          HomeScene
        </div>
      </div>
    );
  }
}
