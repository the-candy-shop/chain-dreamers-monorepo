import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import WalletConnectDialog from "../WalletConnectDialog/WalletConnectDialog";
import { useEthers } from "@usedapp/core";
import { useIsLaunched } from "../../hooks/useIsLaunched";

type CountDownButtonProps = Pick<ButtonProps, "sx">;

function ConnectButton({ sx }: CountDownButtonProps) {
  const { account } = useEthers();

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

  const { isLaunched, hoursFromLaunch } = useIsLaunched();

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
