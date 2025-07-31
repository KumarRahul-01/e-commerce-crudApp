import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box 
      sx={{ 
        backgroundColor: "#333", 
        color: "white", 
        textAlign: "center", 
        py: 2, 
        mt: 4 
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} YourCompany. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
