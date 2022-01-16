import React from "react";
import Box from "@mui/material/Box";
import { Link, useLocation } from "react-router-dom";

type HeaderLinkProps = {
  label: string;
  to: string;
};

function HeaderLink({ label, to }: HeaderLinkProps) {
  const location = useLocation();
  const isCurrent = location.pathname === to;

  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <Box
        sx={{
          fontWeight: 600,
          fontSize: "16px",
          lineHeight: "19px",
          color: isCurrent ? "#44DFFD" : "white",
          padding: "12px 20px",
          textAlign: "center",
          "&:hover": {
            color: "#44DFFD",
          },
        }}
      >
        {label}
      </Box>
    </Link>
  );
}

export default HeaderLink;
