import React from "react";
import Box from "@mui/material/Box";
import H1 from "../H1/H1";
import { useMediaQuery } from "@mui/material";

type ContentProps = {
  title?: string;
  titleColor?: string;
  children: React.ReactNode;
};

function Content({ children, title, titleColor }: ContentProps) {
  const isSmallWidth = useMediaQuery("(max-width:915px)");

  return (
    <Box
      sx={{
        marginBottom: "72px",

        "& p": {
          fontSize: isSmallWidth ? "20px" : "24px",
          lineHeight: isSmallWidth ? "30px" : "36px",
        },

        "& ul": {
          fontSize: isSmallWidth ? "20px" : "24px",
          lineHeight: isSmallWidth ? "30px" : "36px",
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

        "& .twitter-tweet-rendered": {
          margin: "auto",
        },
      }}
    >
      {title && <H1 sx={{ color: titleColor }}>{title}</H1>}
      {children}
    </Box>
  );
}

export default Content;
