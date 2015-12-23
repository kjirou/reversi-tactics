import React from 'react';

import Icon from './Icon';


export default class AnimatedIcon extends React.Component {

  render() {
    return (
      <div className="animated-icon">
        <div className="icon-container">
          <Icon iconId={ this.props.iconId } />
        </div>
      </div>
    );
  }
}

Object.assign(AnimatedIcon, {
  propTypes: {
    iconId: React.PropTypes.string.isRequired,
  },
});
