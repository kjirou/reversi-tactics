import { Component } from 'flumpt';
import React from 'react';

import scenes from './scenes';


export default class Root extends Component {

  render() {
    const SceneComponent = scenes[this.props.sceneId];
    const sceneElement = React.createElement(SceneComponent, {
      key: this.props.sceneId,
      root: this.props,
      scene: this.props.scene,
    });

    return (
      <div className="screen">
        { sceneElement }
      </div>
    );
  }
}
