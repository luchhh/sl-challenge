import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { CardsList } from "./features/cards/CardsList";
import { Layout } from "./components/Layout";
import { CardFilter } from "./features/cards/CardFilter";

function App() {
  return (
    <Layout>
      <CardFilter />
      <CardsList className="mt-12" />
    </Layout>
  );
}

export default App;
