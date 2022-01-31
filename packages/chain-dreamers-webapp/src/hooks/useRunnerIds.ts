import React from "react";
import { useEthers } from "@usedapp/core";
import { useSdk } from "./useSdk";
import { SnackbarErrorContext } from "../contexts/SnackbarErrorContext";

export const useRunnerIds = (): number[] => {
  const { account } = useEthers();
  const [runnerCount, setRunnerCount] = React.useState<number>(0);
  const [runnerIds, setRunnerIds] = React.useState<number[]>([]);
  const { setError } = React.useContext(SnackbarErrorContext);

  const sdk = useSdk();

  React.useEffect(() => {
    if (sdk && account) {
      // @ts-ignore
      window.mintRunner = sdk.ChainRunners.mint;
    }
  }, [account, sdk]);

  React.useEffect(() => {
    if (sdk && account) {
      try {
        sdk.ChainRunners.balanceOf(account).then((balance) =>
          setRunnerCount(balance.toNumber())
        );
      } catch (e) {
        setError((e as { error: Error }).error.message);
      }
    }
  }, [account, sdk, setError]);

  React.useEffect(() => {
    if (sdk && account) {
      try {
        const promises = [];
        for (let i = 0; i < runnerCount; i++) {
          promises.push(
            sdk.ChainRunners.tokenOfOwnerByIndex(account, i).then((bigId) =>
              bigId.toNumber()
            )
          );
        }

        Promise.all(promises).then(setRunnerIds);
      } catch (e) {
        setError((e as { error: Error }).error.message);
      }
    }
  }, [account, sdk, runnerCount, setError]);

  return runnerIds;
};
