import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Login from "./Login";
import { Link as RouterLink } from "react-router-dom";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "rgb(26 98 153)" }}>
        <Toolbar>
          <Grid container item xs={12}>
            <Grid item xs={2}>
              <h1 className="text-xl font-extrabold m-0">EcomApp</h1>
            </Grid>

            <Grid item xs={7}>
              <Stack direction="row">
                <Button component={RouterLink} to="/store" color="inherit">
                  Products
                </Button>
                <Button component={RouterLink} to="/account" color="inherit">
                  Account
                </Button>
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
