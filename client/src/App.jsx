import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterUser from "./pages/RegisterUser";
import LoginUser from "./pages/LoginUser";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/login" element={<LoginUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
