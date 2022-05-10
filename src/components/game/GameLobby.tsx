import Connection from '../../connection/Connection';
import Game from '../../connection/Game';
import PopupMediator from '../../controllers/PopupMediator';
import { getItemById } from '../../models/Item';
import { PopupProfile } from '../popups/PopupProfile';

interface Props {
  game: Game;
}

export default function GameLobby({ game }: Props) {
  return (
    <div className="game-lobby v-group">
      <h2>Scoreboard</h2>
      <ul>
        {game.players.map((p: any, index: number) => (
          // User badge
          <li key={index}>
            <div className="user-score-card">
              <div
                className="profile-button user-with-badge"
                onClick={() => PopupMediator.open(PopupProfile)}
              >
                {p.user.username && (
                  <img
                    className="avatar"
                    src={
                      'assets/' + getItemById(p.user.currentAvatar)?.value.url
                    }
                    alt=""
                  />
                )}
                {p.user.isGuest && <span className="badge guest">Guest</span>}
                <p>{p.user.username}</p>
              </div>

              <p className="score">{p.points}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
