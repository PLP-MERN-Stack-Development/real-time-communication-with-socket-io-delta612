import React, { useState } from 'react';
import { UserProvider } from './context/UserContext';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <UserProvider>
      {loggedIn ? (
        <ChatPage />
      ) : (
        <LoginPage onLogin={() => setLoggedIn(true)} />
      )}
    </UserProvider>
  );
}

export default App;