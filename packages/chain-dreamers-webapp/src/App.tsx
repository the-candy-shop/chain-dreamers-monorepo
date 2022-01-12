import React from 'react';
import Header from "./components/Header/Header";
import Box from "@mui/material/Box";
import Body from "./components/Body/Body";

function App() {
  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: '1312px' }}>
        <Header />
        <Body />
      </Box>
    </Box>
  );
}

export default App;
