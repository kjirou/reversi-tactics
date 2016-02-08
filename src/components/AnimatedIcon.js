import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Icon from './Icon';


export default class AnimatedIcon extends Component {

  render() {
    let textElement = null;
    if (this.props.text) {
      const textClassName = ['text', ...this.props.textClassNames].join(' ');
      textElement = <div className={ textClassName }>{ this.props.text }</div>;
    }

    let flipIconElement = null;
    if (this.props.flipIconId) {
      flipIconElement = <Icon iconId={ this.props.flipIconId } />;
    }

    let hpElement = null;
    if (this.props.hp !== null) {
      hpElement = <div className="hp"><span className="hp-text">{ this.props.hp }</span></div>;
    }

    return (
      <div className="animated-icon">
        { textElement }
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
    text: '',
    textClassNames: [],
  },
  propTypes: {
    hp: React.PropTypes.number,
    iconId: React.PropTypes.string.isRequired,
    flipIconId: React.PropTypes.string,
    text: React.PropTypes.string,
    textClassNames: React.PropTypes.array,
  },
});
