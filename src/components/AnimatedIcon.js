import React from 'react';
import ReactDOM from 'react-dom';

import Icon from './Icon';


class FlipBook extends React.Component {

  _showIconFlip(animationQuery) {
    animationQuery = Object.assign({}, {
      wait: 0,
      duration: 0,
      className: '',
    }, animationQuery);

    const domNode = ReactDOM.findDOMNode(this);
    const flip = window.document.createElement('div');
    flip.classList.add('icon-flip');
    flip.classList.add(animationQuery.className);
    setTimeout(() => {
      domNode.appendChild(flip);
      setTimeout(() => {
        domNode.removeChild(flip);
      }, animationQuery.duration);
    }, animationQuery.wait);
  }

  _runAnimationQueies() {
    this.props.animationQueries.forEach(animationQuery => {
      this._showIconFlip(animationQuery);
    });
  }

  componentDidMount() {
    this._runAnimationQueies();
  }

  componentDidUpdate() {
    this._runAnimationQueies();
  }

  render() {
    return <div className="flip-book" />;
  }
}

export default class AnimatedIcon extends React.Component {

  render() {
    let hpElement = null;
    if (this.props.hp !== null) {
      hpElement = <div className="hp"><span className="hp-text">{ this.props.hp }</span></div>;
    }

    return (
      <div className="animated-icon">
        <div className="icon-container">
          <FlipBook animationQueries={ this.props.animationQueries } />
          <Icon iconId={ this.props.iconId } />
          { hpElement }
        </div>
      </div>
    );
  }
}

Object.assign(AnimatedIcon, {
  defaultProps: {
    animationQueries: [
      // TODO:
      //{
      //  wait: 100,
      //  duration: 100,
      //  className: 'slash-1-icon',
      //},
      //{
      //  wait: 200,
      //  duration: 100,
      //  className: 'slash-2-icon',
      //},
      //{
      //  wait: 300,
      //  duration: 100,
      //  className: 'slash-1-icon',
      //},
    ],
    hp: null,
  },
  propTypes: {
    animationQueries: React.PropTypes.array,
    hp: React.PropTypes.number,
    iconId: React.PropTypes.string.isRequired,
  },
});
