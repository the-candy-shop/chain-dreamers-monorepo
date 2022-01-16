import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { closeDate } from "../config";
import { useIsOpen } from "./useIsOpen";

export const useRemainingTimeOpen = (): {
  remainingTimeOpenInSeconds: number;
} => {
  const now = React.useRef<Dayjs>(dayjs());
  const { isCandyShopOpen } = useIsOpen();
  const [remainingTimeOpenInSeconds, setRemainingTimeOpenInSeconds] =
    React.useState<number>(closeDate.diff(now.current, "second"));

  React.useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;

    if (isCandyShopOpen) {
      interval = setInterval(() => {
        now.current = dayjs();

        const newRemainingTimeOpenInSeconds = closeDate.diff(
          now.current,
          "second"
        );

        if (newRemainingTimeOpenInSeconds !== remainingTimeOpenInSeconds) {
          setRemainingTimeOpenInSeconds(newRemainingTimeOpenInSeconds);
        }
      }, 1000);
    } else if (!isCandyShopOpen && interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCandyShopOpen, remainingTimeOpenInSeconds]);

  return {
    remainingTimeOpenInSeconds,
  };
};
