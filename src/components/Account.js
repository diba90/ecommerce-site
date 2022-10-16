import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Header from "./Header";
import Grid from "@mui/material/Grid";
import CustomerInfo from "./CustomerInfo";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Account = () => {
  var loginData = useSelector((state) => {
    return state.user;
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (loginData.user === null) {
      navigate("/");
    }
  }, [loginData.user]);

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
