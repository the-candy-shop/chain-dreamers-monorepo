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
          lineHeight: isMobile ? "30px" : "36px",
        },

        "& ul": {
          fontSize: isMobile ? "20px" : "24px",
          lineHeight: isMobile ? "30px" : "36px",
        },

        "& code": {
          color: "#78e168",
          backgroundColor: "rgba(135, 131, 120, 0.15)",
          borderRadius: "3px",
          padding: "2.72px 5.44px",
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
