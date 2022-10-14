import React from "react";
import Button from "@mui/material/Button";
import Header from "./Header";
import Grid from "@mui/material/Grid";
import CustomerInfo from "./CustomerInfo";
import { useSelector } from "react-redux";

const Account = () => {
  return (
    <React.Fragment>
      <Header />
      <Grid container item xs={12}>
        <Grid item xs={12}>
          <CustomerInfo />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Account;
