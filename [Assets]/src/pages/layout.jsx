import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import Header from "../components/header";

const Layout = () => {
  return (
    <>
      <Header />
      {// box is full width by default, centered
      }
      <Box
        sx={{
          width: "90vw",
          height: "80vh",
          display: "flex",
          border: "1px solid black",
          marginLeft: "5vw",
          marginRight: "5vw",
        }}
      >
        <Outlet />
      </Box>
    </>
  )
};

export default Layout;