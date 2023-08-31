import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./main.sass";
import { store } from "./store";
import { App } from "./app";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);
