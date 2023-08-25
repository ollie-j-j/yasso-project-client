import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavbarDefault from './components/NavbarDefault';
import SignUpPage from './pages/SignUpPage';


function App() {
  return (
    <div className="App">
      <NavbarDefault />

      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/signup" element={<SignUpPage />} />
      </Routes>

    </div>
  );
}

export default App;
