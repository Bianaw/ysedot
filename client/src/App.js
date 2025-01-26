import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        {/* נתיב לדף הראשי */}
        <Route
          path="/"
          element={
            <iframe
              src="/HomePage/index.html"
              style={{
                width: "100%",
                height: "100vh",
                border: "none",
              }}
              title="Home Page"
            />
          }
        />

        {/* נתיב לדף ההתחברות */}
        <Route
          path="/login"
          element={
            <iframe
              src="/HomePage/index.html"
              style={{
              width: "100%",
              height: "100vh",
              border: "none",
  }}
  title="Home Page"
/>
          }
        />
        
        {/* נתיב ברירת מחדל */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}


export default App;

