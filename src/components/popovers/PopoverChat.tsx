import { useEffect, useState } from 'react';
import Connection, { ConnectionEventType } from '../../connection/Connection';
import Chat from '../../models/Chat';
import ChatMessage from './ChatMessage';

export default function PopoverChat() {
  const [chatMessages, setChatMessages] = useState<Chat[]>([
    ...Connection.instance.chatMessages
  ]);

  useEffect(() => {
    const connection = Connection.instance;
    scrollToBottom();
    connection.on(ConnectionEventType.CHAT_MESSAGE, (chatMessage: Chat) => {
      setChatMessages((value) => [...value, chatMessage]);

      scrollToBottom();
    });
  }, []);

  function scrollToBottom() {
    // Scroll to bottom
    const chatContainer = document.querySelector('.chat-messages')!;
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
  }

  function sendChatMessage() {
    const input: HTMLInputElement = document.querySelector('.chat-input')!;
    const msg = input.value;
    input.value = '';
    if (!msg || msg.trim().length === 0) {
      return;
    }
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
