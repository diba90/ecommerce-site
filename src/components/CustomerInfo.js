import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import "./css/CustomerInfo.css";
import { useNavigate } from "react-router-dom";

const CustomerInfo = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  const grid_style = {
    padding: "40px 35%",
    "@media (max-width: 768px)": {
      padding: "10px",
      textAlign: "center",
    },
  };

  const userList = JSON.parse(localStorage.getItem("ListUsers"));

  var loginData = useSelector((state) => {
    return state.user;
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (loginData.user === null) {
      navigate("/");
    }
  }, [loginData.user, navigate]);

  useEffect(() => {
    if (userList && userList.length) {
      const getUsers = JSON.parse(localStorage.getItem("ListUsers"));

      getUsers.map((el) => {
        if (el.email === loginData.user.email) {
          setEmail(el.email);
          setFirstName(el.first_name);
          setLastName(el.last_name);
          setAddress(el.address);
        }
      });
    }
  }, [loginData.user.email, userList]);

  return (
    <React.Fragment>
      <Grid container item xs={12} sx={grid_style}>
        <Grid container item xs={12} style={{ padding: "30px 0" }}>
          <Grid item xs={6}>
            <p className="customer_info_text">{"Full Name :"}</p>
          </Grid>
          <Grid item xs={6}>
            <p className="customer_info_data">{firstName + " " + lastName}</p>
          </Grid>
        </Grid>
        <Grid container item xs={12} style={{ padding: "30px 0" }}>
          <Grid item xs={6}>
            <p className="customer_info_text">{"Email ID :"}</p>
          </Grid>
          <Grid item xs={6}>
            <p className="customer_info_data">{email}</p>
          </Grid>
        </Grid>
        <Grid container item xs={12} style={{ padding: "30px 0" }}>
          <Grid item xs={6}>
            <p className="customer_info_text">{"Password :"}</p>
          </Grid>
          <Grid item xs={6}>
            <p className="customer_info_data">{"********"}</p>
          </Grid>
        </Grid>
        <Grid container item xs={12} style={{ padding: "30px 0" }}>
          <Grid item xs={6}>
            <p className="customer_info_text">{"Address :"}</p>
          </Grid>
          <Grid item xs={6}>
            <p className="customer_info_data">{address}</p>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CustomerInfo;
