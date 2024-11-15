import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Hastalar from './pages/Hastalar';
import Doktorlar from './pages/Doktorlar';
import Randevular from './pages/Randevular';
import RandevuAl from './pages/RandevuAl';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hastalar" element={<Hastalar />} />
            <Route path="/doktorlar" element={<Doktorlar />} />
            <Route path="/randevular" element={<Randevular />} />
            <Route path="/randevu-al" element={<RandevuAl />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
