import React from 'react';
import Header from "./components/Header/Header";
import Box from "@mui/material/Box";

function App() {
  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: '1312px' }}>
        <Header />
      </Box>
    </Box>
  );
}

export default App;
