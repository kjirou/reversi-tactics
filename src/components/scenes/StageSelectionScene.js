import React from 'react';

import { EVENTS } from '../../consts';
import NavigationBar from './NavigationBar';
import Scene from './Scene';


export default class StageSelectionScene extends Scene {
  render() {
    return (
      <div className="scene stage_selection-scene">
        <NavigationBar />
        <div className="scene-except-navigation-bar">
          <h1>Stage Selection</h1>
        </div>
      </div>
    );
  }
}
