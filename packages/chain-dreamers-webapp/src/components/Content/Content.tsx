import React from "react";
import Box from "@mui/material/Box";
import H1 from "../H1/H1";
import { useMediaQuery } from "@mui/material";

type ContentProps = {
  title: string;
  children: React.ReactNode;
};

function Content({ children, title }: ContentProps) {
  const isMobile = useMediaQuery("(max-width:915px)");

  return (
    <Box
      sx={{
        marginBottom: "72px",

        "& p": {
          fontSize: isMobile ? "20px" : "24px",
        },

        "& ul": {
          fontSize: isMobile ? "20px" : "24px",
        },

        "& a": {
          color: "#44DFFD",
          textDecorationColor: "#44DFFD",
          textDecoration: "none",
        },
      }}
    >
      <H1>{title}</H1>
      {children}
    </Box>
  );
}

export default Content;
