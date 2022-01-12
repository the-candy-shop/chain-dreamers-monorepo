import React from 'react';
import Box from '@mui/material/Box';
import Tooltip, { tooltipClasses, TooltipProps } from "@mui/material/Tooltip";
import { styled } from '@mui/material/styles';

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'transparent',
    color: '#44DFFD',
    border: '1px solid #AC0BF7',
    borderRadius: '4px',
  },
}));

type FooterLink = {
  src: string;
  url: string;
  tooltip: string;
}

function FooterLink({ src, url, tooltip }: FooterLink) {
  return (
    <CustomTooltip title={tooltip}>
      <Box
        sx={{
          "& .logo": { height: '32px', width: '32px' },
          margin: '24px 12px',
          '&:hover': { opacity: 0.8 },
          cursor: 'pointer',
        }}
        onClick={() => window.open(url, '_blank')}
      >
        <img className="logo" src={src} />
      </Box>
    </CustomTooltip>
  );
}

export default FooterLink;
