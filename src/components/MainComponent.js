import React from "react";
import Button from "@mui/material/Button";
import Header from "./Header";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Products from "./Products";

const MainComponent = () => {
  return (
    <React.Fragment>
      <Header />
      <Grid container item xs={12}>
        <Grid item xs={2}>
          <Grid container item xs={12} py={4} spacing={2}>
            <Grid item xs={12}>
              <Chip
                label="Ratings"
                component=""
                href="#basic-chip"
                variant="outlined"
                clickable
              />
            </Grid>
            <Grid item xs={12}>
              <Chip
                label="High -> Low"
                component=""
                href="#basic-chip"
                variant="outlined"
                clickable
              />
            </Grid>
            <Grid item xs={12}>
              <Chip
                label="Low -> High"
                component=""
                href="#basic-chip"
                variant="outlined"
                clickable
              />
            </Grid>
            <Grid item xs={12}>
              <Chip
                label="Include Out of Stock"
                component=""
                href="#basic-chip"
                variant="outlined"
                clickable
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <Products />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default MainComponent;
