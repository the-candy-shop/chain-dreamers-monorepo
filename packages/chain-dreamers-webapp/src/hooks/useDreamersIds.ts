import React from "react";
import { useEthers } from "@usedapp/core";
import { useSdk } from "./useSdk";

export const useDreamersIds = (): number[] => {
  const { account } = useEthers();
  const [dreamersCount, setRunnerCount] = React.useState<number>(0);
  const [dreamersIds, setRunnerIds] = React.useState<number[]>([]);

  const sdk = useSdk();

  React.useEffect(() => {
    if (sdk && account) {
      sdk.dreamers
        .balanceOf(account)
        .then((balance) => setRunnerCount(balance.toNumber()));
    }
  }, [account, sdk]);

  React.useEffect(() => {
    if (sdk && account) {
      const promises = [];
      for (let i = 0; i < dreamersCount; i++) {
        promises.push(
          sdk.dreamers
            .tokenOfOwnerByIndex(account, i)
            .then((bigId) => bigId.toNumber())
        );
      }

      Promise.all(promises).then(setRunnerIds);
    }
  }, [account, sdk, dreamersCount]);

  console.log("dreamersIds", dreamersIds);
  return dreamersIds;
};
