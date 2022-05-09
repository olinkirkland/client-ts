import { useEffect, useState } from 'react';
import Connection from '../../connection/Connection';
import Game from '../../connection/Game';

export default function GameScreen() {
  const game: Game = Connection.instance.game!;

  const [mode, setMode] = useState(game.mode);

  useEffect(() => {}, []);

  return (
    <div className="game">
      Game Screen
      <div className="h-group">
        <button
          onClick={() => {
            Connection.instance.startGame();
          }}
        >
          Start Game
        </button>
        <button
          onClick={() => {
            Connection.instance.leaveGame();
          }}
        >
          Leave game
        </button>
      </div>
    </div>
  );
}
