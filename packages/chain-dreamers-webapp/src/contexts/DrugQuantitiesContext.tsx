import React from "react";
import { DrugList } from "../drugs";

export const DrugQuantitiesContext = React.createContext<{
  drugQuantities: Record<DrugList, number>;
  setDrugQuantities: (quantities: Record<DrugList, number>) => void;
}>({
  drugQuantities: {
    [DrugList.ChainMeth]: 0,
    [DrugList.HeliumSpice]: 0,
    [DrugList.SomnusTears]: 0,
  },
  setDrugQuantities: () => {},
});
