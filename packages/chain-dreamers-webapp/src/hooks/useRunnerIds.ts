import React from "react";
import { getMainnetSdk } from ".dethcrypto/eth-sdk-client";
import { useEthers } from "@usedapp/core";

export const useRunnerIds = (): number[] => {
  const { account, library } = useEthers();
  const [runnerCount, setRunnerCount] = React.useState<number>(0);
  const [runnerIds, setRunnerIds] = React.useState<number[]>([]);

  const sdk = React.useMemo(
    () => (library ? getMainnetSdk(library.getSigner()) : null),
    [library]
  );

  React.useEffect(() => {
    if (sdk && account) {
      sdk.runners
        .balanceOf(account)
        .then((balance) => setRunnerCount(balance.toNumber()));
    }
  }, [account, sdk]);

  React.useEffect(() => {
    if (sdk && account) {
      const promises = [];
      for (let i = 0; i < runnerCount; i++) {
        promises.push(
          sdk.runners
            .tokenOfOwnerByIndex(account, i)
            .then((bigId) => bigId.toNumber())
        );
      }

      Promise.all(promises).then(setRunnerIds);
    }
  }, [account, sdk, runnerCount]);

  return [1];
};
