import React from "react";
import { useEthers } from "@usedapp/core";
import { useSdk } from "./useSdk";
import { ethers } from "ethers";
import { DrugList } from "../drugs";
import { drugPrice } from "../config";

export const useCandyShopContract = () => {
  const { account } = useEthers();
  const sdk = useSdk();

  const [isMinting, setIsMinting] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [drugQuantities, setDrugQuantity] = React.useState<
    Record<DrugList, number>
  >({
    [DrugList.ChainMeth]: 0,
    [DrugList.HeliumSpice]: 0,
    [DrugList.SomnusTears]: 0,
  });

  const fetchDrugQuantities = React.useCallback(async () => {
    if (sdk && account) {
      setIsLoading(true);
      const balance = await sdk.candyShop.balanceOfBatch(
        [account, account, account],
        [0, 1, 2]
      );

      setDrugQuantity({
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
    async (quantity: Record<DrugList, number>) => {
      setIsMinting(true);
      if (sdk && account) {
        const price =
          drugPrice * Object.values(quantity).reduce((res, q) => res + q, 0);

        try {
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
        } finally {
          const event = sdk.candyShop.filters.TransferBatch(account);
          sdk.candyShop.once(event, async (e) => {
            await fetchDrugQuantities();
            setIsMinting(false);
          });
        }
      }
    },
    [sdk, account]
  );

  console.log("drugQuantities", drugQuantities);
  return { mint, drugQuantities, isMinting, isLoading };
};
