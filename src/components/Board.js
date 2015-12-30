import { Component } from 'flumpt';
import React from 'react';

import { STYLES } from '../consts';
import EventHandlerCarrier from '../lib/EventHandlerCarrier';
import Square from './Square';


export default class Board extends Component {

  _createSquareElements() {
    const elements = [];
    this.props.squares.forEach((rowSquares, rowIndex) => {
      rowSquares.forEach((square, columnIndex) => {
        elements.push(React.createElement(Square, {
          key: `square-${ rowIndex }-${ columnIndex }`,
          top: STYLES.SQUARE_HEIGHT * rowIndex + STYLES.SQUARE_MARGIN * (rowIndex + 1),
          left: STYLES.SQUARE_WIDTH * columnIndex + STYLES.SQUARE_MARGIN * (columnIndex + 1),
          square,
          onMouseDownCarrier: this.props.onMouseDownSquareCarrier,
        }));
      });
    });
    return elements;
  }

  render() {
    const squareElements = this._createSquareElements();

    return (
      <div className="board">
        <div className="board-inner">
          { squareElements }
        </div>
      </div>
    );
  }
}

Object.assign(Board, {
  defaultProps: {
    onMouseDownSquareCarrier: null,
  },
  propTypes: {
    squares: React.PropTypes.array.isRequired,
    onMouseDownSquareCarrier: React.PropTypes.instanceOf(EventHandlerCarrier),
  },
});
