import somnusTears from "./components/CandyShop/somnus-tears.png";
import chainMeth from "./components/CandyShop/chain-meth.png";
import heliumSpice from "./components/CandyShop/helium-spice.png";

export enum CandyList {
  ChainMeth = "Chain Meth",
  SomnusTears = "Somnus Tears",
  HeliumSpice = "Helium Spice",
}

export const candiesColors = {
  [CandyList.ChainMeth]: "#008aff",
  [CandyList.SomnusTears]: "#ff0200",
  [CandyList.HeliumSpice]: "#b101e6",
};

export const candiesIds = {
  [CandyList.ChainMeth]: 0,
  [CandyList.SomnusTears]: 2,
  [CandyList.HeliumSpice]: 1,
};

export const imageByCandy = {
  [CandyList.SomnusTears]: somnusTears,
  [CandyList.ChainMeth]: chainMeth,
  [CandyList.HeliumSpice]: heliumSpice,
};
