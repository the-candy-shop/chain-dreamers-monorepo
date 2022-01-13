import React from 'react';
import { Routes, Route } from "react-router-dom";
import Body from "./components/Body/Body";

function RoutesWrapper() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Body />}
      />
    </Routes>
  );
}

export default RoutesWrapper;