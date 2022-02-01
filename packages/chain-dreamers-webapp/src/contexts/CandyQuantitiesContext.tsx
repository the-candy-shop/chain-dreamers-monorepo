import React, { PropsWithChildren } from "react";
import { CandyList } from "../candies";

export const CandyQuantitiesContext = React.createContext<{
  candyQuantities: Record<CandyList, number>;
  setCandyQuantities: (quantities: Record<CandyList, number>) => void;
  isFetching: boolean;
  setIsFetching: (isFetching: boolean) => void;
  hasFetch: boolean;
  setHasFetch: (hasFetch: boolean) => void;
}>({
  candyQuantities: {
    [CandyList.ChainMeth]: 0,
    [CandyList.HeliumSpice]: 0,
    [CandyList.SomnusTears]: 0,
  },
  setCandyQuantities: () => {},
  isFetching: false,
  setIsFetching: () => {},
  hasFetch: false,
  setHasFetch: () => {},
});

export const CandyQuantitiesContextProvider = ({
  children,
}: PropsWithChildren<{}>) => {
  const [candyQuantities, setCandyQuantities] = React.useState<
    Record<CandyList, number>
  >({
    [CandyList.ChainMeth]: 0,
    [CandyList.HeliumSpice]: 0,
    [CandyList.SomnusTears]: 0,
  });
  const [isFetching, setIsFetching] = React.useState<boolean>(false);
  const [hasFetch, setHasFetch] = React.useState<boolean>(false);

  return (
    <CandyQuantitiesContext.Provider
      value={{
        candyQuantities,
        setCandyQuantities,
        isFetching,
        setIsFetching,
        hasFetch,
        setHasFetch,
      }}
    >
      {children}
    </CandyQuantitiesContext.Provider>
  );
};
