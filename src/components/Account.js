import React, { useEffect } from "react";
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
  }, [loginData.user, navigate]);

  return (
    <React.Fragment>
      <Header id={2} />
      <Grid container item xs={12}>
        <Grid item xs={12}>
          <CustomerInfo />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Account;
