import { Cell, CellState } from "./Cell";

export default class Grid{
    private _cellGrid : Cell[][];

    private _tryCount : number;

    private _wordLength : number;

    private _currentRow : number;

    constructor(wordLength: number, tryCount: number){
        this._tryCount = tryCount;
        this._wordLength = wordLength;

        this._cellGrid = Array.from({length: tryCount}, 
                    () => Array.from({length: wordLength}, () => new Cell()));

        this._currentRow = 0;

        /*this.getLetterAt = this.getLetterAt.bind(this);
        this.setLetterAt = this.setLetterAt.bind(this);
        this.getStateAt = this.getStateAt.bind(this);
        this.setStateAt = this.setStateAt.bind(this);*/
    }

    get CurrentRow() {
        return this._currentRow;
    }

    get TryCount() {
        return this._tryCount
    }

    get WordLength() {
        return this._wordLength;
    }

    public nextRow() {
        if(this._currentRow + 1 >= this._tryCount){
            throw Error("Out of bounds");
        }

        this._currentRow++;
    }

    public getLetterAt(x : number, y:number) {
        return this._cellGrid[y][x].CellLetter;
    }


    public setLetterAt(index : number, letter : string){
        this._cellGrid[this._currentRow][index].CellLetter = letter;
    }

    public getStateAt(x : number, y:number) {
        return this._cellGrid[y][x].CellState;
    }

    public setStateAt(index : number, state : CellState){
        this._cellGrid[this._currentRow][index].CellState = state;
    }

    public getLetterInCurrentRow(index : number) {
        return this._cellGrid[this._currentRow][index].CellLetter;
    }

    public getStateInCurrentRow(index : number) {
        return this._cellGrid[this._currentRow][index].CellState;
    }
}