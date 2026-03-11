import { useState } from "react";
import Player from "./components/player";
import Gameboard from "./components/gameBoard";
import Log from "./components/log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const initialGameBoard =[
    [null,null,null],
    [null,null,null],
    [null,null,null],
]


// helper function
function derivedCurrentPlayer(gameTurns){
    let currentPlayer = 'X';

    if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
      currentPlayer = 'O';
    }

    return currentPlayer
}

function App() {
  const[gameTurns , setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState('X');
  const activePlayer = derivedCurrentPlayer(gameTurns);

  let gameBoard = initialGameBoard.map(row => [...row]);
  let winner;
  for (const turn of gameTurns){
      const { square, player } = turn;
      const { row, col } = square;

      gameBoard[row][col] = player;
  }

  for ( const combination of WINNING_COMBINATIONS){
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];

    if(firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare){
      winner = firstSquare;
    }
  }

  const hasDraw = !winner && gameTurns.length === 9;

  function handleSelectPlayer(rowindex,colindex){
    // setActivePlayer((currentActivePlayer) => {return currentActivePlayer === 'X' ? 'O' : 'X'});
    setGameTurns(prevTurns =>{
      const currentPlayer = derivedCurrentPlayer(prevTurns);

      const updatedTurns = [{ square: {row : rowindex , col: colindex}, player:currentPlayer }
        ,...prevTurns,
      ];
      return updatedTurns;
      });
    }

  return (
    <main>
      <div id ="game-container">
        <ol id ="players" className="highlight-player">
          <Player 
            initialName="Player 1" 
            symbol="X" 
            isActive={activePlayer === 'X'}/>

          <Player 
            initialName="Player 2" 
            symbol="O" 
            isActive={activePlayer === 'O'}/>

        </ol>
        {(winner || hasDraw) && (
         <GameOver winner = {winner}/>
        )}
        <Gameboard 
         onSelectSquare={handleSelectPlayer}
         board = {gameBoard
         }/>
      </div>
      <Log turns = {gameTurns}/>
    </main>
  )
}
export default App

