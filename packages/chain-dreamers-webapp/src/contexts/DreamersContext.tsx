import React, { PropsWithChildren } from "react";

export const DreamersContext = React.createContext<{
  dreamersIds: number[];
  dreamersCount: number;
  setDreamersIds: (ids: number[]) => void;
  setDreamersCount: (count: number) => void;
  isFetching: boolean;
  setIsFetching: (isFetching: boolean) => void;
  hasFetch: boolean;
  setHasFetch: (hasFetch: boolean) => void;
}>({
  dreamersIds: [],
  dreamersCount: 0,
  setDreamersIds: () => {},
  setDreamersCount: () => {},
  isFetching: false,
  setIsFetching: () => {},
  hasFetch: false,
  setHasFetch: () => {},
});

export const DreamersContextProvider = ({
  children,
}: PropsWithChildren<{}>) => {
  const [dreamersCount, setDreamersCount] = React.useState<number>(0);
  const [dreamersIds, setDreamersIds] = React.useState<number[]>([]);
  const [isFetching, setIsFetching] = React.useState<boolean>(false);
  const [hasFetch, setHasFetch] = React.useState<boolean>(false);

  return (
    <DreamersContext.Provider
      value={{
        dreamersCount,
        setDreamersCount,
        dreamersIds,
        setDreamersIds,
        isFetching,
        setIsFetching,
        hasFetch,
        setHasFetch,
      }}
    >
      {children}
    </DreamersContext.Provider>
  );
};
