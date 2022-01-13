import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Faq from "./components/Faq/Faq";
import Story from "./components/Story/Story";

function RoutesWrapper() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/story" element={<Story />} />
    </Routes>
  );
}

export default RoutesWrapper;
