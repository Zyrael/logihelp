import React from "react";
import { useAuth } from "../hooks/auth.hook";
import { AuthPage, RouteSheetPage } from "../pages";

export function App() {
  const { token, login, logout } = useAuth();
  const isAuthenticated = !!token;

  return isAuthenticated ? (
    <RouteSheetPage logout={logout} />
  ) : (
    <AuthPage login={login} />
  );
}
