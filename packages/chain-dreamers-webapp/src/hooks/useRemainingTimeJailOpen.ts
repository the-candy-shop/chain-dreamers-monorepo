import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { jailClosingDate } from "../config";
import { useIsOpen } from "./useIsOpen";

export const useRemainingTimeJailOpen = (): {
  remainingTimeOpenInSeconds: number;
} => {
  const now = React.useRef<Dayjs>(dayjs());
  const { isJailOpen } = useIsOpen();
  const [remainingTimeOpenInSeconds, setRemainingTimeOpenInSeconds] =
    React.useState<number>(jailClosingDate.diff(now.current, "second"));

  React.useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;

    if (isJailOpen) {
      interval = setInterval(() => {
        now.current = dayjs();

        const newRemainingTimeOpenInSeconds = jailClosingDate.diff(
          now.current,
          "second"
        );

        if (newRemainingTimeOpenInSeconds !== remainingTimeOpenInSeconds) {
          setRemainingTimeOpenInSeconds(newRemainingTimeOpenInSeconds);
        }
      }, 1000);
    } else if (!isJailOpen && interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isJailOpen, remainingTimeOpenInSeconds]);

  return {
    remainingTimeOpenInSeconds,
  };
};
