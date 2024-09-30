import { createContext, useContext, useEffect, useState } from "react"
import { CellState } from "../models/Cell"
import Game from "../models/Game"
import axios from "axios";

export interface GameContextType{
    wordLength: number,
    wordFirstLetter: string,
    tryCount: number,
    checkWord: () => void,
    typeLetter: (letter: string) => void,
    deleteLetter: () => void,
    getLetterAt: (x: number, y: number) => string,
    getStateAt: (x: number, y: number) => CellState,
}

export interface GameProviderProps{
    children: React.ReactNode
}

const GameContext = createContext<GameContextType | undefined>(undefined);


export function GameProvider({children} : GameProviderProps){
    const [game, setGame] = useState<Game | null>(null);

    useEffect(() => {
        async function getWord() {
            const result = await axios.get("french.txt");

            const wordList = result.data.split("\r\n")  

            const word = wordList[2].toUpperCase();
            setGame(new Game(word));
            console.log("loaded");
        }
        getWord();
    }, []);

    console.trace("ici")
    //const [,setUpdate] = useState({});

    if( game == null){
        return <div>Loading...</div>
    }

    const wordLength = game.wordLength;
    const wordFirstLetter = game.wordFirstLetter;
    const tryCount = game.tryCount;

    function checkWord() {
        if(game == null)
            return;

        setGame(() => game.checkWord());
    }

    function typeLetter(letter: string) {
        setGame((g) => {
            if(g == null){
                return g;
            } 

            return g.typeLetter(letter);
        });
    }

    function deleteLetter() {
        if(game == null)
            return;
        game.deleteLetter()
        setGame(game);
    }

    function getLetterAt(x: number, y: number){
        if(game == null){
            return "";
        }

        return game.getLetterAt(x, y);
    }

    function getStateAt(x: number, y: number){
        if(game == null){
            return CellState.Incorrect;
        }

        return game.getStateAt(x, y);
    }

    return <GameContext.Provider value={{
        wordLength,
        wordFirstLetter,
        tryCount,
        checkWord,
        typeLetter,
        deleteLetter,
        getLetterAt,
        getStateAt
    }}>
        {children}
    </GameContext.Provider>
}

export function useGameContext(){
    return useContext(GameContext);
}