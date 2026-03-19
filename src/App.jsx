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

// helper functions
function derivedCurrentPlayer(gameTurns){
    let currentPlayer = 'X';

    if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
      currentPlayer = 'O';
    }

    return currentPlayer
}

function getWinner(gameBoard, players){
  let winner
  for ( const combination of WINNING_COMBINATIONS){
  const firstSquare = gameBoard[combination[0].row][combination[0].column];
  const secondSquare = gameBoard[combination[1].row][combination[1].column];
  const thirdSquare = gameBoard[combination[2].row][combination[2].column];
  console.log("Winner:", firstSquare);

  if(firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare){
    winner = players[firstSquare];
    console.log(winner);
  }
}
return winner;
}

function getGameboard(gameTurns){
  let gameBoard = [...initialGameBoard.map(array => [...array])];
  for (const turn of gameTurns){
      const { square, player } = turn;
      const { row, col } = square;

      gameBoard[row][col] = player;
      console.log(gameBoard);
  }

return gameBoard;
}


function App() {
  const[gameTurns , setGameTurns] = useState([]);
  const[players,setPlayers] = useState({
    X: 'Player 1',
    O: 'Player 2'
  });
  // const [activePlayer, setActivePlayer] = useState('X');
  const activePlayer = derivedCurrentPlayer(gameTurns);
  const gameBoard = getGameboard(gameTurns);
  const winner = getWinner(gameBoard, players);

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

    function handleRematch(){
      setGameTurns([]);
    }

    function handlePlayerNameChange(playerSymbol, newName){
      setPlayers(prevPlayers => {
        return{
          ...prevPlayers,
          [playerSymbol]: newName,
        };
      });
    };

  return (
    <main>
      <div id ="game-container">
        <ol id ="players" className="highlight-player">
          <Player 
            initialName="Player 1" 
            symbol="X" 
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
            />

          <Player 
            initialName="Player 2" 
            symbol="O" 
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}
            />

        </ol>
        {(winner || hasDraw) && (
         <GameOver winner = {winner} onRematch = {handleRematch}/>
        )}
        <Gameboard 
         onSelectSquare={handleSelectPlayer}
         board = {gameBoard}
         />
      </div>
      <Log turns = {gameTurns}/>
    </main>
  )
}
export default App

