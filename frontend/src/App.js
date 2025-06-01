import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LogoPage from "./pages/LogoPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LogoPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
