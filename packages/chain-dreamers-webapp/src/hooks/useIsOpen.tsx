import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { useIsLaunched } from "./useIsLaunched";
import { closeDate } from "../config";

export const useIsOpen = (): {
  isCandyShopOpen: boolean;
  isRehabCenterShopOpen: boolean;
} => {
  const now = React.useRef<Dayjs>(dayjs());
  const { isLaunched } = useIsLaunched();
  const [isCandyShopOpen, setIsCandyShopOpen] = React.useState<boolean>(
    isLaunched && closeDate.isAfter(now.current)
  );
  const [isRehabCenterShopOpen, setIsRehabCenterShopOpen] =
    React.useState<boolean>(closeDate.isBefore(now.current));

  React.useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;

    if (!isRehabCenterShopOpen) {
      interval = setInterval(() => {
        now.current = dayjs();
        const newIsCandyShopOpen = isLaunched && closeDate.isAfter(now.current);
        const newIsRehabCenterShopOpen = closeDate.isBefore(now.current);

        if (newIsCandyShopOpen !== isCandyShopOpen) {
          setIsCandyShopOpen(newIsCandyShopOpen);
        }
        if (newIsRehabCenterShopOpen !== isRehabCenterShopOpen) {
          setIsRehabCenterShopOpen(newIsRehabCenterShopOpen);
        }
      }, 1000);
    } else if (isRehabCenterShopOpen && interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRehabCenterShopOpen, isCandyShopOpen, isLaunched]);

  return {
    isCandyShopOpen,
    isRehabCenterShopOpen,
  };
};
