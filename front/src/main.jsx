import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { App, AuthPage } from "./pages";
import "./main.css";
import { store } from "./store";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

const token = localStorage.getItem("token");
const isAuthenticated = !!token;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: () => {
      if (!isAuthenticated) {
        return redirect("/authPage");
      }
      return null;
    },
  },
  {
    path: "/authPage",
    element: <AuthPage />,
    loader: () => {
      if (isAuthenticated) {
        return redirect("/");
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
