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
    connection.addListener(ConnectionEventType.CHAT_MESSAGE, onReceiveMessage);

    const input: HTMLInputElement = document.querySelector('.chat-input')!;
    input.focus();

    return () => {
      connection.removeListener(
        ConnectionEventType.CHAT_MESSAGE,
        onReceiveMessage
      );
    };
  }, []);

  function onReceiveMessage(chatMessage: Chat) {
    setChatMessages((value) => [...value, chatMessage]);
    scrollToBottom();
  }

  function scrollToBottom() {
    // Scroll to bottom
    const chatContainer = document.querySelector('.chat-messages')!;
    if (!chatContainer) return;
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
          <ChatMessage
            key={index}
            data={chatMessage}
            isBlock={
              index > 0
                ? chatMessage.user.id === chatMessages[index - 1].user.id
                : false
            }
          />
        ))}
      </ul>
      <div className="chat-input-container">
        <input
          className="chat-input"
          type="text"
          placeholder="Type a message..."
          onKeyDown={(event) => {
            if (event.key === 'Enter') sendChatMessage();
          }}
        />
        <button className="chat-send" onClick={sendChatMessage}>
          <i className="fas fa-comment-alt"></i>
        </button>
      </div>
    </div>
  );
}
