import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Profile from "./Profile";
import { useDispatch, useSelector } from "react-redux";
import Login from "./Login";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  var loginData = useSelector((state) => {
    return state.user;
  });

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -10,
      top: 2,
      border: "none",
      fontSize: "11px",
      backgroundColor: "#367E18",
      padding: "5px 10px",
    },
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "rgb(47 123 181)" }}>
        <Toolbar>
          <Grid container item xs={12}>
            <Grid item xs={2}>
              <h1 className="text-xl font-extrabold m-0">Ecommerce App</h1>
            </Grid>

            <Grid item xs={7}>
              <Stack direction="row">
                <Button color="inherit">Products</Button>
              </Stack>
            </Grid>

            <Grid item xs={3}>
              <Login />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
