import "./App.css";
import Header from "./components/Header.js";
import Body from "./components/Body.js";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Header />
        </div>
        <div className="content">
          <Body />
        </div>
      </Router>
    </div>
  );
}

export default App;
