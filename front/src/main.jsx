import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { App } from "./app";
import "./main.css";
import { store } from "./store";
import { LoginScreen } from "./components";
import { useAuth } from "./hooks/auth.hook";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

const { token, login, logout } = useAuth();

const loggedIn = (document.cookie.match(/loggedIn=\w+/g) ?? [])[0];

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => {
      if (loggedIn) {
        return redirect("/routeList");
      }
      if (!loggedIn) {
        return redirect("/loginScreen");
      }
      return null;
    },
  },
  {
    path: "/loginScreen",
    element: <LoginScreen />,
    loader: () => {
      if (loggedIn) {
        return redirect("/routeList");
      }
      return null;
    },
  },
  {
    path: "/routeList",
    element: <App />,
    loader: () => {
      if (!loggedIn) {
        return redirect("/loginScreen");
      }
      return null;
    },
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);
