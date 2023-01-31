import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { App } from "./app";
import "./main.css";
import "@fontsource/roboto";
import { store } from "./store";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
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
