import { ARMY_COLORS, REVERSI_PIECE_TYPES } from '../consts';
import Model from './Model';


export default class SquareModel extends Model {

  constructor({ position }) {
    super();

    /*
     * {Array<number>} - [rowIndex, columnIndex]
     */
    this._position = position;
    this._reversiPieceType = REVERSI_PIECE_TYPES.EMPTY;
    this._battler = null;
  }

  get position() { return this._position; }
  get reversiPieceType() { return this._reversiPieceType; }
  set reversiPieceType(value) { this._reversiPieceType = value; }
  get battler() { return this._battler; }
  set battler(value) { this._battler = value; }

  _getRowIndex() {
    return this._position[0];
  }

  _getColumnIndex() {
    return this._position[1];
  }

  _getIconId() {
    if (!this._battler) {
      return null;
    }
    return this._battler.isIconReversed() ? this._battler.getReversedIconId() : this._battler.getIconId();
  }

  presentProps() {
    return {
      position: this._position.slice(),
      rowIndex: this._getRowIndex(),
      columnIndex: this._getColumnIndex(),
      reversiPieceType: this._reversiPieceType,
      iconId: this._getIconId(),
    };
  }
}
