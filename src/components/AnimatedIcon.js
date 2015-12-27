import React from 'react';

import Icon from './Icon';


export default class AnimatedIcon extends React.Component {

  render() {
    return (
      <div className="animated-icon">
        <div className="icon-container">
          <Icon iconId={ this.props.iconId } />
          <div className="hp"><span className="hp-text">{ this.props.hp }</span></div>
        </div>
      </div>
    );
  }
}

Object.assign(AnimatedIcon, {
  propTypes: {
    hp: React.PropTypes.number.isRequired,
    iconId: React.PropTypes.string.isRequired,
  },
});
