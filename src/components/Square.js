import React from 'react';

import { REVERSI_PIECE_TYPES, STYLES } from '../consts';
import AnimatedIcon from './AnimatedIcon';
//import ReversiPiece from './ReversiPiece';


export default class Square extends React.Component {

  //_createReversiPieceContainerElement() {
  //  const reversiPieceElement = React.createElement(ReversiPiece, {
  //    radius: STYLES.REVERSI_PIECE_RADIUS,
  //    reversiPieceType: this.props.reversiPieceType,
  //  });
  //  return <div className="reversi-piece-container">{ reversiPieceElement }</div>;
  //}

  render() {
    //let reversiPieceContainerElement = null;
    //if (this.props.reversiPieceType !== REVERSI_PIECE_TYPES.EMPTY) {
    //  reversiPieceContainerElement = this._createReversiPieceContainerElement();
    //}

    const classNames = ['square'];
    if (this.props.reversiPieceType === REVERSI_PIECE_TYPES.BLACK) {
      classNames.push('black-piece');
    } else if (this.props.reversiPieceType === REVERSI_PIECE_TYPES.WHITE) {
      classNames.push('white-piece');
    }

    let iconElement = null;
    if (this.props.iconId) {
      iconElement = React.createElement(AnimatedIcon, {
        iconId: this.props.iconId,
      });
    }

    return (
      <div
        className={ classNames.join(' ') }
        style={ {
          top: this.props.top,
          left: this.props.left,
        } }
      >
        { iconElement }
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
    iconId: React.PropTypes.string,
  },
});
