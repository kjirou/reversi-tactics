import { Component } from 'flumpt';
import React from 'react';

import scenes from './scenes';


export default class Root extends Component {

  render() {
    const sceneId = 'BattleScene';
    const sceneElement = React.createElement(scenes[sceneId], {
      key: sceneId,
      root: this.props,
    });

    return (
      <div className="screen">
        { sceneElement }
      </div>
    );
  }
}
