import { useEffect, useState } from "react";
import { GameProvider } from "./GameProvider";
import { Grid } from "./Grid";

export interface WordValueType{
  word: string
}


export function App() {

  let [word, setWord] = useState("carotte");

  const tryCount = 6;

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    }
  }, []);


  function handleKeyPress(e : KeyboardEvent)
  {
    console.log(e.key);
  }

  return <>
    <GameProvider wordValues={{word}}>
      <Grid tryCount={tryCount} />

    </GameProvider>
    </>
  
}