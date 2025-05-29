import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterUser from "./pages/RegisterUser";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
