import { REVERSI_PIECE_TYPES } from '../consts';
import Model from './Model';


export default class SquareModel extends Model {

  constructor({ rowIndex, columnIndex }) {
    super();

    this._rowIndex = rowIndex;
    this._columIndex = columnIndex;
    this._reversiPieceType = REVERSI_PIECE_TYPES.EMPTY;
  }

  set reversiPieceType(value) { this._reversiPieceType = value; }

  presentProps() {
    return {
      rowIndex: this._rowIndex,
      columnIndex: this._columIndex,
      reversiPieceType: this._reversiPieceType,
    }
  }
}
