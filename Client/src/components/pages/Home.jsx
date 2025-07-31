import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  useFetchQuery,
  useProductDeleteQuery,
} from "../../hooks/product-query";
import searchProduct from "../../api/functions/searchProduct";
import filterByBrand from "../../api/functions/filterByBrand";
import filterByColor from "../../api/functions/filterByColor";
import filterBySize from "../../api/functions/filterBySize";
import filterByPrice from "../../api/functions/filterByPrice";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  Slider,
  Box,
} from "@mui/material";

const Home = () => {
  const { mutate } = useProductDeleteQuery();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([1000, 20000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { data, error: fetchError } = useFetchQuery();

  // Handle Change Functions
  const handleSearchChange = (event) => setSearchQuery(event.target.value);
  const handlePriceChange = (event, newValue) => setPriceRange(newValue);
  const handleBrandChange = (event) => {
    const value = event.target.value;
    setSelectedBrands((prev) =>
      prev.includes(value) ? prev.filter((b) => b !== value) : [...prev, value]
    );
  };
  const handleColorChange = (event) => {
    const value = event.target.value;
    setSelectedColors((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  };
  const handleSizeChange = (event) => {
    const value = event.target.value;
    setSelectedSizes((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  };

  // Fetch Products on Search
  useEffect(() => {
    if (searchQuery) {
      setIsLoading(true);
      searchProduct(searchQuery)
        .then((res) => setProducts(res.data))
        .catch(() => setError("Error fetching search results"))
        .finally(() => setIsLoading(false));
    } else {
      setProducts(data?.data || []);
    }
  }, [searchQuery, data]);

  // Fetch Products on Price Change
  useEffect(() => {
    setIsLoading(true);
    filterByPrice(priceRange[0], priceRange[1])
      .then((res) => setProducts(res.data))
      .catch(() => setError("Error fetching filtered products"))
      .finally(() => setIsLoading(false));
  }, [priceRange, data]);

  // Fetch Products on Brand Change
  useEffect(() => {
    if (selectedBrands.length > 0) {
      setIsLoading(true);
      filterByBrand(selectedBrands)
        .then((res) => setProducts(res.data))
        .catch(() => setError("Error fetching filtered products"))
        .finally(() => setIsLoading(false));
    } else {
      setProducts(data?.data || []);
    }
  }, [selectedBrands, data]);

  // Fetch Products on Color Change
  useEffect(() => {
    if (selectedColors.length > 0) {
      setIsLoading(true);
      filterByColor(selectedColors)
        .then((res) => setProducts(res.data))
        .catch(() => setError("Error fetching filtered products"))
        .finally(() => setIsLoading(false));
    } else {
      setProducts(data?.data || []);
    }
  }, [selectedColors, data]);

  // Fetch Products on Size Change
  useEffect(() => {
    if (selectedSizes.length > 0) {
      setIsLoading(true);
      filterBySize(selectedSizes)
        .then((res) => setProducts(res.data))
        .catch(() => setError("Error fetching filtered products"))
        .finally(() => setIsLoading(false));
    } else {
      setProducts(data?.data || []);
    }
  }, [selectedSizes, data]);

  // Edit Product
  const handleEdit = (id) => {
    navigate(`/update/${id}`);
  };

  // Delete Product
  const handleDelete = (id) => {
    mutate({ id });
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {/* Sidebar */}
      <Box
        sx={{ width: "300px", padding: "20px", borderRight: "1px solid #ddd" }}
      >
        {/* Search */}
        <Typography variant="h6">Search</Typography>
        <TextField
          label="Search Products"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ mb: 2 }}
        />

        {/* Price */}
        <Box sx={{ borderBottom: "2px solid #edf2fa", p: 1 }}>
          <Typography variant="h6">Filter by Price</Typography>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={1000}
            max={20000}
            sx={{ mb: 2 }}
          />
        </Box>

        {/* Brand */}
        <Box sx={{ borderBottom: "2px solid #edf2fa", p: 1 }}>
          <Typography variant="h6">Filter by Brand</Typography>
          {["adidas", "nike", "puma", "levis"].map((brand) => (
            <FormControlLabel
              key={brand}
              control={
                <Checkbox
                  checked={selectedBrands.includes(brand)}
                  onChange={handleBrandChange}
                  value={brand}
                />
              }
              label={brand.charAt(0).toUpperCase() + brand.slice(1)}
            />
          ))}
        </Box>

        {/* Color */}
        <Box sx={{ borderBottom: "2px solid #edf2fa", p: 1 }}>
          <Typography variant="h6">Filter by Color</Typography>
          {["black", "white", "brown", "purple"].map((color) => (
            <FormControlLabel
              key={color}
              control={
                <Checkbox
                  checked={selectedColors.includes(color)}
                  onChange={handleColorChange}
                  value={color}
                />
              }
              label={color.charAt(0).toUpperCase() + color.slice(1)}
            />
          ))}
        </Box>

        {/* Size */}
        <Box sx={{ borderBottom: "2px solid #edf2fa", p: 1 }}>
          <Typography variant="h6">Filter by Size</Typography>
          {["s", "m", "l", "xl"].map((size) => (
            <FormControlLabel
              key={size}
              control={
                <Checkbox
                  checked={selectedSizes.includes(size)}
                  onChange={handleSizeChange}
                  value={size}
                />
              }
              label={size.toUpperCase()}
            />
          ))}
        </Box>
      </Box>

      {/* Product Grid */}
      <Grid container spacing={2} sx={{ padding: 2, flexGrow: 1 }}>
        {products.map((product) => (
          <Grid item xs={12} sm={4} md={3} key={product._id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={`http://localhost:3008/${product.image}`}
                title={product.name}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography>Price: ₹{product.price}</Typography>
                <Typography>Brand: {product.brand.join(", ")}</Typography>
                <Typography>Color: {product.color.join(", ")}</Typography>
                <Typography>Size: {product.size.join(", ")}</Typography>
                <Typography>Description: {product.description}</Typography>
                <Button
                  variant="contained"
                  onClick={() => handleEdit(product._id)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  sx={{ m: 1 }}
                  onClick={() => handleDelete(product._id)}
                  color="error"
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
