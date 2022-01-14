import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Faq from "./components/Faq/Faq";
import Story from "./components/Story/Story";
import OnChainStorage from "./components/OnChainStorage/OnChainStorage";
import Team from "./components/Team/Team";

function RoutesWrapper() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/story" element={<Story />} />
      <Route path="/on-chain-storage" element={<OnChainStorage />} />
      <Route path="/team" element={<Team />} />
    </Routes>
  );
}

export default RoutesWrapper;
