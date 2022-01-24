import React from "react";
import { useEthers } from "@usedapp/core";
import { getMainSdk } from "@dethcrypto/eth-sdk-client";

export const useSdk = () => {
  const { library } = useEthers();

  return React.useMemo(
    () => (library ? getMainSdk(library.getSigner()) : null),
    [library]
  );
};
