import React from "react";
import Box from "@mui/material/Box";
import background from "./background.png";

function Home() {
  return (
    <Box sx={{ "& .background": { width: "100%" } }}>
      <img alt="Candy Shop" src={background} className="background" />
    </Box>
  );
}

export default Home;
