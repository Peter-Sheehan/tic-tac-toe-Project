export default function Player({name, symbol}) {

    return(
        <li>
            <span className="player">
                <span className="player-name">{name} 1</span>
                <span className="player-symbol">{symbol}</span>
            </span>
            <button>Edit</button>
        </li>
    );
}