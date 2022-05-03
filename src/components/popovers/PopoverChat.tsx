import { useEffect, useState } from 'react';
import Connection, { ConnectionEventType } from '../../connection/Connection';
import Chat from '../../models/Chat';
import ChatMessage from './ChatMessage';

export default function PopoverChat() {
  const [chatMessages, setChatMessages] = useState<Chat[]>([
    ...Connection.instance.chatMessages
  ]);

  useEffect(() => {
    console.log('intiilizing popover chat');
    const connection = Connection.instance;
    connection.on(ConnectionEventType.CHAT_MESSAGE, (chatMessage: Chat) => {
      setChatMessages((value) => [...value, chatMessage]);

      // Scroll to bottom
      const chatContainer = document.querySelector('.chat-messages')!;
      chatContainer.scrollTo(0, chatContainer.scrollHeight);
    });
  }, []);

  function sendChatMessage() {
    const input: HTMLInputElement = document.querySelector('.chat-input')!;
    console.log(input);
    const msg = input.value;
    if (!msg || msg.length === 0) return;
    input.value = '';
    Connection.instance.chat(msg);
    input.focus();
  }

  return (
    <div className="popover popover-chat">
      <span className="chat-header">Chat Room</span>
      <ul className="chat-messages">
        {chatMessages.map((chatMessage, index) => (
          <li key={index}>
            <ChatMessage data={chatMessage} />
          </li>
        ))}
      </ul>
      <div className="chat-input-container">
        <input
          className="chat-input"
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
