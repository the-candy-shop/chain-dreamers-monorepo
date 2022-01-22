import React from "react";
import { useEthers } from "@usedapp/core";
import { getMainnetSdk } from "@dethcrypto/eth-sdk-client";

export const useSdk = () => {
  const { library } = useEthers();

  return React.useMemo(
    () => (library ? getMainnetSdk(library.getSigner()) : null),
    [library]
  );
};
