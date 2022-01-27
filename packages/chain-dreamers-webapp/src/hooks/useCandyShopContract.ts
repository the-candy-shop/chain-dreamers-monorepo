import React from "react";
import { useEthers } from "@usedapp/core";
import { useSdk } from "./useSdk";
import { ethers } from "ethers";
import { CandyList } from "../candies";
import { candyPrice } from "../config";
import { CandyQuantitiesContext } from "../contexts/CandyQuantitiesContext";

export const useCandyShopContract = () => {
  const { account } = useEthers();
  const sdk = useSdk();

  const [isWaitingForPayment, setIsWaitingForPayment] =
    React.useState<boolean>(false);
  const [isMinting, setIsMinting] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { candyQuantities, setCandyQuantities } = React.useContext(
    CandyQuantitiesContext
  );

  const totalQuantity = Object.values(candyQuantities).reduce(
    (res: number, q) => res + q,
    0
  );

  const fetchCandyQuantities = React.useCallback(async () => {
    if (sdk && account) {
      setIsLoading(true);
      const balance = await sdk.candyShop.balanceOfBatch(
        [account, account, account],
        [0, 1, 2]
      );

      setCandyQuantities({
        [CandyList.ChainMeth]: balance[0]?.toNumber(),
        [CandyList.HeliumSpice]: balance[1]?.toNumber(),
        [CandyList.SomnusTears]: balance[2]?.toNumber(),
      });
      setIsLoading(false);
    }
  }, [sdk, account, setCandyQuantities]);

  React.useEffect(() => {
    fetchCandyQuantities();
  }, [account, fetchCandyQuantities]);

  const mint = React.useCallback(
    async (quantity: Record<CandyList, number>): Promise<void> => {
      return new Promise(async (resovle) => {
        if (sdk && account) {
          setIsWaitingForPayment(true);
          const price = candyPrice.times(
            Object.values(quantity).reduce((res, q) => res + q, 0)
          );

          await sdk.candyShop.mintBatch(
            [0, 1, 2],
            [
              quantity[CandyList.ChainMeth],
              quantity[CandyList.HeliumSpice],
              quantity[CandyList.SomnusTears],
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
            await fetchCandyQuantities();
            setIsMinting(false);
            resovle();
          });
        } else {
          resovle();
        }
      });
    },
    [sdk, account, fetchCandyQuantities]
  );

  return {
    mint,
    candyQuantities,
    isWaitingForPayment,
    isMinting,
    isLoading,
    totalQuantity,
  };
};
