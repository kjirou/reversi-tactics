import lodash from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';

import Board from '../Board';
import Icon from '../Icon';
import sharedProps from './sharedProps';


export default class BattleScene extends React.Component {

  render() {
    // TODO: tmp
    const squares = Array.from({ length: 8 }).map(rowIndex => {
      return Array.from({ length: 8 }).map(columnIndex => {
        return {
          rowIndex,
          columnIndex,
        };
      });
    });

    return (
      <Board squares={ squares } />
    );
  }
}
