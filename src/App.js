import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { CardsList } from "./features/cards/CardsList";
import { Layout } from "./components/Layout";
import { CardFilter } from "./features/cards/CardFilter";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CardEdit } from "./features/cards/CardEdit";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Layout>
                  <CardFilter />
                  <CardsList className="mt-12" />
                </Layout>
              </>
            }
          />
          <Route path="edit/:cardId" element={<CardEdit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
