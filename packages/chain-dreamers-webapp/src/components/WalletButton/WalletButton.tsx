import metamaskLogo from "./metamask-fox.svg";
import walletconnectLogo from "./walletconnect-logo.svg";
import Button, { ButtonProps } from "@mui/material/Button";

export enum WALLET_TYPE {
  metamask = "Metamask",
  walletconnect = "WalletConnect",
}

const logo = (walletType: WALLET_TYPE) => {
  switch (walletType) {
    case WALLET_TYPE.metamask:
      return metamaskLogo;
    case WALLET_TYPE.walletconnect:
      return walletconnectLogo;
    default:
      return "";
  }
};

const WalletButton: React.FC<{
  onClick: () => void;
  walletType: WALLET_TYPE;
  sx?: ButtonProps["sx"];
}> = (props) => {
  const { onClick, walletType, sx } = props;

  return (
    <Button
      onClick={onClick}
      sx={{
        fontWeight: 600,
        fontSize: "16px",
        lineHeight: "19px",
        color: "#44DFFD",
        padding: "12px 24px",
        border: "1px solid #AC0BF7",
        borderRadius: "4px",
        "& .wallet-logo": {
          height: "24px",
          marginRight: "10px",
        },
        ...sx,
      }}
    >
      <img
        src={logo(walletType)}
        alt={`${walletType} logo`}
        className="wallet-logo"
      />
      Connect with {walletType}
    </Button>
  );
};
export default WalletButton;
