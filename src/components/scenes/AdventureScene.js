import React from 'react';

import Card from '../Card';
import MiniCard from '../MiniCard';
import sharedProps from './sharedProps';


export default class AdventureScene extends React.Component {

  _createDungeonCardElements() {
    const dungeonCardList = [
      {
        typeId: 'enemy',
      },
      {
        typeId: 'enemy',
      },
      {
        typeId: 'enemy',
      },
      {
        typeId: 'enemy',
      },
      {
        typeId: 'enemy',
      },
      {
        typeId: 'enemy',
      },
      {
        typeId: 'enemy',
      },
    ];

    return dungeonCardList
      .slice(0, 5)
      .map((dungeonCard, idx) => {
        return React.createElement(MiniCard, { key: 'mini-card-' + idx });
      })
    ;
  }

  render() {
    const dungeonCardElements = this._createDungeonCardElements();
    const cardElement = React.createElement(Card);

    return (
      <div className="scene adventure-scene">
        <div className="mini-dungeon-cards">
          { dungeonCardElements }
        </div>
        <div className="card-container">
          { cardElement }
        </div>
      </div>
    );
  }
}
