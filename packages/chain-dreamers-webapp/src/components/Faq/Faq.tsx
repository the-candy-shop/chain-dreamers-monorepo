import React from "react";
import Box from "@mui/material/Box";
import PageTitle from "../PageTitle/PageTitle";
import background from "../Home/background.png";
import Content from "../Content/Content";
import Link from "@mui/material/Link";

function Faq() {
  return (
    <Box>
      <PageTitle label="FAQ" background={background} />
      <Box
        sx={{
          marginTop: "96px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box sx={{ maxWidth: "895px" }}>
          <Content title="What is Chain Dreamers?">
            <p>
              Chain Dreamers is an NFT derivative project based on{" "}
              <Link href="https://www.chainrunners.xyz/" target="_blank">
                Chain Runners
              </Link>
            </p>
          </Content>
        </Box>
      </Box>
    </Box>
  );
}

export default Faq;
