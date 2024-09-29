import { GameProvider } from "./GameProvider";
import { GridComponent } from "./GridComponent";

import '../styles/Game.sass'
import Keyboard from "./Keyboard";

export function GameComponent() {
  return <>
    <h1>Tusmo</h1>
    <GameProvider>
      <GridComponent></GridComponent>
      <Keyboard></Keyboard>
    </GameProvider>
    </>
  
}