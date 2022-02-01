import React, { PropsWithChildren } from "react";

export const RunnersContext = React.createContext<{
  runnersIds: number[];
  runnersCount: number;
  setRunnersIds: (ids: number[]) => void;
  setRunnersCount: (count: number) => void;
  isFetching: boolean;
  setIsFetching: (isFetching: boolean) => void;
  hasFetch: boolean;
  setHasFetch: (hasFetch: boolean) => void;
}>({
  runnersIds: [],
  runnersCount: 0,
  setRunnersIds: () => {},
  setRunnersCount: () => {},
  isFetching: false,
  setIsFetching: () => {},
  hasFetch: false,
  setHasFetch: () => {},
});

export const RunnersContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [runnersCount, setRunnersCount] = React.useState<number>(0);
  const [runnersIds, setRunnersIds] = React.useState<number[]>([]);
  const [isFetching, setIsFetching] = React.useState<boolean>(false);
  const [hasFetch, setHasFetch] = React.useState<boolean>(false);

  return (
    <RunnersContext.Provider
      value={{
        runnersCount,
        setRunnersCount,
        runnersIds,
        setRunnersIds,
        isFetching,
        setIsFetching,
        hasFetch,
        setHasFetch,
      }}
    >
      {children}
    </RunnersContext.Provider>
  );
};
