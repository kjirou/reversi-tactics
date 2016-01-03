import { Component } from 'flumpt';
import React from 'react';


export default class Scene extends Component {
}

Object.assign(Scene, {
  defaultProps: {
    scene: null,
  },
  propTypes: {
    root: React.PropTypes.object.isRequired,
    scene: React.PropTypes.object,
  },
});
