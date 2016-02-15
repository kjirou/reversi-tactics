import React from 'react';

import Scene from './Scene';


export default class WelcomeScene extends Scene {
  render() {
    return (
      <div className="scene welcome-scene">
        <h1>Reversi Tactics</h1>
        <div className="touch-start">- Touch Start -</div>
      </div>
    );
  }
}
