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

const Header = (prop) => {
  var loginData = useSelector((state) => {
    return state.user;
  });

  const button_normal = {
    margin: "0 15px",
    padding: "5px 25px",
  };

  const button_selected = {
    background: "rgb(71 146 193)",
    borderRadius: "10px",
    margin: "0 25px",
    height: "max-content",
    padding: "5px 25px",
  };

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
                <Button
                  component={RouterLink}
                  to="/store"
                  style={prop.id === 1 ? button_selected : button_normal}
                  color="inherit"
                >
                  Products
                </Button>
                {loginData.user && loginData.user.loggedIn && (
                  <Button
                    component={RouterLink}
                    to="/account"
                    style={prop.id === 2 ? button_selected : button_normal}
                    color="inherit"
                  >
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
