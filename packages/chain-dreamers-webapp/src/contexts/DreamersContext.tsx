import React from "react";

export const DreamersContext = React.createContext<{
  dreamersIds: number[];
  dreamersCount: number;
  setDreamersIds: (ids: number[]) => void;
  setDreamersCount: (count: number) => void;
}>({
  dreamersIds: [],
  dreamersCount: 0,
  setDreamersIds: () => {},
  setDreamersCount: () => {},
});
