import lodash from 'lodash';

import Model from './Model';
import SquareModel from './SquareModel';


export default class BoardModel extends Model {

  constructor(options = {}) {
    super();

    options = Object.assign({
      extent: [8, 8],
    }, options);

    this._squares = BoardModel._createSquares(options.extent);
  }

  static _createSquares([rowLength, columnLength]) {
    return lodash.range(rowLength).map(rowIndex => {
      return lodash.range(columnLength).map(columnIndex => {
        return new SquareModel({ rowIndex, columnIndex });
      });
    });
  }

  getExtent() {
    return [this._squares.length, this._squares[0].length];
  }

  getRowLength() {
    return this.getExtent()[0];
  }

  getColumnLength() {
    return this.getExtent()[1];
  }

  presentProps() {
    const props = {
      squares: this._squares.map(rowSquares => {
        return rowSquares.map(square => {
          return square.presentProps();
        });
      }),
    };
    return props;
  }
}
