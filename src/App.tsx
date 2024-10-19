import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToHashElement from "./components/ScrollToHashElement";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <Router>
      <ScrollToHashElement />
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
      <ScrollToHashElement />
    </Router>
  );
}

export default App;
