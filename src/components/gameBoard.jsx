
export default function GameBoard({onSelectSquare, board}){


    // const [gamelayout, setGameLayout] = useState(initialGameLayout);

    // function handleSelectedSquare(rowindex,colindex){
    //     setGameLayout((prevGameLayout => {
    //         const updatedGameLayout  = [...prevGameLayout.map(innerArray => [...innerArray])];
    //         updatedGameLayout[rowindex][colindex] = activePlayerSymbol;
    //         return updatedGameLayout
    //     }));
    //     onSelectSquare();
    // }


    return(
        <ol id ="game-board">
            {board.map((row, rowindex) => (
                <li key = {rowindex}>
                    <ol>
                        {row.map((playerSymbol ,colindex) =>(
                            <li key = {colindex}>
                                <button 
                                onClick={() => onSelectSquare(rowindex,colindex)} 
                                disabled = {playerSymbol !== null}>{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    )
}