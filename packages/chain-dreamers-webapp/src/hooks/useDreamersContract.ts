import React from "react";
import { useEthers } from "@usedapp/core";
import { useSdk } from "./useSdk";
import { ethers } from "ethers";
import { DreamersContext } from "../contexts/DreamersContext";
import { useCandyShopContract } from "./useCandyShopContract";
import { SnackbarErrorContext } from "../contexts/SnackbarErrorContext";
import { dreamerPrice } from "../config";

export const useDreamersContract = () => {
  const { account } = useEthers();

  const {
    dreamersCount,
    setDreamersCount,
    dreamersIds,
    setDreamersIds,
    isFetching,
    hasFetch,
    setIsFetching,
    setHasFetch,
  } = React.useContext(DreamersContext);

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
      setIsFetching(true);
      try {
        const balance = await fetchDreamersCount();
        const promises = [];
        for (let i = 0; i < balance; i++) {
          promises.push(
            sdk.ChainDreamers.tokenOfOwnerByIndex(account, i)
              .then((bigId) => bigId.toNumber())
              .catch(() => null)
          );
        }

        const ids = (await Promise.all(promises)).filter(
          (id) => !!id
        ) as number[];

        setDreamersIds(ids);
        setHasFetch(true);

        return ids;
      } catch (e) {
        setError((e as { error: Error }).error.message);
        return [];
      } finally {
        setIsFetching(false);
      }
    }

    return [];
  }, [
    account,
    sdk,
    setError,
    fetchDreamersCount,
    setDreamersIds,
    setIsFetching,
    setHasFetch,
  ]);

  React.useEffect(() => {
    if (sdk && account && !isFetching && !hasFetch) {
      fetchDreamersIds();
    }
  }, [sdk, account, isFetching, hasFetch, fetchDreamersIds]);

  React.useEffect(() => {
    setHasFetch(false);
  }, [account, setHasFetch]);

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
    [sdk, account, fetchDreamersIds]
  );

  const mintAsRunners = React.useCallback(
    async (runnerIds: number[], candyIds: number[]): Promise<void> => {
      return new Promise(async (resolve, reject) => {
        if (sdk && account) {
          try {
            setIsWaitingForPayment(true);
            await sdk.ChainDreamers.mintBatchRunnersAccess(
              "0x" + runnerIds.map(uint16ToBytes).join(""),
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
      waitForDreamersMint,
      account,
      dreamersCount,
      sdk,
      fetchCandyQuantities,
      setError,
    ]
  );

  const mint = React.useCallback(
    async (runnerIds: number[]): Promise<void> => {
      const price = dreamerPrice.times(runnerIds.length);

      return new Promise(async (resolve, reject) => {
        if (sdk && account) {
          try {
            setIsWaitingForPayment(true);
            await sdk.ChainDreamers.mintBatchPublicSale(
              "0x" + runnerIds.map(uint16ToBytes).join(""),
              {
                from: account,
                value: ethers.utils.parseEther(price.toString()),
              }
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
    [account, dreamersCount, sdk, setError, waitForDreamersMint]
  );

  const fetchMintedDreamers = React.useCallback(async (): Promise<
    boolean[]
  > => {
    if (sdk) {
      return sdk.ChainDreamers.getTokenExists();
    }

    return [];
  }, []);

  return {
    dreamersIds,
    mint,
    mintAsRunners,
    isWaitingForPayment,
    isMinting,
    fetchMintedDreamers,
  };
};

function uint16ToBytes(uint16: number): string {
  return ("0".repeat(4) + uint16.toString(16)).slice(-4);
}
