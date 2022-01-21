import React from "react";
import Box, { BoxProps } from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";

type H1Props = {
  children: React.ReactNode;
  sx?: BoxProps["sx"];
};

function H1({ children, sx }: H1Props) {
  const isSmallWidth = useMediaQuery("(max-width:915px)");

  return (
    <Box
      sx={{
        fontWeight: "bold",
        fontSize: isSmallWidth ? "32px" : "40px",
        marginBottom: "24px",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export default H1;
