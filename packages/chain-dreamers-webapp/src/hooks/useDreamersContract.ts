import React from "react";
import { useEthers } from "@usedapp/core";
import { useSdk } from "./useSdk";
import { ethers } from "ethers";
import { DreamersContext } from "../contexts/DreamersContext";

export const useDreamersContract = () => {
  const { account } = useEthers();

  const { dreamersCount, setDreamersCount, dreamersIds, setDreamersIds } =
    React.useContext(DreamersContext);

  const [isWaitingForPayment, setIsWaitingForPayment] =
    React.useState<boolean>(false);
  const [isMinting, setIsMinting] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const sdk = useSdk();

  const fetchDreamersCount = React.useCallback(async () => {
    if (sdk && account) {
      setIsLoading(true);
      const balance = await sdk.ChainDreamers.balanceOf(account);

      setDreamersCount(1);
      setIsLoading(false);
    }
  }, [account, sdk, setDreamersCount]);

  React.useEffect(() => {
    fetchDreamersCount();
  }, [account, sdk]);

  React.useEffect(() => {
    if (sdk && account) {
      const promises = [];
      for (let i = 0; i < dreamersCount; i++) {
        promises.push(
          sdk.ChainDreamers.tokenOfOwnerByIndex(account, i).then((bigId) =>
            bigId.toNumber()
          )
        );
      }

      Promise.all(promises).then(setDreamersIds);
    }
  }, [account, sdk, dreamersCount]);

  const mintAsRunners = React.useCallback(
    async (
      runnerIds: number[],
      ownerRunnerIndexes: number[],
      candyIds: number[]
    ): Promise<void> => {
      console.log("runnerIds", runnerIds);
      console.log("ownerRunnerIndexes", ownerRunnerIndexes);
      console.log("candyIds", candyIds);

      return new Promise(async (resolve) => {
        if (sdk && account) {
          setIsWaitingForPayment(true);
          await sdk.ChainDreamers.mintBatchRunnersAccess(
            "0x" + runnerIds.map(uint16ToBytes).join(""),
            "0x" + ownerRunnerIndexes.map(uint16ToBytes).join(""),
            ethers.utils.hexlify(candyIds),
            candyIds,
            Array(candyIds.length).fill(1)
          );

          setIsWaitingForPayment(false);
          const event = sdk.ChainDreamers.filters.Transfer(account);
          sdk.ChainDreamers.once(event, async () => {
            await fetchDreamersCount();
            setIsMinting(false);
            resolve();
          });
        } else {
          resolve();
        }
      });
    },
    []
  );

  return {
    dreamersIds,
    mintAsRunners,
    isWaitingForPayment,
    isMinting,
    isLoading,
  };
};

function uint16ToBytes(uint16: number): string {
  return ("0".repeat(4) + uint16.toString(16)).slice(-4);
}
