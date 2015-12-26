import React from 'react';

import { REVERSI_PIECE_TYPES, STYLES } from '../consts';
import ReversiPiece from './ReversiPiece';


export default class Square extends React.Component {

  _createReversiPieceContainerElement() {
    const reversiPieceElement = React.createElement(ReversiPiece, {
      radius: STYLES.REVERSI_PIECE_RADIUS,
      reversiPieceType: this.props.reversiPieceType,
    });
    return <div className="reversi-piece-container">{ reversiPieceElement }</div>;
  }

  render() {
    let reversiPieceContainerElement = null;
    if (this.props.reversiPieceType !== REVERSI_PIECE_TYPES.EMPTY) {
      reversiPieceContainerElement = this._createReversiPieceContainerElement();
    }

    return (
      <div
        className="square"
        style={ {
          top: this.props.top,
          left: this.props.left,
        } }
      >
        { reversiPieceContainerElement }
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
