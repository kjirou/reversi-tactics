import { Component } from 'flumpt';
import React from 'react';

import { REVERSI_PIECE_TYPES, STYLES } from '../consts';
import EventHandlerCarrier from '../lib/EventHandlerCarrier';
import AnimatedIcon from './AnimatedIcon';


export default class Square extends Component {

  render() {
    const classNames = ['square'];
    if (this.props.square.reversiPieceType === REVERSI_PIECE_TYPES.BLACK) {
      classNames.push('black-piece');
    } else if (this.props.square.reversiPieceType === REVERSI_PIECE_TYPES.WHITE) {
      classNames.push('white-piece');
    }

    let iconElement = null;
    if (this.props.square.iconId) {
      iconElement = React.createElement(AnimatedIcon, {
        iconId: this.props.square.iconId,
        hp: this.props.square.hp,
      });
    }

    return (
      <div
        className={ classNames.join(' ') }
        style={ {
          top: this.props.top,
          left: this.props.left,
        } }
        onMouseDown={ this.props.onMouseDownCarrier ? this.props.onMouseDownCarrier.bindContext(this) : null }
      >
        { iconElement }
      </div>
    );
  }
}

Object.assign(Square, {
  defaultProps: {
    onMouseDownCarrier: null,
  },
  propTypes: {
    top: React.PropTypes.number.isRequired,
    left: React.PropTypes.number.isRequired,
    square: React.PropTypes.object.isRequired,
    onMouseDownCarrier: React.PropTypes.instanceOf(EventHandlerCarrier),
  },
});
