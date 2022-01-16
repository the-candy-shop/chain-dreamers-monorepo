import React from "react";
import Link from "@mui/material/Link";
import Tooltip, { tooltipClasses, TooltipProps } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "black",
    color: "#44DFFD",
    border: "1px solid #AC0BF7",
    borderRadius: "4px",
  },
}));

type FooterLinkProps = {
  src: string;
  url: string;
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
