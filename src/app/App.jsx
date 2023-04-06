import React from "react";
import { useAuth } from "../hooks/auth.hook";
import { AuthPage, RouteSheetPage } from "../pages";
import { Loading } from "../components";

export function App() {
  const { loading, token, login, logout } = useAuth();

  const isAuthenticated = !!token;

  return (
    <>
      {loading && <Loading />}
      {!loading &&
        (isAuthenticated ? (
          <RouteSheetPage logout={logout} />
        ) : (
          <AuthPage login={login} />
        ))}
    </>
  );
}
