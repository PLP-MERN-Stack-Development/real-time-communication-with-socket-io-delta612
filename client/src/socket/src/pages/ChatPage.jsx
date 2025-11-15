import React, { useEffect } from 'react';
import ChatWindow from '../components/ChatWindow';
import MessageInput from '../components/MessageInput';
import UserList from '../components/UserList';
import { useSocket } from '../socket/socket';
import { useUser } from '../context/UserContext';

export default function ChatPage() {
  const { username } = useUser();
  const { connect, sendMessage, setTyping, users, messages, typingUsers } = useSocket();

  useEffect(() => {
    if (username) connect(username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return (
    <div className="app">
      <UserList users={users} />
      <div className="chat-container">
        <ChatWindow messages={messages} typingUsers={typingUsers} />
        <MessageInput sendMessage={(text) => sendMessage(text)} setTyping={setTyping} />
      </div>
    </div>
  );
}