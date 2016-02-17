import { Component } from 'flumpt';
import React from 'react';

import { EVENTS } from '../../consts';


export default class NavigationBar extends Component {
  _onTouchItem(index) {
    this.dispatch(EVENTS.TOUCH_NAVIGATION_BAR_ITEM, { index });
  }

  _createItemElements() {
    return [
      'Home',
      'Army',
      'Config',
      'Help',
    ].map((label, index) => {
      return <div
        key={ 'navigation-bar-item-' + index }
        className="navigated-item"
        onMouseDown={ this._onTouchItem.bind(this, index) }
      >{ label }</div>
    });
  }

  render() {
    const itemElements = this._createItemElements();

    return (
      <div className="navigation-bar">
        { itemElements }
      </div>
    );
  }
}
