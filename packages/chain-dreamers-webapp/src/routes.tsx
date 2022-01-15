import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Faq from "./components/Faq/Faq";
import Story from "./components/Story/Story";
import OnChainStorage from "./components/OnChainStorage/OnChainStorage";
import Team from "./components/Team/Team";
import CandyShop from "./components/CandyShop/CandyShop";
import { useIsOpen } from "./hooks/useIsOpen";

function RoutesWrapper() {
  const { isCandyShopOpen } = useIsOpen();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/story" element={<Story />} />
      <Route path="/on-chain-storage" element={<OnChainStorage />} />
      <Route path="/team" element={<Team />} />
      {isCandyShopOpen && <Route path="/lab" element={<CandyShop />} />}
      {isCandyShopOpen && <Route path="/candy-shop" element={<CandyShop />} />}
    </Routes>
  );
}

export default RoutesWrapper;
