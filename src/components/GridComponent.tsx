import { useGameContext } from "./GameProvider"
import Grid from "../models/Grid";
import { CellComponent } from "./CellComponent";
import "../styles/GridComponent.sass"

export interface GridPropsType{
    grid: Grid
}


export function GridComponent() {
    const gameContext = useGameContext();
    
    if(gameContext == undefined ) {
        throw new Error("Missing context in grid component !");
    }
    
    const {getLetterAt, getStateAt, wordLength, tryCount} = gameContext;

    const cells = new Array<JSX.Element>();

    for(let y = 0 ; y < tryCount; y++){
        for(let x = 0; x < wordLength; x++){
            const letter = getLetterAt(x, y);
            const state = getStateAt(x, y);

            cells.push(<CellComponent key={x.toString()+y.toString()} letter={letter} state={state}/>)
        }
    }
    

    return <div className="grid" style={{gridTemplateColumns: `repeat(${wordLength}, 1fr)`}}>
        {cells}
    </div>
}