import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavbarDefault from './components/NavbarDefault';
import SignUpPage from './pages/SignUpPage';
import LogInPage from './pages/LogInPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';

function App() {
  return (
    <div className="App">
      <NavbarDefault />

      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/signup" element={<SignUpPage />} />
        <Route exact path="/login" element={<LogInPage />} />
        <Route exact path="/profile" element={<ProfilePage />} />
        <Route exact path="/edit-profile" element={<EditProfilePage />} />
      </Routes>

    </div>
  );
}

export default App;
