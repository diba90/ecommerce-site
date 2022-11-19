import React, { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "./css/Product.css";
import Button from "@mui/material/Button";
import { addToCart, removeFromCart } from "../features/cartSlice";
import {
  listProducts,
  visibilityShow,
  visibilityHidden,
} from "../features/productSlice";
import { useDispatch, useSelector } from "react-redux";

const Products = () => {
  const [products, setProducts] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [view, setView] = useState(true);
  const [show, setShow] = useState("none");

  const added = {
    width: "100%",
    background: "#5c8825",
    cursor: "not-allowed",
    color: "#dddddd",
  };

  const notadded = {
    width: "100%",
    background: "#1976d2",
    cursor: "pointer",
    color: "#ffffff",
  };

  const dispatch = useDispatch();

  var loginData = useSelector((state) => {
    return state.user;
  });

  var cartData = useSelector((state) => {
    return state.user;
  });

  var productData = useSelector((state) => {
    return state.product.products;
  });

  useEffect(() => {
    if (loginData.user === null) {
      setView(true);
    } else {
      setView(false);
    }
  }, [loginData.user]);

  const handleCart = (obj) => {
    dispatch(
      addToCart({
        id: obj.id,
        title: obj.title,
        price: obj.price,
        imgUrl: obj.pic,
        quantity: obj.quantity,
      })
    );
  };

  const handleShow = (obj) => {
    dispatch(
      visibilityShow({
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

  const handleRemoveItem = (obj) => {
    dispatch(
      removeFromCart({
        id: obj.id,
      })
    );
  };

  useEffect(() => {
    if (productData.length === 0) {
      setSpinner(true);
      axios.get("https://fakestoreapi.com/products").then((res) => {
        const updatedProducts = res.data.map((item) => ({
          ...item,
          selected: false,
        }));
        setProducts(updatedProducts);
        dispatch(
          listProducts({
            items: updatedProducts,
          })
        );
        setSpinner(false);
      });
    }
  }, []);

  return (
    <React.Fragment>
      <Grid item>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {spinner ? (
              <Box
                sx={{ display: "block", textAlign: "center", padding: "5%" }}
              >
                <CircularProgress />
              </Box>
            ) : (
              productData.items?.map((product) => (
                <div key={product?.id} className="product__content">
                  <div className="product__image">
                    <img src={product?.image} alt={product?.title} />
                  </div>
                  <div className="product__description">
                    <h3>{product?.title}</h3>
                  </div>
                  <div className="other__info">
                    <h2>${product?.price}</h2>
                    <p>{product?.rating.rate}</p>
                  </div>
                  <div className="add__to__cart">
                    <Button
                      style={product?.selected ? added : notadded}
                      id={product?.id}
                      className="cart__button"
                      disabled={product?.selected ? true : false}
                      onClick={() => {
                        handleCart({
                          id: product?.id,
                          title: product?.title,
                          price: product?.price,
                          pic: product?.image,
                          quantity: 1,
                        });
                        handleShow({
                          id: product?.id,
                        });
                      }}
                      variant="contained"
                    >
                      {product?.selected ? "Added" : "Add to Cart"}
                    </Button>

                    <Button
                      style={{
                        width: "100%",
                        color: "#767271",
                        textTransform: "capitalize",
                        fontSize: "12px",
                        display: product?.selected ? "block" : "none",
                      }}
                      id={"btn" + product?.id}
                      onClick={() => {
                        handleRemoveItem({
                          id: product?.id,
                        });
                        handleHide({
                          id: product?.id,
                        });
                      }}
                      variant="text"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))
            )}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Products;
