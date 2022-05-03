import Chat from '../../controllers/Chat';

export default function PopoverChat() {
  function sendChatMessage() {
    const input: HTMLInputElement = document.querySelector('.chat-input')!;
    input.focus();
    const msg = input.value;
    if (!msg || msg.length === 0) return;
    input.value = '';
    Chat.send(msg);
  }

  return (
    <div className="popover popover-chat">
      <span className="chat-header">General Chat Room</span>
      <ul className="chat-messages">Chat messages go here</ul>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message"
          onKeyDown={(event) => {
            if (event.key === 'Enter') sendChatMessage();
          }}
        />
        <button className="chat-send" onClick={sendChatMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
