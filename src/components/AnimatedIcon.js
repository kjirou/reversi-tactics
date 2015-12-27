import React from 'react';

import Icon from './Icon';


export default class AnimatedIcon extends React.Component {

  render() {
    let hpElement = null;
    if (this.props.hp !== null) {
      hpElement = <div className="hp"><span className="hp-text">{ this.props.hp }</span></div>;
    }

    return (
      <div className="animated-icon">
        <div className="icon-container">
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
  },
  propTypes: {
    hp: React.PropTypes.number,
    iconId: React.PropTypes.string.isRequired,
  },
});
