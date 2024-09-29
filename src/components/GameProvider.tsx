import { createContext, useContext, useEffect, useRef, useState } from "react"

import Grid from "../models/Grid"
import { CellState } from "../models/Cell"
import axios from "axios"

export interface WordContextType{
    wordLength: number,
    wordFirstLetter: string,
    tryCount: number,
    checkWord: () => boolean
}

export interface GridContextType{
    getLetterAt : (x: number, y:number) => string,
    getStateAt : (x: number, y:number) => CellState,
    setLetterAt : (index: number, value:string) => void;
}

export interface GameProviderProps{
    children: React.ReactNode
}

const WordContext = createContext<WordContextType | undefined>(undefined);

const GridContext = createContext<GridContextType | undefined>(undefined);


export function GameProvider({children} : GameProviderProps){
    const [word, setWord] = useState("");
    
    const tryCount = 6;

    const [grid,setGrid] = useState<Grid>(new Grid(0,0));

    const [, forceUpdate] = useState({});

    const wordList = useRef<string[]>([]);

    useEffect(() => {
        async function fetchData() {
            const result = await axios.get("french.txt")
            
            wordList.current = result.data.split("\r\n")  

            const newWord = wordList.current[2].toUpperCase();
            setWord(newWord);
            setGrid(new Grid(newWord.length, tryCount))
            
        }
        fetchData();        
    }, [])

    useEffect(() => {
        if(grid.WordLength != 0){
            setDefaultText();
        }
        else{
            return 
        }
    }, [grid])

    if(grid.WordLength == 0){
        return <div>Loading ...</div>
    }

    function checkWord() {
        let wordCopy = word;

        if(grid.getLetterInCurrentRow(word.length-1) == "."){
            return false;
        }
        
        wordCopy = findWellPlaced(wordCopy);
        findMissPlaced(wordCopy);
        
        nextRow();

        forceUpdate({});

        return true
    }

    function findWellPlaced(wordCopy : string){
        for(let i = 0; i < word.length; i++){
            const letter = grid.getLetterInCurrentRow(i) ;
            if(letter == word[i]){
                grid.setStateAt(i, CellState.Correct);
                wordCopy = wordCopy.replace(letter, " ")
            }
        }

        return wordCopy;
    }

    function findMissPlaced(wordCopy : string) {
        for(let i = 0; i < word.length; i++){
            const letter = grid.getLetterInCurrentRow(i) ;
            if(letter == CellState.Correct){
                continue;
            }
            if(wordCopy.indexOf(grid.getLetterInCurrentRow(i)) != -1)
            {
                grid.setStateAt(i, CellState.Misplaced);
                wordCopy = wordCopy.replace(letter, " ")
            }
        }
    }

    function nextRow() {
        grid.nextRow();
        setDefaultText();
    }

    function setDefaultText(){
        setLetterAt(0, word[0]);

        for(let i = 1; i < word.length; i++){
            setLetterAt(i, ".");
        }

        forceUpdate({});
    }

    function setLetterAt(index: number, value : string) {
        grid.setLetterAt(index, value);
        console.log(index, value)
        forceUpdate({});
    }

    function getLetterAt(x : number, y : number) {
        return grid.getLetterAt(x, y);
    }

    function getStateAt(x : number, y : number){
        return grid.getStateAt(x, y);
    }

    return <WordContext.Provider value={{
        wordLength: word.length, 
        wordFirstLetter: word[0], 
        tryCount,
        checkWord}}>
        <GridContext.Provider value={{
            getLetterAt, 
            getStateAt,
            setLetterAt}}>
            {children}
        </GridContext.Provider>
    </WordContext.Provider>
}

export function useWordContext(){
    return useContext(WordContext);
}

export function useGridContext(){
    return useContext(GridContext);
}