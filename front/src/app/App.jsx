import React from "react";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { useAuth } from "../hooks/auth.hook";
import { AuthPage, RouteSheetPage } from "../pages";

export function App() {
  const { token, login } = useAuth();
  const isAuthenticated = !!token;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RouteSheetPage />,
      loader: () => {
        if (!isAuthenticated) {
          return redirect("/authPage");
        }
        return null;
      },
    },
    {
      path: "/authPage",
      element: <AuthPage login={login} />,
      loader: () => {
        if (isAuthenticated) {
          return redirect("/");
        }
        return null;
      },
    },
  ]);

  return <RouterProvider router={router} />;
}
