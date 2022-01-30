import React from "react";
import { useEthers } from "@usedapp/core";
import { useSdk } from "./useSdk";
import { ethers } from "ethers";
import { DreamersContext } from "../contexts/DreamersContext";
import { useCandyShopContract } from "./useCandyShopContract";

export const useDreamersContract = () => {
  const { account } = useEthers();

  const { dreamersCount, setDreamersCount, dreamersIds, setDreamersIds } =
    React.useContext(DreamersContext);

  const { fetchCandyQuantities } = useCandyShopContract();

  const [isWaitingForPayment, setIsWaitingForPayment] =
    React.useState<boolean>(false);
  const [isMinting, setIsMinting] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const sdk = useSdk();

  const fetchDreamersCount = React.useCallback(async () => {
    if (sdk && account) {
      setIsLoading(true);
      const balance = await sdk.ChainDreamers.balanceOf(account);

      setDreamersCount(balance.toNumber());
      setIsLoading(false);
    }
  }, [account, sdk, setDreamersCount]);

  React.useEffect(() => {
    fetchDreamersCount();
  }, [account, sdk, fetchDreamersCount]);

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
  }, [account, sdk, dreamersCount, setDreamersIds]);

  const mintAsRunners = React.useCallback(
    async (runnerIds: number[], candyIds: number[]): Promise<void> => {
      const ownerTokenIndexes: number[] = [];
      runnerIds.forEach((_, index) => {
        ownerTokenIndexes.push(dreamersCount + index);
      });

      return new Promise(async (resolve, reject) => {
        if (sdk && account) {
          try {
            setIsWaitingForPayment(true);
            await sdk.ChainDreamers.mintBatchRunnersAccess(
              "0x" + runnerIds.map(uint16ToBytes).join(""),
              "0x" + ownerTokenIndexes.map(uint16ToBytes).join(""),
              ethers.utils.hexlify(candyIds),
              candyIds,
              Array(candyIds.length).fill(1)
            );

            setIsWaitingForPayment(false);
            setIsMinting(true);
            const event = sdk.ChainDreamers.filters.Transfer(
              undefined,
              account
            );

            sdk.ChainDreamers.once(event, async () => {
              await fetchDreamersCount();
              await fetchCandyQuantities();
              setIsMinting(false);
              resolve();
            });
          } catch (e) {
            console.error(e);
            setIsWaitingForPayment(false);
            setIsMinting(false);
            reject(e);
          }
        } else {
          resolve();
        }
      });
    },
    [account, dreamersCount, fetchDreamersCount, sdk, fetchCandyQuantities]
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
