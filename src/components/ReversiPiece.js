import React from 'react';

import { REVERSI_PIECE_TYPES } from '../consts';


const ReversiPiece = ({ radius, reversiPieceType }) => {
  const width = radius * 2;
  const height = radius * 2;
  const fill = {
    [REVERSI_PIECE_TYPES.BLACK]: '#000000',
    [REVERSI_PIECE_TYPES.WHITE]: '#ffffff',
  }[reversiPieceType];

  return (
    <svg
      width={ width }
      height={ height }
      viewBox={ `0 0 ${width} ${height}` }
    >
      <circle cx={ radius } cy={ radius } r={ radius } fill={ fill } />
    </svg>
  );
};

Object.assign(ReversiPiece, {
  propTypes: {
    radius: React.PropTypes.number.isRequired,
    reversiPieceType: React.PropTypes.string.isRequired,
  },
});


export default ReversiPiece;
