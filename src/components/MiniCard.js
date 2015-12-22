import React from 'react';


export default class MiniCard extends React.Component {

  render() {

    return (
      <div className="mini-card">
        <div className="status">E</div>
        <div className="icon-container">
          <div className="goblin-icon icon" />
        </div>
        <div className="buffs"></div>
      </div>
    );
  }
}
