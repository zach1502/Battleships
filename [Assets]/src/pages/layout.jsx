import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import Header from "../components/header";
import { Margin } from "@mui/icons-material";

const Layout = () => {
  return (
    <>
      <Header />
      {// box is full width by default, centered
      }
      <Box
        sx={{
          width: "80vw",
          height: "80vh",
          display: "flex",
          border: "1px solid black",
          marginLeft: "10vw",
          marginRight: "10vw",
        }}
      >
        <Outlet />
      </Box>
    </>
  )
};

export default Layout;