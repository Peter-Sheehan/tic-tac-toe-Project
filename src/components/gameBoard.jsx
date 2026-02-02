import { useState } from "react"

const initialGameLayout =[
    [null,null,null],
    [null,null,null],
    [null,null,null],
]

export default function GameBoard({onSelectSquare, activePlayerSymbol}){
    const [gamelayout, setGameLayout] = useState(initialGameLayout);

    function handleSelectedSquare(rowindex,colindex){
        setGameLayout((prevGameLayout => {
            const updatedGameLayout  = [...prevGameLayout.map(innerArray => [...innerArray])];
            updatedGameLayout[rowindex][colindex] = activePlayerSymbol;
            return updatedGameLayout
        }));
        onSelectSquare();
    }
    
    return(
        <ol id ="game-board">
            {gamelayout.map((row, rowindex) => (
                <li key = {rowindex}>
                    <ol>
                        {row.map((playerSymbol ,colindex) =>(
                            <li key = {colindex}>
                                <button onClick={() => {handleSelectedSquare(rowindex,colindex)}}>{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    )
}