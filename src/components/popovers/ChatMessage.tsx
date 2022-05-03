import Connection from '../../connection/Connection';
import Chat from '../../models/Chat';

export default function ChatMessage({ data }: { data: Chat }) {
  const { user, message, time } = data;

  if (user.id === Connection.instance.me!.id) {
    // Todo return own message
    // return ();
  }

  // Other user's message
  return (
    <div className="chat-message">
      <div className="chat-card">
        <img src={user.currentAvatar} alt="" />
        <span className="chat-username">{`${user.username} ᛫ ${new Date(
          time
        ).toLocaleString()}`}</span>
      </div>
      <span className="chat-text">{message}</span>
    </div>
  );
}
