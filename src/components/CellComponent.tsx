import { CellState } from "../models/Cell";
import "../styles/CellComponent.sass"

interface CellComponentProps {
    letter : string,
    state : CellState
}

export function CellComponent({letter, state} : CellComponentProps) {
    return <div className={'cell '+ state.toString()}>
        {letter}
    </div>
}