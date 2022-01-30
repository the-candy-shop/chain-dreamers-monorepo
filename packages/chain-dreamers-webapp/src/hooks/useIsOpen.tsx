import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { useIsLaunched } from "./useIsLaunched";
import { closeDate } from "../config";

export const useIsOpen = (): {
  isCandyShopOpen: boolean;
  isJailOpen: boolean;
} => {
  const now = React.useRef<Dayjs>(dayjs());
  const { isLaunched } = useIsLaunched();
  const [isCandyShopOpen, setIsCandyShopOpen] = React.useState<boolean>(
    isLaunched && closeDate.isAfter(now.current)
  );
  const [isJailOpen, setIsJailOpen] = React.useState<boolean>(
    closeDate.isBefore(now.current)
  );

  React.useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;

    if (!isJailOpen) {
      interval = setInterval(() => {
        now.current = dayjs();
        const newIsCandyShopOpen = isLaunched && closeDate.isAfter(now.current);
        const newIsJailOpen = closeDate.isBefore(now.current);

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
