import React from "react";
import { useEthers } from "@usedapp/core";
import { useSdk } from "./useSdk";
import { SnackbarErrorContext } from "../contexts/SnackbarErrorContext";
import { RunnersContext } from "../contexts/RunnersContext";

export const useRunnersContract = () => {
  const { account } = useEthers();
  const {
    runnersCount,
    setRunnersCount,
    runnersIds,
    setRunnersIds,
    isFetching,
    hasFetch,
    setIsFetching,
    setHasFetch,
  } = React.useContext(RunnersContext);
  const { setError } = React.useContext(SnackbarErrorContext);

  const sdk = useSdk();

  React.useEffect(() => {
    if (sdk && account) {
      // @ts-ignore
      window.mintRunner = sdk.ChainRunners.mint;
    }
  }, [account, sdk]);

  const fetchRunnersCount = React.useCallback(async (): Promise<number> => {
    if (sdk && account) {
      try {
        const balance = await sdk.ChainRunners.balanceOf(account);
        setRunnersCount(balance.toNumber());

        return balance.toNumber();
      } catch (e) {
        setError((e as { error: Error }).error.message);
        return 0;
      }
    }

    return 0;
  }, [account, sdk, setRunnersCount, setError]);

  const fetchRunnersIds = React.useCallback(async (): Promise<number[]> => {
    if (sdk && account) {
      setIsFetching(true);
      try {
        const balance = await fetchRunnersCount();
        const promises = [];
        for (let i = 0; i < balance; i++) {
          promises.push(
            sdk.ChainRunners.tokenOfOwnerByIndex(account, i)
              .then((bigId) => bigId.toNumber())
              .catch(() => null)
          );
        }

        const ids = (await Promise.all(promises)).filter(
          (id) => !!id
        ) as number[];

        setRunnersIds(ids);
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
  }, [account, sdk, setError, fetchRunnersCount, setRunnersIds]);

  React.useEffect(() => {
    if (sdk && account && !isFetching && !hasFetch) {
      fetchRunnersIds();
    }
  }, [sdk, account, isFetching, hasFetch, fetchRunnersIds]);

  React.useEffect(() => {
    setHasFetch(false);
  }, [account]);

  return { runnersIds, runnersCount };
};
