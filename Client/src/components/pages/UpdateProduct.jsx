import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  useFetchSingleProduct,
  useProductUpdateQuery,
} from "../../hooks/product-query";

const UpdateProduct = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useFetchSingleProduct(id);
  const { mutate } = useProductUpdateQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // State to track selected colors and sizes
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  useEffect(() => {
    if (data) {
      setValue("name", data?.data?.name || "");
      setValue("price", data?.data?.price || "");
      setValue("description", data?.data?.description || "");
      setValue("brand", data?.data?.brand || "");

      setSelectedColors(data?.data?.colors || []); // Set initial colors
      setSelectedSizes(data?.data?.sizes || []); // Set initial sizes
    }
  }, [data, setValue]);

  // Handle checkbox changes
  const handleCheckboxChange = (value, type) => {
    if (type === "colors") {
      setSelectedColors((prev) =>
        prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
      );
    } else if (type === "sizes") {
      setSelectedSizes((prev) =>
        prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
      );
    }
  };

  const onSubmit = (formData) => {
    const fd = new FormData();

    fd.append("name", formData.name);
    fd.append("price", formData.price);
    fd.append("brand", formData.brand);
    fd.append("description", formData.description);

    selectedColors.forEach((color) => fd.append("colors", color));
    selectedSizes.forEach((size) => fd.append("sizes", size));

    if (formData.image?.length) {
      fd.append("image", formData.image[0]);
    }

    console.log("FormData Sent:", Object.fromEntries(fd));
    mutate({ id, newdata: fd });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading product data</div>;

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          textAlign: "center",
          boxShadow: "0px 0px 0px 1px rgba(0,0,0,0.3)",
          p: 3,
          borderRadius: "5px",
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Update Product
        </Typography>
        <Box sx={{ width: "100%" }}>
          <TextField
            sx={{ width: "95%" }}
            id="name"
            label="Name"
            variant="outlined"
            {...register("name", { required: "Name is required" })}
          />
          <p>{errors.name?.message}</p>

          <TextField
            sx={{ width: "95%" }}
            id="price"
            label="Price"
            variant="outlined"
            type="number"
            {...register("price", { required: "Price is required", valueAsNumber: true })}
          />
          <p>{errors.price?.message}</p>

          {/* Color Checkboxes */}
          <Box sx={{ width: "95%", mx: 3 }}>
            <Typography variant="h6" sx={{ textAlign: "left" }}>
              Color
            </Typography>
            <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
              {["white", "black", "brown", "purple"].map((color) => (
                <FormControlLabel
                  key={color}
                  control={
                    <Checkbox
                      checked={selectedColors.includes(color)}
                      onChange={() => handleCheckboxChange(color, "colors")}
                    />
                  }
                  label={color.charAt(0).toUpperCase() + color.slice(1)}
                />
              ))}
            </FormGroup>
          </Box>

          {/* Size Checkboxes */}
          <Box sx={{ width: "95%", mx: 3 }}>
            <Typography variant="h6" sx={{ textAlign: "left" }}>
              Size
            </Typography>
            <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
              {["s", "l", "xl", "xxl"].map((size) => (
                <FormControlLabel
                  key={size}
                  control={
                    <Checkbox
                      checked={selectedSizes.includes(size)}
                      onChange={() => handleCheckboxChange(size, "sizes")}
                    />
                  }
                  label={size.toUpperCase()}
                />
              ))}
            </FormGroup>
          </Box>

          {/* Brand Selection */}
          <FormControl sx={{ marginBottom: 2, width: "95%" }}>
            <InputLabel id="brand-label">Brand</InputLabel>
            <Select
              labelId="brand-label"
              label="Brand"
              {...register("brand")}
              defaultValue=""
            >
              <MenuItem value="nike">Nike</MenuItem>
              <MenuItem value="adidas">Adidas</MenuItem>
              <MenuItem value="levis">Levis</MenuItem>
              <MenuItem value="puma">Puma</MenuItem>
            </Select>
          </FormControl>

          <TextField
            sx={{ width: "95%" }}
            rows={5}
            multiline
            id="description"
            label="Description"
            variant="outlined"
            {...register("description", { required: "Description is required" })}
          />
          <p>{errors.description?.message}</p>

          <TextField
            sx={{ width: "95%" }}
            id="file"
            type="file"
            variant="outlined"
            {...register("image")}
          />
          <p>{errors.image?.message}</p>

          <Button type="submit" variant="outlined">
            Update
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UpdateProduct;
