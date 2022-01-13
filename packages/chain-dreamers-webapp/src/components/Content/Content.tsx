import React from "react";
import Box from "@mui/material/Box";
import H1 from "../H1/H1";

type ContentProps = {
  title: string;
  children: React.ReactNode;
};

function Content({ children, title }: ContentProps) {
  return (
    <Box
      sx={{
        marginBottom: "72px",

        "& p": {
          color: "white",
          fontSize: "24px",
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
