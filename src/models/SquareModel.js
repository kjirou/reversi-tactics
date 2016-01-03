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

  presentProps() {
    let iconId = null;
    let hp = null;

    if (this._battler) {
      iconId = this._battler.getUniformedIconId(this._battler.getBelongingArmy().color);
      hp = this._battler.hp;
    }

    return {
      position: this._position.slice(),
      rowIndex: this._getRowIndex(),
      columnIndex: this._getColumnIndex(),
      reversiPieceType: this._reversiPieceType,
      iconId,
      hp,
    };
  }
}
