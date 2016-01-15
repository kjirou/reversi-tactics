import React from 'react';
import ReactDOM from 'react-dom';

import { createSlashQuery } from '../lib/animation-query-builder';
import Icon from './Icon';


class FlipBook extends React.Component {

  // TODO: zIndex, text
  _showFlip(partialQuery) {
    const domNode = ReactDOM.findDOMNode(this);
    const flip = window.document.createElement('div');

    flip.classList.add('icon-flip');
    flip.classList.add(partialQuery.className);

    return new Promise(resolve => {
      setTimeout(() => {
        domNode.appendChild(flip);
        setTimeout(() => {
          domNode.removeChild(flip);
          resolve();
        }, partialQuery.duration);
      }, partialQuery.delay);
    });
  }

  _runAnimationQuery() {
    return this.props.animationQuery.reduce((lastPromise, partialQuery) => {
      const promise = lastPromise.then(() => this._showFlip(partialQuery));
      if (partialQuery.async) {
        return Promise.resolve();
      } else {
        return promise;
      }
    }, Promise.resolve());
  }

  componentDidMount() {
    this._runAnimationQuery()
      .catch(err => console.error(err.stack || err))
    ;
  }

  componentDidUpdate() {
    this._runAnimationQuery()
      .catch(err => console.error(err.stack || err))
    ;
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
          <FlipBook animationQuery={ this.props.animationQuery } />
          <Icon iconId={ this.props.iconId } />
          { hpElement }
        </div>
      </div>
    );
  }
}

Object.assign(AnimatedIcon, {
  defaultProps: {
    //animationQuery: [],
    animationQuery: createSlashQuery(),
    hp: null,
  },
  propTypes: {
    animationQuery: React.PropTypes.array,
    hp: React.PropTypes.number,
    iconId: React.PropTypes.string.isRequired,
  },
});
