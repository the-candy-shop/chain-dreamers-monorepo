import React from "react";
import Box from "@mui/material/Box";

type H1Props = {
  children: React.ReactNode;
};

function H1({ children }: H1Props) {
  return (
    <Box
      sx={{
        color: "white",
        fontWeight: "bold",
        fontSize: "40px",
        marginBottom: "24px",
      }}
    >
      {children}
    </Box>
  );
}

export default H1;
