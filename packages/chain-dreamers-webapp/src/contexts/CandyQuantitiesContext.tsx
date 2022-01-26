import React from "react";
import { CandyList } from "../candies";

export const CandyQuantitiesContext = React.createContext<{
  candyQuantities: Record<CandyList, number>;
  setCandyQuantities: (quantities: Record<CandyList, number>) => void;
}>({
  candyQuantities: {
    [CandyList.ChainMeth]: 0,
    [CandyList.HeliumSpice]: 0,
    [CandyList.SomnusTears]: 0,
  },
  setCandyQuantities: () => {},
});
