import React from 'react';
import Header from "./components/Header/Header";
import Box from "@mui/material/Box";
import Body from "./components/Body/Body";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: '1312px' }}>
        <Header />
        <Body />
        <Footer />
      </Box>
    </Box>
  );
}

export default App;
