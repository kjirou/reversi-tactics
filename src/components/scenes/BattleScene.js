import lodash from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';

import Board from '../Board';
import Icon from '../Icon';
import sharedProps from './sharedProps';


export default class BattleScene extends React.Component {

  render() {
    // TODO: tmp
    const squares = Array.from({ length: 8 }).map((notUse, rowIndex) => {
      return Array.from({ length: 8 }).map((notUse, columnIndex) => {
        return {
          rowIndex,
          columnIndex,
          reversiPieceType: {
            0: 'EMPTY',
            1: 'BLACK',
            2: 'WHITE',
          }[(rowIndex * 8 + columnIndex) % 3],
        };
      });
    });

    return (
      <Board squares={ squares } />
    );
  }
}
