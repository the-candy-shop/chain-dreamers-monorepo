import React from 'react';
import logo from './logo.png';
import Box from '@mui/material/Box';
import HeaderLink from "../HeaderLink/HeaderLink";
import CountDownButton from "../CountDownButton/CountDownButton";
import {Link} from "react-router-dom";
import HeaderMenu from "../HeaderMenu/HeaderMenu";

function Header() {
  return (
      <Box sx={{
        height: '107px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Link to="/">
          <Box sx={{ "& .logo": { height: '68px' }, height: '68px', marginLeft: '32px' }}>
            <img src={logo} alt="logo" className="logo" />
          </Box>
        </Link>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
        }}>
          <HeaderMenu label="Learn more" />
          <HeaderLink label="FAQ" to="faq" />
          <CountDownButton />
        </Box>
      </Box>
  );
}

export default Header;
