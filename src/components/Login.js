import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { login, logout } from "../features/userSlice";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Signup from "./Signup";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import "./Login.css";

const Login = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(null);
  const [visible, setVisible] = useState(false);
  const [flag, setFlag] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertText, setAlertText] = useState("");

  const userList = JSON.parse(localStorage.getItem("ListUsers"));

  var loginData = useSelector((state) => {
    return state.user;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  var errors = {};
  var i = 1;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    {
      if (flag === true) {
        if (userList && userList.length) {
          const getUsers = JSON.parse(localStorage.getItem("ListUsers"));
          getUsers.map((el) => {
            if (el.email === email && el.password === password) {
              let firstname = el.first_name;
              let lastname = el.last_name;
              setEmail("");
              setPassword("");

              dispatch(
                login({
                  email: email,
                  password: password,
                  loggedIn: true,
                  firstname: firstname,
                  lastname: lastname,
                })
              );
              setVisible(true);
              setAlertSeverity("success");
              setAlertText("Logged in successfully");
              setTimeout(() => {
                setOpen(false);
                navigate("/store");
              }, 2000);
            } else {
              setVisible(true);
              setAlertSeverity("error");
              setAlertText("Incorrect email and password");
            }
          });
        }
      }
    }
  }, [error]);

  const handleSubmit = () => {
    const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i;

    if (!email) {
      errors.email = "Email is required!";
      setFlag(false);
    } else if (!regex.test(email)) {
      errors.email = "This is not a valid email!";
      setFlag(false);
    } else {
      setFlag(true);
    }

    if (!password) {
      errors.password = "Password is required!";
      setFlag(false);
    } else {
      setFlag(true);
    }

    setError(errors);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Grid container item xs={12}>
        <Grid item xs={12}>
          {loginData.user && loginData.user.loggedIn ? (
            <div className="header__greeting__message">
              <h3 className="text-l ml-3 tracking-wide text-white-900">
                Hello,
                <b>{loginData.user.firstname}</b>
              </h3>
              <IconButton
                className="icon__button"
                color="primary"
                style={{ margin: "0 15px" }}
                aria-label="Home"
                component="label"
                onClick={handleLogout}
              >
                <LogoutIcon style={{ fontSize: "20px", color: "#ffffff" }} />
              </IconButton>
            </div>
          ) : (
            (<Button color="inherit" onClick={handleClickOpen}>
              Sign In
            </Button>)(<Signup />)
          )}
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <Collapse style={{ width: "100%" }} in={visible}>
          <Alert
            style={{ width: "100%" }}
            variant="filled"
            severity={alertSeverity}
          >
            {alertText}
          </Alert>
        </Collapse>
        <DialogTitle>Sign In</DialogTitle>
        <DialogContent style={{ width: "500px" }}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={email}
            label="Email ID"
            type="email"
            fullWidth
            variant="outlined"
            onChange={(event) => setEmail(event.target.value)}
          />
          <p className="validation__message">{error.email}</p>
          <TextField
            autoFocus
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(e) => handleSubmit(e)}>Login</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Login;
