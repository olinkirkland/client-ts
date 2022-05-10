import { useEffect, useState } from 'react';
import Connection from '../../connection/Connection';
import Game, { GameEventType, GameMode } from '../../connection/Game';
import { getItemById } from '../../models/Item';

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

    console.log(game);
  }

  function onGameTick() {
    setPlayerCoordinates(game.playerCoordinates);
  }

  function onClickAnswer(index: number) {
    game.answer(index);
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

        <div className="game-body">
          {mode === GameMode.GAME && (
            <>
              <p className="muted">{`Round: ${roundIndex}/${numberOfRounds}`}</p>
              <p className="prompt">{question?.prompt}</p>
              {question?.correctAnswer && (
                <p>{question.answers[question.correctAnswer]}</p>
              )}
              <ul className="answers">
                {question?.answers.map((answer, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      onClickAnswer(index);
                    }}
                  >
                    <span>{answer}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="game-footer h-group">
          <button
            onClick={() => {
              Connection.instance.leaveGame();
            }}
          >
            Leave game
          </button>
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
        </div>
      </div>
      <div className="cursor-container">
        {document.querySelector('.cursor-container') &&
          players.map(
            (p: any, index: number) =>
              playerCoordinates[p.user.id] &&
              p.user.id !== game.me.id && (
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
                  <img
                    className="game-avatar"
                    src={
                      'assets/' + getItemById(p.user.currentAvatar)?.value.url
                    }
                    alt=""
                  />

                  <h2>{p.user.username}</h2>
                  {/* {playerCoordinates[p.user.id] && (
                    <pre>{JSON.stringify(playerCoordinates[p.user.id])}</pre>
                  )} */}
                </div>
              )
          )}
      </div>
    </div>
  );
}
