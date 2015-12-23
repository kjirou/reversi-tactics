import React from 'react';


export default class Icon extends React.Component {

  render() {
    const classNames = [
      'icon',
      this.props.iconId + '-icon',
    ];

    return <div className={ classNames.join(' ') } />;
  }
}

Object.assign(Icon, {
  propTypes: {
    iconId: React.PropTypes.string.isRequired,
  },
});
