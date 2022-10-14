import React, { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "./Product.css";
import Button from "@mui/material/Button";
import { addToCart } from "../features/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const Products = () => {
  const [products, setProducts] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const [view, setView] = useState(true);

  const dispatch = useDispatch();

  var loginData = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    if (loginData.user === null) {
      setView(true);
    } else if (loginData.user.loggedIn === true) {
      setView(false);
    }
  }, []);

  const handleCart = (obj) => {
    document.getElementById(obj.id).innerHTML = "Added";
    document.getElementById(obj.id).disabled = true;
    document.getElementById(obj.id).style.background = "#5c8825";
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

  useEffect(() => {
    setSpinner(true);
    axios.get("https://fakestoreapi.com/products").then((res) => {
      setProducts(res.data);
      setSpinner(false);
    });
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
              products?.map((product) => (
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
                      style={{ width: "100%" }}
                      id={product?.id}
                      className="cart__button"
                      disabled={view}
                      onClick={() => {
                        handleCart({
                          id: product?.id,
                          title: product?.title,
                          price: product?.price,
                          pic: product?.image,
                          quantity: null,
                        });
                      }}
                      variant="contained"
                    >
                      Add to Cart
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
