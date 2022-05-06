import Connection from '../../connection/Connection';
import PopupMediator from '../../controllers/PopupMediator';
import Chat from '../../models/Chat';
import { getItemById } from '../../models/Item';
import { PopupProfile } from '../popups/PopupProfile';

export default function ChatMessage({
  data,
  isBlock = false
}: {
  data: Chat;
  isBlock: boolean;
}) {
  const { user, message, time } = data;

  if (!Connection.instance.me) return <></>;
  return (
    <div
      className={`chat-message ${
        user.id === Connection.instance.me!.id ? 'chat-message-self' : ''
      } ${isBlock ? 'is-block' : ''}`}
    >
      {!isBlock && (
        <div className="chat-card">
          <img
            src={'assets/' + getItemById(user.currentAvatar)?.value.url}
            alt=""
          />
          {user.isGuest && <span className="badge guest">Guest</span>}
          <div className="h-group">
            {user.id === 'system' && (
              <span className="muted">{user.username}</span>
            )}
            {user.id !== 'system' && (
              <button
                className="link"
                onClick={() => {
                  if (user.id === Connection.instance.me!.id) {
                    PopupMediator.open(PopupProfile);
                  } else {
                    PopupMediator.open(PopupProfile, {
                      id: user.id
                    });
                  }
                }}
              >
                {user.username}
              </button>
            )}
            <span className="muted"> ᛫ </span>
            <span className="muted">{new Date(time).toLocaleTimeString()}</span>
          </div>
        </div>
      )}
      <span className={`chat-text ${isBlock ? 'is-block' : ''}`}>
        {message}
      </span>
    </div>
  );
}
