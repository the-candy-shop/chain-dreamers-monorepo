import React from "react";
import Link from "@mui/material/Link";
import CustomTooltip from "../CustomTooltip/CustomTooltip";

type FooterLinkProps = {
  src: string;
  url?: string;
  tooltip: string;
};

function FooterLink({ src, url, tooltip }: FooterLinkProps) {
  return (
    <CustomTooltip title={tooltip}>
      <Link
        sx={{
          "& .logo": { height: "32px", width: "32px" },
          margin: "24px 12px",
          "&:hover": { opacity: 0.8 },
          cursor: "pointer",
          display: "block",
        }}
        href={url}
        target="_blank"
      >
        <img className="logo" src={src} alt="logo" />
      </Link>
    </CustomTooltip>
  );
}

export default FooterLink;
