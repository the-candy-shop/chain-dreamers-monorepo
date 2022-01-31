import React from "react";
import { useEthers } from "@usedapp/core";
import { useSdk } from "./useSdk";
import { ethers } from "ethers";
import { DreamersContext } from "../contexts/DreamersContext";
import { useCandyShopContract } from "./useCandyShopContract";
import { SnackbarErrorContext } from "../contexts/SnackbarErrorContext";

export const useDreamersContract = () => {
  const { account } = useEthers();

  const { dreamersCount, setDreamersCount, dreamersIds, setDreamersIds } =
    React.useContext(DreamersContext);

  const { fetchCandyQuantities } = useCandyShopContract();

  const [isWaitingForPayment, setIsWaitingForPayment] =
    React.useState<boolean>(false);
  const [isMinting, setIsMinting] = React.useState<boolean>(false);

  const { setError } = React.useContext(SnackbarErrorContext);

  const sdk = useSdk();

  const fetchDreamersCount = React.useCallback(async (): Promise<number> => {
    if (sdk && account) {
      try {
        const balance = await sdk.ChainDreamers.balanceOf(account);
        setDreamersCount(balance.toNumber());

        return balance.toNumber();
      } catch (e) {
        setError((e as { error: Error }).error.message);
        return 0;
      }
    }

    return 0;
  }, [account, sdk, setDreamersCount, setError]);

  const fetchDreamersIds = React.useCallback(async (): Promise<number[]> => {
    if (sdk && account) {
      try {
        const balance = await fetchDreamersCount();
        const promises = [];
        for (let i = 0; i < balance; i++) {
          promises.push(
            sdk.ChainDreamers.tokenOfOwnerByIndex(account, i).then((bigId) =>
              bigId.toNumber()
            )
          );
        }

        const ids = await Promise.all(promises);
        setDreamersIds(ids);

        return ids;
      } catch (e) {
        setError((e as { error: Error }).error.message);
        return [];
      }
    }

    return [];
  }, [account, sdk, setError]);

  React.useEffect(() => {
    fetchDreamersIds();
  }, [account, sdk, fetchDreamersIds]);

  const waitForDreamersMint = React.useCallback(
    (mintedDreamersIds: number[]): Promise<void> => {
      if (sdk && account) {
        return new Promise((resolve) => {
          setTimeout(async () => {
            try {
              const dreamersIds = await fetchDreamersIds();

              if (
                mintedDreamersIds.every((id) => dreamersIds.indexOf(id) !== -1)
              ) {
                resolve();
              } else {
                await waitForDreamersMint(mintedDreamersIds);
                resolve();
              }
            } catch {
              await waitForDreamersMint(mintedDreamersIds);
              resolve();
            }
          }, 5000);
        });
      } else {
        return Promise.resolve();
      }
    },
    [sdk, account]
  );

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

            await waitForDreamersMint(runnerIds);
            await fetchCandyQuantities();
            setIsMinting(false);
            resolve();
          } catch (e) {
            setIsWaitingForPayment(false);
            setIsMinting(false);
            setError((e as { error: Error }).error.message);
            reject(e);
          }
        } else {
          resolve();
        }
      });
    },
    [
      account,
      dreamersCount,
      fetchDreamersCount,
      sdk,
      fetchCandyQuantities,
      setError,
    ]
  );

  const mint = React.useCallback(
    async (runnerIds: number[]): Promise<void> => {
      const ownerTokenIndexes: number[] = [];
      runnerIds.forEach((_, index) => {
        ownerTokenIndexes.push(dreamersCount + index);
      });

      return new Promise(async (resolve, reject) => {
        if (sdk && account) {
          try {
            setIsWaitingForPayment(true);
            await sdk.ChainDreamers.mintBatchPublicSale(
              "0x" + runnerIds.map(uint16ToBytes).join(""),
              "0x" + ownerTokenIndexes.map(uint16ToBytes).join("")
            );

            setIsWaitingForPayment(false);
            setIsMinting(true);

            await waitForDreamersMint(runnerIds);
            setIsMinting(false);
          } catch (e) {
            setIsWaitingForPayment(false);
            setIsMinting(false);
            setError((e as { error: Error }).error.message);
            reject(e);
          }
        } else {
          resolve();
        }
      });
    },
    [account, dreamersCount, fetchDreamersCount, sdk, setError]
  );

  const fetchNonMintedDreamers = React.useCallback(async (): Promise<
    number[]
  > => {
    if (sdk && account) {
      try {
        const totalSupply = await sdk.ChainDreamers.totalSupply();

        const promises = [];
        for (let i = 0; i < totalSupply.toNumber(); i++) {
          promises.push(
            sdk.ChainDreamers.tokenByIndex(i).then((bigId) => bigId.toNumber())
          );
        }

        const mintedDreamersIds: number[] = await Promise.all(promises);
        const mintedDreamersIdsMap = mintedDreamersIds.reduce(
          (result: Record<number, boolean>, id) => {
            result[id] = true;
            return result;
          },
          {}
        );

        const result: number[] = [];
        for (let i = 1; i <= 10000; i++) {
          if (!mintedDreamersIdsMap[i]) {
            result.push(i);
          }
        }

        return result;
      } catch (e) {
        setError((e as { error: Error }).error.message);
        return [];
      }
    }

    return [];
  }, [sdk, account, setError]);

  return {
    dreamersIds,
    mint,
    mintAsRunners,
    isWaitingForPayment,
    isMinting,
    fetchNonMintedDreamers,
  };
};

function uint16ToBytes(uint16: number): string {
  return ("0".repeat(4) + uint16.toString(16)).slice(-4);
}
