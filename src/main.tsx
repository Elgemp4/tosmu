import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GameComponent } from './components/GameComponent'
import './styles/main.sass'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameComponent />
  </StrictMode>,
)
