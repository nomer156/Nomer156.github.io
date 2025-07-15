import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Car from './pages/Car/Car.jsx';
import Parts from './pages/Parts/Parts.jsx';
import Expenses from './pages/Expenses/Expenses.jsx';
import Settings from './pages/Settings/Settings.jsx';
import AddMod from './pages/AddMod/AddMod.jsx';

function App() {
  return (
    <div className="app">
      <div className="app__content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/car" element={<Car />} />
          <Route path="/parts" element={<Parts />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/add-mod" element={<AddMod />} />
        </Routes>
      </div>
      <Navbar />
    </div>
  );
}

export default App;
