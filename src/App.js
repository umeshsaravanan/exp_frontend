import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthContext from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import ManageExpense from './pages/ManageExpense';
import DayContext from './contexts/DayContext';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthContext>
          <DayContext>
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<LandingPage />} />
              <Route path="/expense" element={<ManageExpense />} />
            </Routes>
          </DayContext>
        </AuthContext>
      </Router>
    </div>

  );
}

export default App;
