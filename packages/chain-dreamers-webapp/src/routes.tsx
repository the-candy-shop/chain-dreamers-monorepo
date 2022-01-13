import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Faq from "./components/Faq/Faq";

function RoutesWrapper() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/faq" element={<Faq />} />
    </Routes>
  );
}

export default RoutesWrapper;
