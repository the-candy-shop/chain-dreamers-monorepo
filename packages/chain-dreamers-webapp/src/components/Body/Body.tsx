import React from 'react';
import Box from '@mui/material/Box';
import background from "./background.png";

function Body() {
  return (
    <Box sx={{
      height: '798px',
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPositionX: 'center',
    }} />
  );
}

export default Body;
