import React from "react";
import Box, { BoxProps } from "@mui/material/Box";
import Typist from "react-typist";

type ShopPanelsProps = {
  title: string;
  children: React.ReactNode;
  sx?: BoxProps["sx"];
};

function ShopPanels({ title, children, sx }: ShopPanelsProps) {
  return (
    <Box
      sx={{
        background: "rgba(218, 74, 138, 0.1)",
        display: "flex",
        flexDirection: "column",
        ...sx,
      }}
    >
      <Box className="title-container" sx={{ border: "1px solid #DA4A8A" }}>
        <Box
          className="title"
          sx={{
            padding: "4px",
            background: "#DA4A8A",
            display: "inline-block",
          }}
        >
          <Typist>{title}</Typist>
        </Box>
      </Box>
      <Box
        className="content"
        sx={{
          border: "1px solid #DA4A8A",
          borderTop: 0,
          flex: 1,
          display: "flex",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default ShopPanels;
