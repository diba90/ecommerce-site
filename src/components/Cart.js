import React from "react";
import "./css/Cart.css";
import Button from "@mui/material/Button";
import Header from "./Header";
import Grid from "@mui/material/Grid";
import ButtonGroup from "@mui/material/ButtonGroup";
import AddIcon from "@mui/icons-material/Add";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { useDispatch, useSelector } from "react-redux";
import { addQty, removeQty, removeFromCart } from "../features/cartSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { visibilityHidden } from "../features/productSlice";

const Cart = () => {
  const cart_style = {
    margin: "100px 20%",
    "@media (max-width: 768px)": {
      margin: "10px 15px",
      maxWidth: "93%",
    },
  };

  var cartData = useSelector((state) => {
    return state.cart.cart;
  });

  const dispatch = useDispatch();

  const handleAddQty = (obj) => {
    dispatch(
      addQty({
        id: obj.id,
      })
    );
  };

  const handleRemoveQty = (obj) => {
    dispatch(
      removeQty({
        id: obj.id,
      })
    );
  };

  const handleRemoveItem = (obj) => {
    dispatch(
      removeFromCart({
        id: obj.id,
      })
    );
  };

  const handleHide = (obj) => {
    dispatch(
      visibilityHidden({
        id: obj.id,
      })
    );
  };

  return (
    <React.Fragment>
      <Header />
      <Grid container item xs={12}>
        <Grid item xs={12} sx={cart_style}>
          {cartData.length !== 0 ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Sl.</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center">Item</TableCell>
                    <TableCell align="center">Price</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="center">Total</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {cartData.map((item, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        <img
                          style={{ height: "40px" }}
                          src={item.imgUrl}
                          alt=""
                        />
                      </TableCell>
                      <TableCell align="center">{item.title}</TableCell>
                      <TableCell align="center">{item.price}</TableCell>
                      <TableCell align="center">
                        {" "}
                        <ButtonGroup
                          variant="text"
                          aria-label="outlined button group"
                        >
                          <Button
                            id={"R" + item.id}
                            disabled={item.quantity === 1 ? true : false}
                            onClick={() => {
                              handleRemoveQty({
                                id: item.id,
                              });
                            }}
                          >
                            <HorizontalRuleIcon />
                          </Button>
                          <Button>{item.quantity}</Button>
                          <Button
                            id={"A" + item.id}
                            disabled={item.quantity === 10 ? true : false}
                            onClick={() => {
                              handleAddQty({
                                id: item.id,
                              });
                            }}
                          >
                            <AddIcon />
                          </Button>
                        </ButtonGroup>
                      </TableCell>

                      <TableCell align="center" style={{ width: "120px" }}>
                        {" "}
                        {"$ " + (item.price * item.quantity).toFixed(2)}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          style={{
                            width: "100%",
                            color: "#767271",
                            textTransform: "capitalize",
                            fontSize: "12px",
                            display: "block",
                          }}
                          variant="text"
                          onClick={() => {
                            handleRemoveItem({
                              id: item.id,
                            });
                            handleHide({
                              id: item.id,
                            });
                          }}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <>
              <ShoppingCartIcon
                style={{ fontSize: "60px", marginBottom: "20px" }}
              />
              <h2 className="text-3xl font-bold text-cyan-900">
                Your cart is empty.
              </h2>
            </>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Cart;
