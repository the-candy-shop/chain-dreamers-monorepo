import React from "react";
import { useEthers } from "@usedapp/core";
import { useSdk } from "./useSdk";

export const useRunnerIds = (): number[] => {
  const { account } = useEthers();
  const [runnerCount, setRunnerCount] = React.useState<number>(0);
  const [runnerIds, setRunnerIds] = React.useState<number[]>([]);

  const sdk = useSdk();

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

  console.log("runnerIds", runnerIds);
  return runnerIds;
};
