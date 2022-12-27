import React from 'react';
import ReactDOM from 'react-dom/client';
import './components/Mymain.css';
import './components/styles.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navigation,
  Footer,
  Home,
  ODlottery,
  TDlottery,
  FFlottery,
} from "./components"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ODlottery" element={<ODlottery />} />
      <Route path="/TDlottery" element={<TDlottery />} />
      <Route path="/FFlottery" element={<FFlottery />} />
    </Routes>
    <Footer />
  </Router>,
);
