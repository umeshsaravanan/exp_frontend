import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthContext from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <div className="App">
      <AuthContext>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<LandingPage />} />
          </Routes>
        </Router>
      </AuthContext>
    </div>
  );
}

export default App;
