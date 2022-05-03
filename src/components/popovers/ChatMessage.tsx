import Connection from '../../connection/Connection';
import Chat from '../../models/Chat';

export default function ChatMessage({ data }: { data: Chat }) {
  const { user, message, time } = data;

  console.log(user.id, Connection.instance.me!.id);
  if (user.id === Connection.instance.me!.id) {
    // This is my message
    return (
      <div className="chat-message chat-message-self">
        <div className="chat-card">
          <img src={user.currentAvatar} alt="" />
          {user.isGuest && <span className="badge guest">Guest</span>}
          <span className="chat-username">
            <span>{user.username}</span>
            <span className="muted"> ᛫ </span>
            <span className="muted">{new Date(time).toLocaleTimeString()}</span>
          </span>
        </div>
        <span className="chat-text">{message}</span>
      </div>
    );
  }

  // This is someone else's message
  return (
    <div className="chat-message">
      <div className="chat-card">
        <img src={user.currentAvatar} alt="" />
        {user.id === 'system' && <span className="badge system">System</span>}
        {user.isGuest && <span className="badge guest">Guest</span>}
        <span className="chat-username">
          <span>{user.username}</span>
          <span className="muted"> ᛫ </span>
          <span className="muted">{new Date(time).toLocaleTimeString()}</span>
        </span>
      </div>
      <span className="chat-text">{message}</span>
    </div>
  );
}
