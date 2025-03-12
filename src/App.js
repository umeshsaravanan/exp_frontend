import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthContext from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <div className="App">
      <Router> 
        <AuthContext>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<LandingPage />} />
          </Routes>
        </AuthContext>
      </Router>
    </div>

  );
}

export default App;
