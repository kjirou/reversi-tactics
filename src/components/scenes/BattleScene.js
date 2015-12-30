import lodash from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';

import Board from '../Board';
import AnimatedIcon from '../AnimatedIcon';
import Icon from '../Icon';
import Scene from './Scene';


export default class BattleScene extends Scene {

  render() {

    return (
      <div className="scene battle-scene">
        <Board squares={ this.props.root.squares } />
        <div className="war-situation">
          <div className="black-side one-side">
            <div className="scoreboard">
              <div className="army-name">Uruk Hai</div>
              <div className="score">22</div>
            </div>
            <div className="unit-selector">
              <div className="unit">
                <AnimatedIcon iconId="goblin" />
                <div className="unit-name">Goblin</div>
              </div>
              <div className="unit">
                <AnimatedIcon iconId="orc" />
                <div className="unit-name">Orc</div>
              </div>
              <div className="unit">
              </div>
            </div>
          </div>
          <div className="white-side one-side">
            <div className="scoreboard">
              <div className="army-name">The Power Fighters</div>
              <div className="score">13</div>
            </div>
            <div className="unit-selector">
              <div className="unit">
                <AnimatedIcon iconId="fighter_reversed" />
                <div className="unit-name">Fighter</div>
              </div>
              <div className="unit">
                <AnimatedIcon iconId="knight_reversed" />
                <div className="unit-name">Knight</div>
              </div>
              <div className="unit">
              </div>
            </div>
          </div>
        </div>
        <div className="support-buttons">
          <div className="button">
            <Icon iconId="book" />
          </div>
          <div className="button">
            <Icon iconId="bird_male" />
          </div>
          <div className="button">
            <Icon iconId="frog" />
          </div>
        </div>
      </div>
    );
  }
}
