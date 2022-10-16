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
        {/* <Grid item xs={2}>
          <h3
            style={{
              fontSize: "17px",
              fontWeight: "700",
              padding: "50px 35px 0 35px",
            }}
          >
            {"Filter Products"}
          </h3>
          <Grid
            container
            item
            xs={12}
            py={4}
            style={{ padding: "45px 35px" }}
            spacing={2}
          >
            <Grid item xs={12}>
              <Chip
                label="Ratings: 5 > 1"
                component=""
                href="#basic-chip"
                variant="outlined"
                clickable
              />
            </Grid>
            <Grid item xs={12}>
              <Chip
                label="Price: High > Low"
                component=""
                href="#basic-chip"
                variant="outlined"
                clickable
              />
            </Grid>
            <Grid item xs={12}>
              <Chip
                label="Price: Low > High"
                component=""
                href="#basic-chip"
                variant="outlined"
                clickable
              />
            </Grid>
            <Grid item xs={12}>
              <Chip
                label="Sort by Category"
                component=""
                href="#basic-chip"
                variant="outlined"
                clickable
              />
            </Grid>
          </Grid>
        </Grid> */}
        <Grid item xs={12}>
          <Products />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default MainComponent;
