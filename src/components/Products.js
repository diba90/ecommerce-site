import React, { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "./Product.css";
import Button from "@mui/material/Button";

const Products = () => {
  const [products, setProducts] = useState(null);
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    setSpinner(true);
    axios.get("https://dummyjson.com/products").then((res) => {
      console.log(res.data.products);
      setProducts(res.data.products);
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
                <div className="product__content">
                  <div className="product__image">
                    <img src={product?.thumbnail} alt={product?.title} />
                  </div>
                  <div className="product__description">
                    <h3>{product?.title}</h3>
                    <p>${product?.price}</p>
                  </div>
                  <div className="other__info">
                    <h2>{product?.rating}</h2>
                    <p>{product?.stock}</p>
                  </div>
                  <div className="add__to__cart">
                    <Button style={{ width: "100%" }} variant="contained">
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
