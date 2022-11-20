import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { login, logout } from "../features/userSlice";
import Signup from "./Signup";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link as RouterLink } from "react-router-dom";
import "./css/Login.css";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -11,
    top: 0,
    border: `none`,
    padding: "0 6px",
    background: "#47b246",
    fontWeight: "400",
    fontSize: "12px",
  },
}));

const Login = () => {
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [visible, setVisible] = useState(false);
  const [flag, setFlag] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertText, setAlertText] = useState("");

  const dialog_style = {
    width: "500px",
    "@media (max-width: 768px)": {
      width: "100%",
    },
  };

  const handleClickOpen = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const userList = JSON.parse(localStorage.getItem("ListUsers"));

  var loginData = useSelector((state) => {
    return state.user;
  });

  var cartData = useSelector((state) => {
    return state.cart.cart.length;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  var errors = {};

  const handleLogout = () => {
    dispatch(logout());
    setOpenConfirm(false);
  };

  useEffect(() => {
    if (flag === true) {
      if (userList && userList.length) {
        const getUsers = JSON.parse(localStorage.getItem("ListUsers"));

        getUsers.find((el) => {
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
              setVisible(false);
            }, 2000);
            return true;
          } else {
            setVisible(true);
            setAlertSeverity("error");
            setAlertText("Incorrect email and password");
            setTimeout(() => {
              setVisible(false);
            }, 4000);
          }
        });
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
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "flex-start",
          }}
        >
          <IconButton
            style={{ marginRight: "30px" }}
            component={RouterLink}
            to="/cart"
            aria-label="cart"
          >
            <StyledBadge
              badgeContent={cartData ? cartData : 0}
              color="secondary"
            >
              <ShoppingCartIcon style={{ color: "#ffffff" }} />
            </StyledBadge>
          </IconButton>
          {loginData.user && loginData.user.loggedIn ? (
            <>
              <div className="header__greeting__message">
                <h3 className="text-l ml-3 tracking-wide text-white-900">
                  Hello,{"  "}
                  <b>{loginData.user.firstname}</b>
                </h3>
                <IconButton
                  className="icon__button"
                  color="primary"
                  style={{ margin: "0 15px" }}
                  aria-label="Home"
                  component="label"
                  onClick={handleClickOpen}
                >
                  <LogoutIcon style={{ fontSize: "20px", color: "#ffffff" }} />
                </IconButton>
              </div>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                onClick={() => {
                  setOpen(true);
                }}
              >
                Sign In
              </Button>
              <Signup />
            </>
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
        <DialogTitle>Login to your Account</DialogTitle>
        <DialogContent sx={dialog_style}>
          <TextField
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
          <Button onClick={(e) => handleSubmit(e)}>Sign In</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openConfirm}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmation !!!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to logout ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>No</Button>
          <Button onClick={handleLogout} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Login;
