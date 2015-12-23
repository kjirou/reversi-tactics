import lodash from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';

//import EventHandlerCarrier from 'lib/EventHandlerCarrier';
//import { preventEvents, scrollUpToUnderline } from 'lib/utils';
//import ObjectBar from '../ObjectBar';
import Icon from '../Icon';
import sharedProps from './sharedProps';


class Square extends React.Component {

  render() {
    return (
      <div>
      </div>
    );
  }
}


class Board extends React.Component {

  render() {
    return (
      <div className="board">
        <div className="board-inner"></div>
      </div>
    );
  }
}


export default class BattleScene extends React.Component {

  render() {
    return (
      <Board />
    );
  }
}
