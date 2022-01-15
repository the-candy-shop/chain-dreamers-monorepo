import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import WalletConnectDialog from "../WalletConnectDialog/WalletConnectDialog";
import { useEthers } from "@usedapp/core";

dayjs.extend(utc);
dayjs.extend(timezone);

const localStorageLaunchDate = localStorage.getItem("LAUNCH_DATE");

const launchDateString = localStorageLaunchDate
  ? localStorageLaunchDate
  : "2022-01-30 10:00";
const launchDate = dayjs(launchDateString).tz("America/Los_Angeles");

type CountDownButtonProps = Pick<ButtonProps, "sx">;

function ConnectButton({ sx }: CountDownButtonProps) {
  const { account, ...rest } = useEthers();

  const [connectDialogOpen, setConnectDialogOpen] =
    React.useState<boolean>(false);
  const openConnectDialog = React.useCallback(
    () => setConnectDialogOpen(true),
    []
  );
  const closeConnectDialog = React.useCallback(
    () => setConnectDialogOpen(false),
    []
  );

  const [now, setNow] = React.useState<Dayjs>(dayjs());
  const isLaunched = now.isAfter(launchDate);

  React.useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;

    if (!isLaunched) {
      interval = setInterval(() => {
        setNow(dayjs());
      }, 1000);
    } else if (isLaunched && interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLaunched]);

  const hoursFromLaunch = launchDate.diff(now, "hour");
  const daysFromLaunch = Math.floor(hoursFromLaunch / 24);
  const andHoursFromLaunch = hoursFromLaunch - daysFromLaunch * 24;

  return (
    <>
      <Button
        sx={{
          fontWeight: 600,
          fontSize: "16px",
          lineHeight: "19px",
          color: "#44DFFD",
          padding: "12px 24px",
          border: "1px solid #AC0BF7",
          borderRadius: "4px",
          textTransform: isLaunched ? "uppercase" : "none",
          ...sx,
        }}
        onClick={isLaunched && !account ? openConnectDialog : undefined}
      >
        {isLaunched && account && account.substring(0, 8)}
        {isLaunched && !account && "Connect"}
        {!isLaunched &&
          `${daysFromLaunch} Days ${andHoursFromLaunch} hours before opening`}
      </Button>
      <WalletConnectDialog
        open={!account && connectDialogOpen}
        handleClose={closeConnectDialog}
      />
    </>
  );
}

export default ConnectButton;
