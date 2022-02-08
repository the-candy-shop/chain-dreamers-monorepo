import React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Grow from "@mui/material/Grow";

type HeaderMenuProps = {
  label: string;
};

function HeaderMenu({ label }: HeaderMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const open = Boolean(anchorEl);
  const handleOpen: React.MouseEventHandler<HTMLDivElement> = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      onMouseOver={handleOpen}
      onMouseLeave={handleClose}
      sx={{
        fontWeight: 600,
        fontSize: "16px",
        lineHeight: "19px",
        padding: "12px 20px",
        cursor: "pointer",
        position: "relative",
      }}
    >
      <span>{label}</span>
      <Box
        sx={{
          display: open ? "block" : "none",
          position: "absolute",
          top: anchorEl?.offsetHeight,
          left: 0,
          zIndex: 10,
        }}
      >
        <Grow appear in={open}>
          <Paper
            sx={{
              pointerEvents: "auto",
              background: "black",
              border: "1px solid white",
              borderRadius: "4px",
              padding: "6px 0",
              width: "190px",

              "& .menu-link": {
                display: "block",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "16px",
                color: "white",
                padding: "8px 24px",
                "&:hover": {
                  color: "#44DFFD",
                },
              },
            }}
          >
            <Link to="/story" className="menu-link">
              Story
            </Link>
            <Link to="/team" className="menu-link">
              Team
            </Link>
            <Link to="/on-chain-storage" className="menu-link">
              On-chain storage
            </Link>
          </Paper>
        </Grow>
      </Box>
    </Box>
  );
}

export default HeaderMenu;
