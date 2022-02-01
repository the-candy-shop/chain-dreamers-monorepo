import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { candyShopOpeningDate } from "../config";

export const useIsLaunched = (): {
  isLaunched: boolean;
  hoursFromLaunch: number;
} => {
  const now = React.useRef<Dayjs>(dayjs());
  const [isLaunched, setIsLaunched] = React.useState<boolean>(
    now.current.isAfter(candyShopOpeningDate)
  );
  const [hoursFromLaunch, setHoursFromLaunch] = React.useState<number>(
    candyShopOpeningDate.diff(now.current, "hour")
  );

  React.useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;

    if (!isLaunched) {
      interval = setInterval(() => {
        now.current = dayjs();

        const newIsLaunched = now.current.isAfter(candyShopOpeningDate);
        const newHoursFromLaunch = candyShopOpeningDate.diff(
          now.current,
          "hour"
        );

        if (newIsLaunched !== isLaunched) {
          setIsLaunched(newIsLaunched);
        }
        if (newHoursFromLaunch !== hoursFromLaunch) {
          setHoursFromLaunch(newHoursFromLaunch);
        }
      }, 1000);
    } else if (isLaunched && interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLaunched, hoursFromLaunch]);

  return { isLaunched, hoursFromLaunch };
};
