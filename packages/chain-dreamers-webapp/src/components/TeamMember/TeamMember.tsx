import React from "react";
import Box from "@mui/material/Box";

type TeamMemberProps = {
  name: string;
  children: React.ReactNode;
  image: string;
};

function TeamMember({ name, children, image }: TeamMemberProps) {
  return (
    <Box sx={{ textAlign: "center", marginBottom: "64px" }}>
      <Box sx={{ "& .team-member-photo": { width: "234px" } }}>
        <img alt="team member" src={image} className="team-member-photo" />
      </Box>
      <Box
        sx={{
          fontWeight: "bold",
          fontSize: "40px",
          color: "white",
          marginTop: "32px",
        }}
      >
        {name}
      </Box>
      <Box
        sx={{
          fontWeight: 590,
          fontSize: "24px",
          color: "white",
          marginTop: "32px",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default TeamMember;
