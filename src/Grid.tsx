import { useContext } from "react"
import { WordContext } from "./GameProvider"

export interface GridPropsType{
    tryCount: number
}


export function Grid({tryCount} : GridPropsType) {
    const context = useContext(WordContext);

    if(context == undefined) {
        return;
    }
    
    const { word } = context;
    
    

    return <div>

    </div>
}