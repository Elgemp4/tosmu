import { createContext } from "react"

import { WordValueType } from "./App"

export interface WordContextType{
    word: string
}

export interface GameProviderProps{
    children: React.ReactNode
    wordValues : WordValueType
}

export const WordContext = createContext<WordContextType | undefined>(undefined);


export function GameProvider({children, wordValues} : GameProviderProps){
    
    return <WordContext.Provider value={wordValues}>
        {children}
    </WordContext.Provider>
}