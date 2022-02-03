import { Dialog } from "@mui/material";
import Box from "@mui/material/Box";
import WalletButton, { WALLET_TYPE } from "../WalletButton/WalletButton";
import { useEthers } from "@usedapp/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import config, { CHAIN_ID } from "../../config";

const WalletConnectDialog: React.FC<{
  open: boolean;
  handleClose: () => void;
}> = (props) => {
  const supportedChainIds = [CHAIN_ID];
  const { activate } = useEthers();
  const { open, handleClose } = props;

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "black",
          padding: "64px",
        },
      }}
    >
      <Box
        sx={{
          width: "385px",
        }}
      >
        <Box
          sx={{
            fontWeight: 600,
            fontSize: "24px",
            textAlign: "center",
            marginBottom: "32px",
            color: "white",
          }}
        >
          Connect to your wallet to enter the project
        </Box>
        <WalletButton
          walletType={WALLET_TYPE.metamask}
          onClick={async () => {
            const injected = new InjectedConnector({
              supportedChainIds,
            });
            await activate(injected);
            handleClose();
          }}
          sx={{ marginBottom: "32px", width: "100%" }}
        />
        <WalletButton
          walletType={WALLET_TYPE.coinbasewallet}
          onClick={async () => {
            const walletlink = new WalletLinkConnector({
              appName: "ChainDreamers",
              url: config.app.jsonRpcUri,
              supportedChainIds,
            });
            await activate(walletlink);
            handleClose();
          }}
          sx={{ marginBottom: "32px", width: "100%" }}
        />
        <WalletButton
          walletType={WALLET_TYPE.walletconnect}
          onClick={async () => {
            const walletlink = new WalletConnectConnector({
              supportedChainIds,
              chainId: CHAIN_ID,
              rpc: {
                [CHAIN_ID]: config.app.jsonRpcUri,
              },
            });
            await activate(walletlink);
            handleClose();
          }}
          sx={{ width: "100%" }}
        />
      </Box>
    </Dialog>
  );
};

export default WalletConnectDialog;
