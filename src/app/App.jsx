import React from "react";
import { useAuth } from "../hooks/auth.hook";
import { LoginPage, RouteSheetPage } from "../pages";
import { Loading } from "../components";
import "./App.css";

export function App() {
  const { loading, token, login, logout } = useAuth();

  const isAuthenticated = !!token;

  return (
    <div className="app">
      {loading && <Loading />}
      {!loading &&
        (isAuthenticated ? (
          <RouteSheetPage logout={logout} />
        ) : (
          <LoginPage login={login} />
        ))}
    </div>
  );
}
