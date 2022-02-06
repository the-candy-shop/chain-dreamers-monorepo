import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { useIsLaunched } from "./useIsLaunched";
import { candyShopClosingDate, jailClosingDate } from "../config";

export const useIsOpen = (): {
  isCandyShopOpen: boolean;
  isJailOpen: boolean;
} => {
  const now = React.useRef<Dayjs>(dayjs());
  const { isLaunched } = useIsLaunched();
  const [isCandyShopOpen, setIsCandyShopOpen] = React.useState<boolean>(
    isLaunched && candyShopClosingDate.isAfter(now.current)
  );
  const [isJailOpen, setIsJailOpen] = React.useState<boolean>(
    candyShopClosingDate.isBefore(now.current) &&
      jailClosingDate.isAfter(now.current)
  );

  React.useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;

    if (!isJailOpen) {
      interval = setInterval(() => {
        now.current = dayjs();
        const newIsCandyShopOpen =
          isLaunched && candyShopClosingDate.isAfter(now.current);
        const newIsJailOpen =
          candyShopClosingDate.isBefore(now.current) &&
          jailClosingDate.isAfter(now.current);

        if (newIsCandyShopOpen !== isCandyShopOpen) {
          setIsCandyShopOpen(newIsCandyShopOpen);
        }
        if (newIsJailOpen !== isJailOpen) {
          setIsJailOpen(newIsJailOpen);
        }
      }, 1000);
    } else if (isJailOpen && interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isJailOpen, isCandyShopOpen, isLaunched]);

  return {
    isCandyShopOpen,
    isJailOpen,
  };
};
