import BoardModel from '../models/BoardModel';
import Container from './Container';


export default class ModelContainer extends Container {

  constructor() {
    super();

    this._board = new BoardModel();
    // TODO: Tmp
    this._board._squares[3][3].reversiPieceType = 'WHITE';
    this._board._squares[3][4].reversiPieceType = 'BLACK';
    this._board._squares[4][3].reversiPieceType = 'BLACK';
    this._board._squares[4][4].reversiPieceType = 'WHITE';
  }

  get board() { return this._board; }
}
