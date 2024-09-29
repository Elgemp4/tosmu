

export enum CellState {
    Incorrect = "incorrect", 
    Correct = "correct", 
    Misplaced = "misplaced" 
}


export class Cell{
    
    private _cellState : CellState;
    private _cellLetter : string;

    constructor() {
        this._cellState = CellState.Incorrect;
        this._cellLetter = "";
    }

    set CellState(value: CellState) {
        this._cellState = value;
    } 

    get CellState() {
        return this._cellState;
    }

    set CellLetter(value: string) {
        if(value.length != 1) {
            throw new Error("String must have length of one.");
        }

        this._cellLetter = value;
    }

    get CellLetter() {
        return this._cellLetter;
    }

}