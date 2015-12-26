import React from 'react';

import { REVERSI_PIECE_TYPES } from '../consts';
import ReversiPiece from './ReversiPiece';


export default class Square extends React.Component {

  render() {
    let reversiPieceElement = null;
    if (this.props.reversiPieceType !== REVERSI_PIECE_TYPES.EMPTY) {
      reversiPieceElement = React.createElement(ReversiPiece, {
        radius: 18,
        reversiPieceType: this.props.reversiPieceType,
      });
    }

    return (
      <div
        className="square"
        style={ {
          top: this.props.top,
          left: this.props.left,
        } }
      >
        { reversiPieceElement }
      </div>
    );
  }
}

Object.assign(Square, {
  propTypes: {
    top: React.PropTypes.number.isRequired,
    left: React.PropTypes.number.isRequired,
    rowIndex: React.PropTypes.number.isRequired,
    columnIndex: React.PropTypes.number.isRequired,
    reversiPieceType: React.PropTypes.string.isRequired,
  },
});
