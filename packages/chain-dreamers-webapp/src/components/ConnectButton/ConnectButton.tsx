import React from "react";
import { isMobile } from "react-device-detect";
import Button, { ButtonProps } from "@mui/material/Button";
import WalletConnectDialog from "../WalletConnectDialog/WalletConnectDialog";
import { useEthers } from "@usedapp/core";
import { useIsLaunched } from "../../hooks/useIsLaunched";
import { useCandyShopContract } from "../../hooks/useCandyShopContract";
import Box from "@mui/material/Box";
import flasks from "./flasks.png";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@mui/material";
import Typist from "react-typist";

type CountDownButtonProps = Pick<ButtonProps, "sx">;

function buildButtonLabel(
  isLaunched: boolean,
  account: string | null | undefined,
  totalCandyQuantity: number
): React.ReactNode {
  if (!isLaunched) {
    return "Opening: 2022/02/02 9am PST";
  }

  if (!account) {
    return "Connect";
  }

  if (totalCandyQuantity === 0) {
    return account.substring(0, 8);
  }

  return (
    <Box display="flex" alignItems="center">
      <Box display="flex">
        <img alt="flasks" src={flasks} style={{ height: "28px" }} />
        <Box
          marginLeft="4px"
          marginRight="10px"
          fontSize="12px"
          color="white"
          fontWeight={400}
          sx={{ textTransform: "none" }}
        >
          x{totalCandyQuantity}
        </Box>
      </Box>
      <Box>{account.substring(0, 8)}</Box>
    </Box>
  );
}

function ConnectButton({ sx }: CountDownButtonProps) {
  const { account, deactivate } = useEthers();
  const { totalQuantity } = useCandyShopContract();
  const navigate = useNavigate();

  const [connectDialogOpen, setConnectDialogOpen] =
    React.useState<boolean>(false);
  const [goToDesktopDialogOpen, setGoToDesktopDialogOpen] =
    React.useState<boolean>(false);

  const openConnectDialogMobile = React.useCallback(
    async () => setGoToDesktopDialogOpen(true),
    []
  );
  const closeConnectDialogMobile = React.useCallback(
    async () => setGoToDesktopDialogOpen(false),
    []
  );

  const openConnectDialog = React.useCallback(
    () => (isMobile ? openConnectDialogMobile() : setConnectDialogOpen(true)),
    [openConnectDialogMobile]
  );
  const closeConnectDialog = React.useCallback(
    () => setConnectDialogOpen(false),
    []
  );

  const { isLaunched } = useIsLaunched();

  const [menuAnchorEl, setMenuAnchorEl] = React.useState<Element | null>(null);
  const isMenuOpen = Boolean(menuAnchorEl);

  const openMenu: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setMenuAnchorEl(null);
  };

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
        onClick={isLaunched && !account ? openConnectDialog : openMenu}
      >
        {buildButtonLabel(isLaunched, account, totalQuantity)}
      </Button>
      <WalletConnectDialog
        open={!account && connectDialogOpen}
        handleClose={closeConnectDialog}
      />
      <Dialog open={goToDesktopDialogOpen} onClose={closeConnectDialogMobile}>
        <Box sx={{ background: "black" }}>
          <Box
            sx={{
              background: "rgba(218, 74, 138, 0.1)",
              border: "1px solid #DA4A8A",
              padding: "32px",
              color: "white",
              textAlign: "center",
              fontSize: "18px",
              fontFamily: "Share Tech Mono",
            }}
          >
            <Typist avgTypingDelay={20}>
              Connect from a desktop/laptop to mint your Dreamers
            </Typist>
          </Box>
        </Box>
      </Dialog>
      <Menu
        id="menu"
        anchorEl={menuAnchorEl}
        open={isMenuOpen}
        onClose={closeMenu}
        sx={{
          "& .MuiPaper-root": {
            background: "black",
            border: "1px solid #AC0BF7",
            marginTop: "4px",
            fontSize: "16px",
            lineHeight: "19px",
            color: "white",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            closeMenu();
            navigate("/my-dreamers");
          }}
          sx={{ fontWeight: 600, "&:hover": { color: "#44DFFD" } }}
        >
          My Dreamers
        </MenuItem>
        <MenuItem
          sx={{ fontWeight: 600, color: "#fd4444" }}
          onClick={() => {
            closeMenu();
            deactivate();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export default ConnectButton;
