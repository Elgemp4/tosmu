
import Grid from "./Grid";
import { CellState } from "./Cell";


export default class Game{

    private _choosenWord : string;
    
    private _grid : Grid;

    private _tryCount = 6;

    private _typeIndex = 1;

    public constructor(word : string) {
        this._choosenWord = word;
        this._grid = new Grid(this.wordLength,this.tryCount);

        this.typeLetter = this.typeLetter.bind(this);
        this.deleteLetter = this.deleteLetter.bind(this);
        this.checkWord = this.checkWord.bind(this);
        this.getLetterAt = this.getLetterAt.bind(this);
        this.getStateAt = this.getStateAt.bind(this);
        this.setDefaultText();
    }

    get wordLength() {
        return this._choosenWord.length;
    }

    get wordFirstLetter() {
        return this._choosenWord[0];
    }

    get tryCount() {
        return this._tryCount;
    }

    public clone(){
        const proto = Object.getPrototypeOf(this); //Récupère la structure
        const newObjectStrucutre  = Object.create(proto); //Créer un nouvel objet avec la même strucutre
        const clone = Object.assign(newObjectStrucutre, this); //Copie les données dans l'object 
        return clone;
    }

    public typeLetter(letter : string) {
        if(this._typeIndex >= this.wordLength){
            return;
        }
        this._grid.setLetterAt(this._typeIndex, letter);
        this._typeIndex++;

        return this.clone();
    }

    public deleteLetter() {
        if(this._typeIndex != 1){
            this._typeIndex--;
            this._grid.setLetterAt(this._typeIndex, ".");
        }

        return this.clone();
    }

    public checkWord() {
        let wordCopy = this._choosenWord;

        if(this._grid.getLetterInCurrentRow(this._choosenWord.length-1) == "."){
            return this.clone();
        }
        
        wordCopy = this.findWellPlaced(wordCopy);
        this.findMissPlaced(wordCopy);
        
        this.nextRow();

        return this.clone();
    }

    public getLetterAt(x: number, y: number) {
        return this._grid.getLetterAt(x, y);
    }

    public getStateAt(x: number, y: number) {
        return this._grid.getStateAt(x, y);
    }

    private findWellPlaced(wordCopy : string){
        for(let i = 0; i < this._choosenWord.length; i++){
            const letter = this._grid.getLetterInCurrentRow(i) ;
            if(letter == this._choosenWord[i]){
                this._grid.setStateAt(i, CellState.Correct);
                wordCopy = wordCopy.replace(letter, " ")
            }
        }

        return wordCopy;
    }

    private findMissPlaced(wordCopy : string) {
        for(let i = 0; i < this._choosenWord.length; i++){
            const letter = this._grid.getLetterInCurrentRow(i) ;
            if(letter == CellState.Correct){
                continue;
            }
            if(wordCopy.indexOf(this._grid.getLetterInCurrentRow(i)) != -1)
            {
                this._grid.setStateAt(i, CellState.Misplaced);
                wordCopy = wordCopy.replace(letter, " ")
            }
        }
    }

    private nextRow() {
        this._grid.nextRow();
        this.setDefaultText();
    }

    private setDefaultText(){
        this._grid.setLetterAt(0, this._choosenWord[0]);

        for(let i = 1; i < this._choosenWord.length; i++){
            this._grid.setLetterAt(i, ".");
        }
    }
}