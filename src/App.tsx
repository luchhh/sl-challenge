import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CardEditContainer } from "./features/cards/CardEditContainer";
import { CardsContainer } from "./features/cards/CardsContainer";
import ErrorBoundary from "./common/components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App" id="main">
          <Routes>
            <Route path="/" element={<CardsContainer />} />
            <Route path="edit/:cardId" element={<CardEditContainer />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
