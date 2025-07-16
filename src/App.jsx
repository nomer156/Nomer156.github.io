import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import RequireAuth from './components/RequireAuth.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Car from './pages/Car/Car.jsx';
import Parts from './pages/Parts/Parts.jsx';
import Expenses from './pages/Expenses/Expenses.jsx';
import Settings from './pages/Settings/Settings.jsx';
import AddMod from './pages/AddMod/AddMod.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

function App() {
  return (
    <div className="app">
      <div className="app__content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>} />
          <Route path="/car" element={<RequireAuth><Car /></RequireAuth>} />
          <Route path="/parts" element={<RequireAuth><Parts /></RequireAuth>} />
          <Route path="/expenses" element={<RequireAuth><Expenses /></RequireAuth>} />
          <Route path="/settings" element={<RequireAuth><Settings /></RequireAuth>} />
          <Route path="/add-mod" element={<RequireAuth><AddMod /></RequireAuth>} />
        </Routes>
      </div>
      <Navbar />
    </div>
  );
}

export default App;
