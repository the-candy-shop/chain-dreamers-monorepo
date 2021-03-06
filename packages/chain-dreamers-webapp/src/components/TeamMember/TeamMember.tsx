import React from "react";
import Box from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";

type TeamMemberProps = {
  name: string;
  children: React.ReactNode;
  image: string;
};

function TeamMember({ name, children, image }: TeamMemberProps) {
  const isSmallWidth = useMediaQuery("(max-width:915px)");

  return (
    <Box sx={{ textAlign: "center", marginBottom: "64px" }}>
      <Box
        sx={{
          "& .team-member-photo": { width: "234px", borderRadius: "12px" },
        }}
      >
        <img alt="team member" src={image} className="team-member-photo" />
      </Box>
      <Box
        sx={{
          fontWeight: "bold",
          fontSize: isSmallWidth ? "32px" : "40px",
          marginTop: "32px",
        }}
      >
        {name}
      </Box>
      <Box
        sx={{
          fontSize: isSmallWidth ? "20px" : "24px",
          marginTop: "32px",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default TeamMember;
