import React from "react";
import Box from "@mui/material/Box";

type PageTitleProps = {
  label: string;
  background: string;
};

function PageTitle({ label, background }: PageTitleProps) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "550px",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPositionX: "center",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          height: "120px",
          width: "224px",
          color: "white",
          fontWeight: "bold",
          fontSize: "40px",
          background: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "8px 8px 0px 0px",
        }}
      >
        {label}
      </Box>
    </Box>
  );
}

export default PageTitle;
