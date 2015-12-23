import React from 'react';

import scenes from './scenes';


export default class Root extends React.Component {

  render() {
    const sceneId = 'BattleScene';
    const sceneProps = {
      key: sceneId,
    };
    const sceneElement = React.createElement(scenes[sceneId], sceneProps);

    return (
      <div className="screen">
        { sceneElement }
      </div>
    );
  }
}
