import lodash from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';

import Board from '../Board';
import Icon from '../Icon';
import sharedProps from './sharedProps';


// TODO: tmp
const _squares = Array.from({ length: 8 }).map((notUse, rowIndex) => {
  return Array.from({ length: 8 }).map((notUse, columnIndex) => {
    return {
      rowIndex,
      columnIndex,
      reversiPieceType: 'EMPTY',
      iconId: null,
    };
  });
});

_squares[1][5].reversiPieceType = 'BLACK';
_squares[1][5].iconId = 'goblin';
_squares[2][4].reversiPieceType = 'BLACK';
_squares[3][1].reversiPieceType = 'WHITE';
_squares[3][1].iconId = 'goblin';
_squares[3][2].reversiPieceType = 'WHITE';
_squares[3][2].iconId = 'goblin';
_squares[3][3].reversiPieceType = 'WHITE';
_squares[3][4].reversiPieceType = 'WHITE';
_squares[4][3].reversiPieceType = 'BLACK';
_squares[4][4].reversiPieceType = 'WHITE';


export default class BattleScene extends React.Component {

  render() {

    return (
      <Board squares={ _squares } />
    );
  }
}
