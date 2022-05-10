import { useEffect, useState } from 'react';
import Connection from '../../connection/Connection';
import Game, { GameEventType } from '../../connection/Game';

export default function GameScreen() {
  const game: Game = Connection.instance.game!;

  const [mode, setMode] = useState(game.mode);
  const [roundIndex, setRoundIndex] = useState(game.roundIndex);
  const [numberOfRounds, setNumberOfRounds] = useState(game.numberOfRounds);
  const [question, setQuestion] = useState(game.question);

  useEffect(() => {
    game.addListener(GameEventType.GAME_DATA_CHANGED, onGameDataChanged);

    return () => {
      game.removeListener(GameEventType.GAME_DATA_CHANGED, onGameDataChanged);
    };
  }, []);

  function onGameDataChanged() {
    setMode(game.mode);
    setRoundIndex(game.roundIndex);
    setNumberOfRounds(game.numberOfRounds);
    setQuestion(game.question);
  }

  return (
    <div className="game">
      Game Screen
      <p>{`Mode: ${mode}`}</p>
      <p>{`Round: ${roundIndex}/${numberOfRounds}`}</p>
      <pre>{JSON.stringify(question)}</pre>
      <div className="h-group">
        {game.hostId === Connection.instance.me?.id && (
          <button
            onClick={() => {
              Connection.instance.startGame();
            }}
          >
            Start Game
          </button>
        )}
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
