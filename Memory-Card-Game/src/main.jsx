import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import GameLayout from './Game/game'

createRoot(document.getElementById('root')).render(
  <>
  <StrictMode>
    <GameLayout />
  </StrictMode>,
  </>
)
