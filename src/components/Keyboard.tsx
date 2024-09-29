import { useEffect } from "react";
import { useGridContext, useWordContext } from "./GameProvider";

const validInputs = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));


export default function Keyboard() {
    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        }
    }, []);
    
    const gridContext = useGridContext();
    const wordContext = useWordContext();
    
    if(gridContext == undefined || wordContext == undefined) {
        return;
    }

    const {setLetterAt} = gridContext;

    const {wordLength, checkWord} = wordContext;

    let typeIndex = 1;

    function handleKeyPress(e : KeyboardEvent)
    {
        const key = e.key.toUpperCase();
        console.log(key)
        if(key == "BACKSPACE"){
            if(typeIndex == 1){
                return;
            }
            setLetterAt(typeIndex - 1, ".");
            typeIndex--
        }
        else if(key == "ENTER"){
            if(checkWord()){
                typeIndex = 1;
            }
        }
        else if(validInputs.indexOf(key) != -1){
            if(typeIndex == wordLength){
                return;
            }
            setLetterAt(typeIndex, key);
            typeIndex++
        }
        
    }
    
    return <></>
}