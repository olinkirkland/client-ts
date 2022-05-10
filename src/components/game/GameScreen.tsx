import { useEffect, useState } from 'react';
import Connection from '../../connection/Connection';
import Game, { GameEventType, GameMode } from '../../connection/Game';

export default function GameScreen() {
  const game: Game = Connection.instance.game!;

  const [mode, setMode] = useState(game.mode);
  const [roundIndex, setRoundIndex] = useState(game.roundIndex);
  const [numberOfRounds, setNumberOfRounds] = useState(game.numberOfRounds);
  const [question, setQuestion] = useState(game.question);
  const [players, setPlayers] = useState(game.players);
  const [playerCoordinates, setPlayerCoordinates] = useState(
    game.playerCoordinates
  );

  useEffect(() => {
    game.addListener(GameEventType.GAME_DATA_CHANGED, onGameDataChanged);
    game.addListener(GameEventType.GAME_TICK, onGameTick);

    return () => {
      game.removeListener(GameEventType.GAME_DATA_CHANGED, onGameDataChanged);
      game.removeListener(GameEventType.GAME_TICK, onGameTick);
    };
  }, []);

  function onGameDataChanged() {
    setMode(game.mode);
    setRoundIndex(game.roundIndex);
    setNumberOfRounds(game.numberOfRounds);
    setQuestion(game.question);
    setPlayers(game.players);
  }

  function onGameTick() {
    setPlayerCoordinates(game.playerCoordinates);
  }

  return (
    <div className="game">
      <div className="game-panel">
        <div className="header">
          <div className="h-group">
            <p>{game.name}</p>
            {game.hostId === Connection.instance.me!.id && (
              <span className="badge system">Host</span>
            )}
          </div>
          <p className="muted">{mode === GameMode.LOBBY ? 'Lobby' : 'Game'}</p>
        </div>
        <pre>{players.map((p: any) => JSON.stringify(p)).join('\n')}</pre>
        <p>{`Round: ${roundIndex}/${numberOfRounds}`}</p>
        <pre>{JSON.stringify(question)}</pre>
        <div className="h-group">
          {game.hostId === Connection.instance.me?.id &&
            mode === GameMode.LOBBY && (
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
      <div className="cursor-container">
        {players.map(
          (p: any, index: number) =>
            playerCoordinates[p.user.id] && (
              <div
                key={index}
                className="game-player-cursor"
                style={{
                  left: playerCoordinates[p.user.id].x,
                  top:
                    playerCoordinates[p.user.id].y -
                    document
                      .querySelector('.cursor-container')!
                      .getBoundingClientRect().top
                }}
              >
                {p.user.username}
                {playerCoordinates[p.user.id] && (
                  <pre>{JSON.stringify(playerCoordinates[p.user.id])}</pre>
                )}
              </div>
            )
        )}
      </div>
    </div>
  );
}
