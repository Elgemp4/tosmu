import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Game } from './components/Game'
import './styles/main.sass'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Game />
  </StrictMode>,
)
