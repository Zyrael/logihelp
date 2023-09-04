import React, { useEffect, useState } from 'react';
import { useAuth, useServer } from '../hooks';
import { LoginPage, RouteSheetPage } from '../pages';
import { Loading } from '../components';
import './App.css';
import { ServerContext } from '../ServerContext';

export function App() {
  // const { loading, token, login, logout } = useAuth();

  // const isAuthenticated = !!token || import.meta.env.MODE === "mock";

  const [loggedIn, setLoggedIn] = useState(
    sessionStorage.getItem('loggedIn') ?? false
  );
  const [url, setUrl] = useState('');

  const serverMethods = useServer();

  const { getDBUrl, setDBUrl } = serverMethods;

  useEffect(() => {
    getDBUrl().then((url) => {
      setUrl(url);
    });
  });

  const updateDB = async () => {
    await setDBUrl();
    const newUrl = await getDBUrl();
    setUrl(newUrl);
  };

  const login = () => {
    setLoggedIn(true);
    sessionStorage.setItem('loggedIn', true);
  };

  return (
    <ServerContext.Provider value={serverMethods}>
      <div className='app'>
        {loggedIn ? (
          <RouteSheetPage />
        ) : (
          <LoginPage login={login} url={url} updateDB={updateDB} />
        )}
      </div>
    </ServerContext.Provider>
  );
}
