import React from 'react';

import { EVENTS } from '../../consts';
import AnimatedIcon from '../AnimatedIcon';
import NavigationBar from './NavigationBar';
import Scene from './Scene';


export default class StageSelectionScene extends Scene {

  _createMissionScenarioElements() {
    return [
      <li key="mission-scenario-1" className="scenario-item">
        <div className="left-side side">
          <div className="scenario-icon-container">
            <AnimatedIcon iconId="goblin" />
          </div>
        </div>
        <div className="right-side side">
          <div className="scenario-name">Goblin Cave</div>
          <ul>
            <li className="lv">Lv: 99</li>
            <li className="mr">Mr: 3</li>
            <li className="progress">Stg: 2/5</li>
          </ul>
        </div>
      </li>,
    ];
  }

  _createPartitionedScenarioElements() {
    return [
      <li key="mission-partition" className="partition">Mission</li>,
      ...this._createMissionScenarioElements(),
      <li key="campaign-partition" className="partition">Campaign</li>,
    ];
  }

  render() {
    const partitionedScenarioElements = this._createPartitionedScenarioElements();

    return (
      <div className="scene stage_selection-scene">
        <NavigationBar />
        <div className="scene-except-navigation-bar">
          <h1>Stage Selection</h1>
          <ul className="scenario-items">
            { partitionedScenarioElements }
          </ul>
        </div>
      </div>
    );
  }
}
