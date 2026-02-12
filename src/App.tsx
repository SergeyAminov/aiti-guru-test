import { useState } from 'react';
import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem('authToken') || sessionStorage.getItem('authToken') ? true : false)

  return (
    <>
      {!loggedIn && <LoginPage setLoggedIn={setLoggedIn} />}
      {loggedIn && <MainPage />}
    </>
  );
}

export default App;
