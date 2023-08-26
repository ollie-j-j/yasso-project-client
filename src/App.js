import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavbarDefault from './components/NavbarDefault';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';


function App() {
  return (
    <div className="App">
      <NavbarDefault />

      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/signup" element={<SignUpPage />} />
        <Route exact path="/signin" element={<SignInPage />} />
      </Routes>

    </div>
  );
}

export default App;
