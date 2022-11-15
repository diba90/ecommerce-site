import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import "./Signup.css";

const Signup = () => {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState({});
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (flag === true) {
      if (localStorage.getItem("ListUsers") != null) {
        const addedUser = JSON.parse(localStorage.getItem("ListUsers"));
        const updatedUsers = [...addedUser, obj];
        localStorage.setItem("ListUsers", JSON.stringify(updatedUsers));
        setVisible(true);
        setTimeout(() => {
          setVisible(false);
          setOpen(false);
        }, 2000);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setAddress("");
      } else {
        localStorage.setItem("ListUsers", JSON.stringify(users));
        const addedUser = JSON.parse(localStorage.getItem("ListUsers"));
        const updatedUsers = [...addedUser, obj];
        localStorage.setItem("ListUsers", JSON.stringify(updatedUsers));
        setVisible(true);
        setTimeout(() => {
          setVisible(false);
          setOpen(false);
        }, 2000);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setAddress("");
      }
    }
  }, [error]);

  var users = [
    {
      first_name: "Admin",
      last_name: "",
      email: "admin@email.com",
      password: "admin123",
      address: "Nagavarapalya, CV Raman Nagar, Bangalore, Karnataka, 560093",
    },
    {
      first_name: "Raj",
      last_name: "Dutta",
      email: "raj@gmail.com",
      password: "raj123",
      address: "Kormanagala, Bangalore, Karnataka, 560073",
    },
  ];

  var input_first_name = firstName;
  var input_last_name = lastName;
  var input_email = email;
  var input_password = password;
  var input_address = address;

  var obj = {
    first_name: input_first_name,
    last_name: input_last_name,
    email: input_email,
    password: input_password,
    address: input_address,
  };

  function handleSubmit() {
    const errors = {};
    const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i;

    if (!firstName) {
      errors.firstname = "First Name is required!";
      setFlag(false);
    }

    if (!lastName) {
      errors.lastname = "Last Name is required!";
      setFlag(false);
    }

    if (!email) {
      errors.email = "Email is required!";
      setFlag(false);
    } else if (!regex.test(email)) {
      errors.email = "This is not a valid email!";
      setFlag(false);
    }

    if (!password) {
      errors.password = "Password is required!";
      setFlag(false);
    } else if (password.length < 4) {
      errors.password = "Password should have 4 characters";
      setFlag(false);
    } else if (password.length > 8) {
      errors.password = "Password should not exceed 8 characters";
      setFlag(false);
    } else {
      setFlag(true);
    }

    if (!address) {
      errors.address = "Address is required for shipping the item!";
      setFlag(false);
    }

    setError(errors);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="inherit" onClick={handleClickOpen}>
        Create an Account
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Collapse style={{ width: "100%" }} in={visible}>
          <Alert style={{ width: "100%" }} variant="filled" severity="success">
            Account created successfully.
          </Alert>
        </Collapse>
        <DialogTitle>Create an Account</DialogTitle>
        <DialogContent style={{ width: "600px" }}>
          <Grid container item xs={12} spacing={4}>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                id="first_name"
                label="First Name"
                type="text"
                value={firstName}
                fullWidth
                variant="outlined"
                onChange={(event) => setFirstName(event.target.value)}
              />
              <p className="validation__message">{error.firstname}</p>
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                id="last_name"
                value={lastName}
                label="Last Name"
                type="text"
                fullWidth
                variant="outlined"
                onChange={(event) => setLastName(event.target.value)}
              />
              <p className="validation__message">{error.lastname}</p>
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                id="name"
                label="Email ID"
                value={email}
                type="email"
                fullWidth
                variant="outlined"
                onChange={(event) => setEmail(event.target.value)}
              />
              <p className="validation__message">{error.email}</p>
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                id="name"
                value={password}
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                onChange={(event) => setPassword(event.target.value)}
              />
              <p className="validation__message">{error.password}</p>
            </Grid>
          </Grid>
          <Grid container item xs={12} sx={{ mt: "10px" }}>
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-flexible"
                label="Address of Correspondense"
                multiline
                fullWidth
                value={address}
                variant="outlined"
                style={{ textAlign: "left" }}
                rows={2}
                onChange={(event) => setAddress(event.target.value)}
              />
              <p className="validation__message">{error.address}</p>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Signup;
