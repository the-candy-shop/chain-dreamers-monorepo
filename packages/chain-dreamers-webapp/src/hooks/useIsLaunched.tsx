import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { launchDate } from "../config";

export const useIsLaunched = (): {
  isLaunched: boolean;
  hoursFromLaunch: number;
} => {
  const now = React.useRef<Dayjs>(dayjs());
  const [isLaunched, setIsLaunched] = React.useState<boolean>(
    now.current.isAfter(launchDate)
  );
  const [hoursFromLaunch, setHoursFromLaunch] = React.useState<number>(
    launchDate.diff(now.current, "hour")
  );

  React.useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;

    if (!isLaunched) {
      interval = setInterval(() => {
        now.current = dayjs();

        const newIsLaunched = now.current.isAfter(launchDate);
        const newHoursFromLaunch = launchDate.diff(now.current, "hour");

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
  }, [isLaunched]);

  return { isLaunched, hoursFromLaunch };
};
