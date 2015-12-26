import React from 'react';


export default class Square extends React.Component {

  render() {

    return (
      <div
        className="square"
        style={ {
          top: this.props.top,
          left: this.props.left,
        } }
      >
        sq
      </div>
    );
  }
}

Object.assign(Square, {
  propTypes: {
    top: React.PropTypes.number.isRequired,
    left: React.PropTypes.number.isRequired,
    rowIndex: React.PropTypes.number.isRequired,
    columnIndex: React.PropTypes.number.isRequired,
  },
});
