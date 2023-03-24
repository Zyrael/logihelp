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

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const loggedIn = (document.cookie.match(/loggedIn=\w+/g) ?? [])[0];

const sendCookie = async () => {
  const res = await fetch("http://localhost:4000/login", {
    method: "GET",
    credentials: "include",
  });
  console.log(res.headers);
};

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => {
      if (loggedIn) {
        return redirect("/routeList");
      }
      if (!loggedIn) {
        return redirect("/login");
      }
      return null;
    },
  },
  {
    path: "/login",
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
        return redirect("/login");
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
        <button type="button" onClick={sendCookie}>
          Send
        </button>
        <RouterProvider router={router} />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);
