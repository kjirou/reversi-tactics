import { Component } from 'flumpt';
import React from 'react';
//import LateArrival from 'react-late-arrival';
import LateArrival from '../lib/react-late-arrival';

import { REVERSI_PIECE_TYPES, STYLES } from '../consts';
import EventHandlerCarrier from '../lib/EventHandlerCarrier';
import AnimatedIcon from './AnimatedIcon';


export default class Square extends Component {

  _createAnimatedIconElement() {
    const props = {
      realProps: {
        iconId: this.props.square.iconId,
        hp: this.props.square.hp,
      },
      transitions: this.props.square.iconTransitions,
    };

    return (
      <LateArrival { ...props } >
        { (props) => <AnimatedIcon { ...props } /> }
      </LateArrival>
    );
  }

  render() {
    // TODO: should expand the square prop in after
    Object.assign(this.props.square, {
      // {string|null} - string is one of REVERSI_PIECE_TYPES
      placementSuggestion: this.props.square.placementSuggestion || null,
    });

    const classNames = ['square'];
    if (this.props.square.reversiPieceType === REVERSI_PIECE_TYPES.BLACK) {
      classNames.push('black-piece');
    } else if (this.props.square.reversiPieceType === REVERSI_PIECE_TYPES.WHITE) {
      classNames.push('white-piece');
    }
    if (this.props.square.placementSuggestion === REVERSI_PIECE_TYPES.BLACK) {
      classNames.push('suggested-piece suggested-black-piece');
    } else if (this.props.square.placementSuggestion === REVERSI_PIECE_TYPES.WHITE) {
      classNames.push('suggested-piece suggested-white-piece');
    }

    let iconElement = null;
    if (this.props.square.iconId) {
      iconElement = this._createAnimatedIconElement();
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
