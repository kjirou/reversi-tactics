import { Component } from 'flumpt';
import React from 'react';

import scenes from './scenes';


export default class Root extends Component {

  render() {
    const sceneId = 'GameScene';
    const sceneElement = React.createElement(scenes[sceneId], {
      key: sceneId,
      root: this.props,
      scene: {
        GameScene: this.props.scenes.game,
      }[sceneId] || null,
    });

    return (
      <div className="screen">
        { sceneElement }
      </div>
    );
  }
}
