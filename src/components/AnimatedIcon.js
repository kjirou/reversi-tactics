import React from 'react';
import ReactDOM from 'react-dom';

import Icon from './Icon';


export default class AnimatedIcon extends React.Component {

  render() {
    let hpElement = null;
    if (this.props.hp !== null) {
      hpElement = <div className="hp"><span className="hp-text">{ this.props.hp }</span></div>;
    }

    let flipIconElement = null;
    if (this.props.flipIconId) {
      flipIconElement = <Icon iconId={ this.props.flipIconId } />;
    }

    return (
      <div className="animated-icon">
        <div className="icon-container">
          <div className="flip-icon-container">
            { flipIconElement }
          </div>
          <Icon iconId={ this.props.iconId } />
          { hpElement }
        </div>
      </div>
    );
  }
}

Object.assign(AnimatedIcon, {
  defaultProps: {
    hp: null,
    flipIconId: null,
  },
  propTypes: {
    hp: React.PropTypes.number,
    iconId: React.PropTypes.string.isRequired,
    flipIconId: React.PropTypes.string,
  },
});
