import React from 'react';
import logo from './logo.png';
import Box from '@mui/material/Box';
import HeaderLink from "../HeaderLink/HeaderLink";
import CountDownButton from "../CountDownButton/CountDownButton";

function Header() {
  return (
      <Box sx={{
        height: '107px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Box sx={{ "& .logo": { height: '68px' }, height: '68px' }}>
          <img src={logo} alt="logo" className="logo" />
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
        }}>
          <HeaderLink label="Learn more" />
          <HeaderLink label="FAQ" />
          <CountDownButton />
        </Box>
      </Box>
  );
}

export default Header;
