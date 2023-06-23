import React from "react";
import { useAuth, useServer } from "../hooks";
import { LoginPage, RouteSheetPage } from "../pages";
import { Loading } from "../components";
import "./App.css";
import { ServerContext } from "../ServerContext";

export function App() {
  const { loading, token, login, logout } = useAuth();

  const isAuthenticated = !!token || import.meta.env.MODE === "mock";

  const serverMethods = useServer();

  return (
    <ServerContext.Provider value={serverMethods}>
      <div className="app">
        {loading && <Loading />}
        {!loading &&
          (isAuthenticated ? (
            <RouteSheetPage logout={logout} />
          ) : (
            <LoginPage loading={loading} login={login} />
          ))}
      </div>
    </ServerContext.Provider>
  );
}
