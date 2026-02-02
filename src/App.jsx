import { useState } from "react";
import Player from "./components/player";
import Gameboard from "./components/gameBoard";

function App() {
  const [activePlayer, setActivePlayer] = useState('X');

  function handleSelectPlayer(){
    setActivePlayer((currentActivePlayer) => {
      return currentActivePlayer === 'X' ? 'O' : 'X';
    })
  }

  return (
    <main>
      <div id ="game-container">
        <ol id ="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'}/>
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'}/>
        </ol>
        <Gameboard onSelectSquare={handleSelectPlayer} activePlayerSymbol={activePlayer} />
      </div>
    </main>
  )
}

export default App

