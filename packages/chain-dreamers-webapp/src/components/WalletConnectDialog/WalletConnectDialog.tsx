import { Dialog } from "@mui/material";
import Box from "@mui/material/Box";
import WalletButton, { WALLET_TYPE } from "../WalletButton/WalletButton";
import { useEthers } from "@usedapp/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
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
            color: "white",
            fontWeight: 600,
            fontSize: "24px",
            textAlign: "center",
            marginBottom: "32px",
          }}
        >
          Connect to your wallet to enter the project
        </Box>
        <WalletButton
          walletType={WALLET_TYPE.metamask}
          onClick={() => {
            const injected = new InjectedConnector({
              supportedChainIds,
            });
            activate(injected);
          }}
          sx={{ marginBottom: "32px", width: "100%" }}
        />
        <WalletButton
          walletType={WALLET_TYPE.walletconnect}
          onClick={() => {
            const walletlink = new WalletConnectConnector({
              supportedChainIds,
              chainId: CHAIN_ID,
              rpc: {
                [CHAIN_ID]: config.app.jsonRpcUri,
              },
            });
            activate(walletlink);
          }}
          sx={{ width: "100%" }}
        />
      </Box>
    </Dialog>
  );
};

export default WalletConnectDialog;
