import React from "react";
import { isMobile } from "react-device-detect";
import Button, { ButtonProps } from "@mui/material/Button";
import WalletConnectDialog from "../WalletConnectDialog/WalletConnectDialog";
import { useEthers } from "@usedapp/core";
import { useIsLaunched } from "../../hooks/useIsLaunched";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import config, { CHAIN_ID } from "../../config";

type CountDownButtonProps = Pick<ButtonProps, "sx">;

function ConnectButton({ sx }: CountDownButtonProps) {
  const supportedChainIds = [CHAIN_ID];
  const { activate, account } = useEthers();

  const [connectDialogOpen, setConnectDialogOpen] =
    React.useState<boolean>(false);

  const openConnectDialogMobile = React.useCallback(async () => {
    const walletlink = new WalletConnectConnector({
      supportedChainIds,
      chainId: CHAIN_ID,
      rpc: {
        [CHAIN_ID]: config.app.jsonRpcUri,
      },
    });
    await activate(walletlink);
  }, [activate]);

  const openConnectDialog = React.useCallback(
    () => (isMobile ? openConnectDialogMobile() : setConnectDialogOpen(true)),
    [openConnectDialogMobile]
  );
  const closeConnectDialog = React.useCallback(
    () => setConnectDialogOpen(false),
    []
  );

  const { isLaunched } = useIsLaunched();

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
        {!isLaunched && `Opening: TBD`}
      </Button>
      <WalletConnectDialog
        open={!account && connectDialogOpen}
        handleClose={closeConnectDialog}
      />
    </>
  );
}

export default ConnectButton;
