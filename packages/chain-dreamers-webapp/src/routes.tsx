import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Faq from "./components/Faq/Faq";
import Story from "./components/Story/Story";
import OnChainStorage from "./components/OnChainStorage/OnChainStorage";
import Team from "./components/Team/Team";
import CandyShop from "./components/CandyShop/CandyShop";
import Basement from "./components/Basement/Basement";
import { useIsOpen } from "./hooks/useIsOpen";
import MyDreamers from "./components/MyDreamers/MyDreamers";
import { useIsLaunched } from "./hooks/useIsLaunched";
import { useEthers } from "@usedapp/core";
import Jail from "./components/Jail/Jail";

function RoutesWrapper() {
  const { isCandyShopOpen, isJailOpen } = useIsOpen();
  const { isLaunched } = useIsLaunched();
  const { account } = useEthers();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/story" element={<Story />} />
      <Route path="/on-chain-storage" element={<OnChainStorage />} />
      <Route path="/team" element={<Team />} />
      {isCandyShopOpen && <Route path="/candy-shop" element={<CandyShop />} />}
      {isCandyShopOpen && <Route path="/basement" element={<Basement />} />}
      {isJailOpen && <Route path="/jail" element={<Jail />} />}
      {isLaunched && account && (
        <Route path="/my-dreamers" element={<MyDreamers />} />
      )}
    </Routes>
  );
}

export default RoutesWrapper;
