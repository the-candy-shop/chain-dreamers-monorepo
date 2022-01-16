import React from "react";
import Box from "@mui/material/Box";
import PageTitle from "../PageTitle/PageTitle";
import TeamMember from "../TeamMember/TeamMember";
import photo from "./photo.png";
import { useMediaQuery } from "@mui/material";
import banner from "./banner.png";

function Team() {
  const isMobile = useMediaQuery("(max-width:915px)");

  return (
    <Box>
      <PageTitle label="Team" background={banner} />
      <Box
        sx={{
          marginTop: "96px",
          display: "flex",
          justifyContent: "center",
          padding: isMobile ? "0 16px" : 0,
        }}
      >
        <Box sx={{ maxWidth: "895px" }}>
          <TeamMember name="Jaz" image={photo}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum
            duis iaculis ultrices lectus elit, pharetra donec venenatis. Nulla
            risus lobortis congue a, tellus pharetra tempus tincidunt arcu.
            Vitae orci porta nulla scelerisque{" "}
          </TeamMember>
          <TeamMember name="Clément" image={photo}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum
            duis iaculis ultrices lectus elit, pharetra donec venenatis. Nulla
            risus lobortis congue a, tellus pharetra tempus tincidunt arcu.
            Vitae orci porta nulla scelerisque{" "}
          </TeamMember>
          <TeamMember name="Law" image={photo}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum
            duis iaculis ultrices lectus elit, pharetra donec venenatis. Nulla
            risus lobortis congue a, tellus pharetra tempus tincidunt arcu.
            Vitae orci porta nulla scelerisque{" "}
          </TeamMember>
          <TeamMember name="Côme" image={photo}>
            Product designer based in Paris, building the future of NFT mint
            experiences. Also a passionate fisherman.
          </TeamMember>
          <TeamMember name="Georges" image={photo}>
            Web developer based in Paris. Love to tell chain-stories that won’t
            be lost like tears in rain.
          </TeamMember>
        </Box>
      </Box>
    </Box>
  );
}

export default Team;
