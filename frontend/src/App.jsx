import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RegistrationPage from './pages/RegistrationPage';
import GatePage from './pages/GatePage';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/gate" element={<GatePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;