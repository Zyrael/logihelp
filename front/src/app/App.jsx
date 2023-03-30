import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import { useAuth } from "../hooks/auth.hook";
import { AuthPage, RouteSheetPage } from "../pages";

export function App() {
  const { token, login, logout } = useAuth();
  const isAuthenticated = !!token;

  const router = createBrowserRouter([
    {
      path: "/routeSheet",
      element: <RouteSheetPage logout={logout} />,
      loader: () => {
        if (!isAuthenticated) {
          return redirect("/");
        }
        return null;
      },
    },
    {
      path: "/",
      element: <AuthPage login={login} />,
      loader: () => {
        if (isAuthenticated) {
          return redirect("/routeSheet");
        }
        return null;
      },
    },
  ]);

  return <RouterProvider router={router} />;
}
