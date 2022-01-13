import React from "react";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import { Link } from "react-router-dom";

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
        color: "white",
        padding: "12px 20px",
      }}
    >
      <span>{label}</span>
      <Popover
        id="menu"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        hideBackdrop={true}
        PaperProps={{
          onMouseLeave: handleClose,
        }}
        sx={{
          pointerEvents: "none",
          "& .MuiPaper-root": {
            pointerEvents: "auto",
            background: "black",
            color: "white",
            border: "1px solid white",
            borderRadius: "4px",
            padding: "6px 0",

            "& .menu-link": {
              display: "block",
              color: "white",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "16px",
              padding: "8px 24px",
            },
          },
        }}
      >
        <Link to="story" className="menu-link">
          The story
        </Link>
        <Link to="team" className="menu-link">
          The Team
        </Link>
        <Link to="on-chain-storage" className="menu-link">
          On chain storage
        </Link>
      </Popover>
    </Box>
  );
}

export default HeaderMenu;
