import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavbarDefault from './components/NavbarDefault';
import SignUpPage from './pages/SignUpPage';
import LogInPage from './pages/LogInPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import GettingStartedPage from './pages/GettingStartedPage';
import IsAnon from './components/IsAnon';
import IsPrivate from './components/IsPrivate';
import DashboardPage from './pages/DashboardPage';
import CurrentPlanPage from './pages/CurrentPlanPage';
import OriginalTrainingPlanInputPage from './pages/OriginalTrainingPlanInputPage';

function App() {
  return (
    <div className="App">
      <NavbarDefault />

      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/signup" element={<IsAnon><SignUpPage /></IsAnon>} />
        <Route exact path="/login" element={<IsAnon><LogInPage /></IsAnon>} />
        <Route exact path="/profile" element={<IsPrivate><ProfilePage /></IsPrivate>} />
        <Route exact path="/edit-profile" element={<IsPrivate><EditProfilePage /></IsPrivate>} />
        <Route exact path="/dashboard" element={<IsPrivate><DashboardPage /></IsPrivate>} />
        <Route exact path="/current-plan" element={<IsPrivate><CurrentPlanPage /></IsPrivate>} />
        <Route exact path="/onboarding" element={<IsPrivate><GettingStartedPage /></IsPrivate>} />
        <Route exact path="/onboarding/add-plan" element={<IsPrivate><OriginalTrainingPlanInputPage /></IsPrivate>} />
      </Routes>

    </div>
  );
}

export default App;
