import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Login from "./Login";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

const Header = () => {
  var loginData = useSelector((state) => {
    return state.user;
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{ backgroundColor: "rgb(26 98 153)", position: "sticky" }}
      >
        <Toolbar>
          <Grid container item xs={12}>
            <Grid item xs={2}>
              <h1 className="text-xl font-extrabold m-0">EcomShop</h1>
            </Grid>

            <Grid item xs={6}>
              <Stack direction="row">
                <Button component={RouterLink} to="/store" color="inherit">
                  Products
                </Button>
                {loginData.user && loginData.user.loggedIn && (
                  <Button component={RouterLink} to="/account" color="inherit">
                    Account
                  </Button>
                )}
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Login />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
