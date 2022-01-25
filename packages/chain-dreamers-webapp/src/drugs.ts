import somnusTears from "./components/CandyShop/somnus-tears.png";
import chainMeth from "./components/CandyShop/chain-meth.png";
import heliumSpice from "./components/CandyShop/helium-spice.png";

export enum DrugList {
  ChainMeth = "Chain Meth",
  SomnusTears = "Somnus Tears",
  HeliumSpice = "Helium Spice",
}

export const drugsColors = {
  [DrugList.ChainMeth]: "#008aff",
  [DrugList.SomnusTears]: "#ff0200",
  [DrugList.HeliumSpice]: "#b101e6",
};

export const imageByDrug = {
  [DrugList.SomnusTears]: somnusTears,
  [DrugList.ChainMeth]: chainMeth,
  [DrugList.HeliumSpice]: heliumSpice,
};
