import React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

type HeaderLinkProps = {
  label: string;
  to: string;
};

function HeaderLink({ label, to }: HeaderLinkProps) {
  return (
    <Link to={to}>
      <Box
        sx={{
          fontWeight: 600,
          fontSize: "16px",
          lineHeight: "19px",
          color: "white",
          padding: "12px 20px",
          textAlign: "center",
        }}
      >
        {label}
      </Box>
    </Link>
  );
}

export default HeaderLink;
