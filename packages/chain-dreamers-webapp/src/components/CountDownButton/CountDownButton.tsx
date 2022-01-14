import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const launchDate = dayjs("2022-01-30 10:00").tz("America/Los_Angeles");

type CountDownButtonProps = Pick<ButtonProps, "sx">;

function CountDownButton({ sx }: CountDownButtonProps) {
  const [now, setNow] = React.useState<Dayjs>(dayjs());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setNow(dayjs());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hoursFromLaunch = launchDate.diff(now, "hour");
  const daysFromLaunch = Math.floor(hoursFromLaunch / 24);
  const andHoursFromLaunch = hoursFromLaunch - daysFromLaunch * 24;

  return (
    <Button
      sx={{
        fontWeight: 600,
        fontSize: "16px",
        lineHeight: "19px",
        color: "#44DFFD",
        padding: "12px 24px",
        border: "1px solid #AC0BF7",
        borderRadius: "4px",
        textTransform: "none",
        ...sx,
      }}
    >
      {daysFromLaunch} Days {andHoursFromLaunch} hours before opening
    </Button>
  );
}

export default CountDownButton;
