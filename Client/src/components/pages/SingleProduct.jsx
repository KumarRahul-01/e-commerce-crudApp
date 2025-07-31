import React from "react";
import { useParams } from "react-router";
import { useFetchSingleProduct } from "../../hooks/product-query";
import { Card, CardContent, CardMedia, Typography, CircularProgress, Container, Box, Chip } from "@mui/material";

const SingleProduct = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useFetchSingleProduct(id);

  if (isLoading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (isError || !data) {
    return (
      <Container sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6" color="error">
          Error fetching product details.
        </Typography>
      </Container>
    );
  }

  const product = data?.data;
  console.log(product);

 

  return (
    <Container sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
      <Card sx={{ display: "flex", maxWidth: "1200px", boxShadow: 3 }}>
        <CardMedia
          component="img"
          sx={{ width: 600, objectFit: "cover" }}
          image={`http://localhost:3008/${product.image}`} 
          alt={product.name}
        />

       
        <CardContent sx={{ flex: "1 0 auto" ,width:400,textAlign:"center"}}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {product.name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Brand: {product.brand}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Description:{product.description}
          </Typography>
          <Typography variant="h6" sx={{ color: "green", fontWeight: "bold", mt: 2 }}>
           Price: ₹{product.price}
          </Typography>

         
     
        </CardContent>
      </Card>
    </Container>
  );
};

export default SingleProduct;
