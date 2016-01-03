import { range } from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';

import { ARMY_COLORS, EVENTS, PARAMETERS } from '../../consts';
import EventHandlerCarrier from '../../lib/EventHandlerCarrier';
import { preventEvents } from '../../lib/utils';
import Board from '../Board';
import AnimatedIcon from '../AnimatedIcon';
import Icon from '../Icon';
import Scene from './Scene';


export default class BattleScene extends Scene {

  _createBoardElement() {
    return React.createElement(Board, {
      key: 'board',
      squares: this.props.scene.squares,
      onMouseDownSquareCarrier: new EventHandlerCarrier((event, { emitter }) => {
        preventEvents(event);
        emitter.dispatch(EVENTS.TOUCH_SQUARE, {
          position: emitter.props.square.position,
        });
      }),
    });
  }

  _createArmyElement(armyColor) {
    const props = this.props.scene.armies[armyColor];
    const classNames = ['one-side'];
    if (armyColor === ARMY_COLORS.BLACK) {
      classNames.push('black-side');
    } else {
      classNames.push('white-side');
    }

    const battlerSelectorItems = range(PARAMETERS.MAX_VISIBLE_BATTLER_COUNT).map(index => {
      const battlerProps = props.visibleBattlers[index] || null;
      let iconElement = null;
      let nameElement = null;
      if (battlerProps) {
        iconElement = React.createElement(AnimatedIcon, { iconId: battlerProps.iconId });
        nameElement = React.DOM.div({
          key: 'battler-name',
          className: 'battler-name',
        }, battlerProps.name);
      }

      return (
        <div key={ `battler-selector-item-${ index }` } className="battler">
          { iconElement }
          { nameElement }
        </div>
      );
    });

    return (
      <div key={ `army-${ armyColor }` } className={ classNames.join(' ') }>
        <div className="scoreboard">
          <div className="army-name">{ props.name }</div>
          <div className="score">{ props.score }</div>
        </div>
        <div className="battler-selector">
          { battlerSelectorItems }
        </div>
      </div>
    );
  }

  render() {
    const boardElement = this._createBoardElement();
    const blackArmyElement = this._createArmyElement(ARMY_COLORS.BLACK);
    const whiteArmyElement = this._createArmyElement(ARMY_COLORS.WHITE);

    return (
      <div className="scene game-scene">
        { boardElement }
        <div className="armies">
          { blackArmyElement }
          { whiteArmyElement }
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
