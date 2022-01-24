import React from "react";
import Box from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";

type PageTitleProps = {
  label: string;
  background: string;
};

function PageTitle({ label, background }: PageTitleProps) {
  const isSmallWidth = useMediaQuery("(max-width:915px)");

  return (
    <Box
      sx={{
        width: "100%",
        height: isSmallWidth ? "400px" : "450px",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPositionX: "center",
        backgroundPositionY: "center",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          padding: isSmallWidth ? "32px 45px" : "40px 72px",
          fontWeight: "bold",
          fontSize: isSmallWidth ? "28px" : "40px",
          background: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "8px 8px 0px 0px",
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        {label}
      </Box>
    </Box>
  );
}

export default PageTitle;
