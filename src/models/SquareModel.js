import { REVERSI_PIECE_TYPES } from '../consts';
import Model from './Model';


export default class SquareModel extends Model {

  constructor({ position }) {
    super();

    this._position = position;
    this._reversiPieceType = REVERSI_PIECE_TYPES.EMPTY;
  }

  get position() { return this._position; }
  get reversiPieceType() { return this._reversiPieceType; }
  set reversiPieceType(value) { this._reversiPieceType = value; }

  _getRowIndex() {
    return this._position[0];
  }

  _getColumnIndex() {
    return this._position[1];
  }

  presentProps() {
    return {
      position: this._position.slice(),
      rowIndex: this._getRowIndex(),
      columnIndex: this._getColumnIndex(),
      reversiPieceType: this._reversiPieceType,
    }
  }
}
