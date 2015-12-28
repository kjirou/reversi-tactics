import Container from './Container';


export default class ModelContainer extends Container {

  constructor() {
    super();

    // TODO: tmp
    const _squares = Array.from({ length: 8 }).map((notUse, rowIndex) => {
      return Array.from({ length: 8 }).map((notUse, columnIndex) => {
        return {
          rowIndex,
          columnIndex,
          reversiPieceType: 'EMPTY',
          iconId: null,
          hp: 5,
        };
      });
    });

    //_squares[1][5].reversiPieceType = 'BLACK';
    //_squares[1][5].iconId = 'goblin';
    //_squares[2][4].reversiPieceType = 'BLACK';
    //_squares[2][4].iconId = 'fighter_reversed';
    //_squares[3][1].reversiPieceType = 'WHITE';
    //_squares[3][1].iconId = 'fighter_reversed';
    //_squares[3][2].reversiPieceType = 'WHITE';
    //_squares[3][2].iconId = 'goblin';
    _squares[3][3].reversiPieceType = 'WHITE';
    _squares[3][4].reversiPieceType = 'BLACK';
    //_squares[3][4].reversiPieceType = 'WHITE';
    _squares[4][3].reversiPieceType = 'BLACK';
    _squares[4][4].reversiPieceType = 'WHITE';

    this._squares = _squares;
  }

  get squares() { return this._squares; }
}
