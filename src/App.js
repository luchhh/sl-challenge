import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { CardsList, CardListContainer } from "./features/cards/CardsList";
import { Layout } from "./components/Layout";

function App() {
  return (
    <Layout>
      <CardsList />
    </Layout>
  );
}

export default App;
