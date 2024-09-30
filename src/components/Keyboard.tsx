import { useEffect } from "react";
import { useGameContext } from "./GameProvider";

const validInputs = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));


export default function Keyboard() {
    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        }
    }, []);
    
    const gameContext = useGameContext();
    
    if(gameContext == undefined) {
        return;
    }

    const {typeLetter, deleteLetter, checkWord} = gameContext;

    function handleKeyPress(e : KeyboardEvent)
    {
        const key = e.key.toUpperCase();

        if(key == "BACKSPACE"){
            deleteLetter();
        }
        else if(key == "ENTER"){
            checkWord();
        }
        else if(validInputs.indexOf(key) != -1){
            typeLetter(key);
        }
    }
    
    return <></>
}