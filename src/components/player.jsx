import { useState } from "react";

export default function Player({initialName, symbol, isActive}) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName , setPlayerName] = useState(initialName);
    function handleEditClick(){
        setIsEditing((editing) => !editing);
    }

    function handleChange(event){
        setPlayerName(event.target.value);
    }

    let editableName = <span className="player-name">{playerName}</span>;
    // let btnCaption = 'Edit';
    if (isEditing){
        editableName = <input type="text" required value={playerName} onChange={handleChange} />;
        // btnCaption = 'Save';
    }

    return(
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editableName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}