import React from "react";
import Box from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";

type H1Props = {
  children: React.ReactNode;
};

function H1({ children }: H1Props) {
  const isMobile = useMediaQuery("(max-width:915px)");

  return (
    <Box
      sx={{
        fontWeight: "bold",
        fontSize: isMobile ? "32px" : "40px",
        marginBottom: "24px",
      }}
    >
      {children}
    </Box>
  );
}

export default H1;
