import React from "react";
import { useEthers } from "@usedapp/core";
import { useSdk } from "./useSdk";
import { ethers } from "ethers";
import { DrugList } from "../drugs";
import { drugPrice } from "../config";
import { DrugQuantitiesContext } from "../contexts/DrugQuantitiesContext";

export const useCandyShopContract = () => {
  const { account } = useEthers();
  const sdk = useSdk();

  const [isWaitingForPayment, setIsWaitingForPayment] =
    React.useState<boolean>(false);
  const [isMinting, setIsMinting] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { drugQuantities, setDrugQuantities } = React.useContext(
    DrugQuantitiesContext
  );

  const totalQuantity = Object.values(drugQuantities).reduce(
    (res, q) => res + q,
    0
  );

  const fetchDrugQuantities = React.useCallback(async () => {
    if (sdk && account) {
      setIsLoading(true);
      const balance = await sdk.candyShop.balanceOfBatch(
        [account, account, account],
        [0, 1, 2]
      );

      setDrugQuantities({
        [DrugList.ChainMeth]: balance[0]?.toNumber(),
        [DrugList.HeliumSpice]: balance[1]?.toNumber(),
        [DrugList.SomnusTears]: balance[2]?.toNumber(),
      });
      setIsLoading(false);
    }
  }, [sdk, account]);

  React.useEffect(() => {
    fetchDrugQuantities();
  }, [account, sdk]);

  const mint = React.useCallback(
    async (quantity: Record<DrugList, number>): Promise<void> => {
      return new Promise(async (resovle) => {
        setIsWaitingForPayment(true);
        if (sdk && account) {
          const price = drugPrice.times(
            Object.values(quantity).reduce((res, q) => res + q, 0)
          );

          await sdk.candyShop.mintBatch(
            [0, 1, 2],
            [
              quantity[DrugList.ChainMeth],
              quantity[DrugList.HeliumSpice],
              quantity[DrugList.SomnusTears],
            ],
            {
              from: account,
              value: ethers.utils.parseEther(price.toString()),
            }
          );
          setIsWaitingForPayment(false);
          setIsMinting(true);
          const event = sdk.candyShop.filters.TransferBatch(account);
          sdk.candyShop.once(event, async () => {
            await fetchDrugQuantities();
            setIsMinting(false);
            resovle();
          });
        }
      });
    },
    [sdk, account]
  );

  return {
    mint,
    drugQuantities,
    isWaitingForPayment,
    isMinting,
    isLoading,
    totalQuantity,
  };
};
