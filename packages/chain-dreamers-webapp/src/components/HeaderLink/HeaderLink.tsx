import React from 'react';
import Box from '@mui/material/Box';

type HeaderLinkProps = {
  label: string;
}

function HeaderLink({ label }: HeaderLinkProps) {
  return (
    <Box sx={{
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '19px',
      color: 'white',
      padding: '12px 20px',
    }}>
      {label}
    </Box>
  );
}

export default HeaderLink;
