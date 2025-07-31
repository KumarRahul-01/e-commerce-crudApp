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
import React from "react";
import { useForm } from "react-hook-form";
import { useProductCreateQuery } from "../../hooks/product-query";

const CreateProduct = () => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { mutate } = useProductCreateQuery();

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("brand", data.brand);
    formData.append("description", data.description);

    
    data.colors?.forEach((color) => formData.append("colors[]", color));
    data.sizes?.forEach((size) => formData.append("sizes[]", size));

    if (data.image[0]) {
      formData.append("image", data.image[0]);
    }

    console.log("Form data prepared:", formData);
    mutate(formData);
  };

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
          Create Product
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
            {...register("price", { required: "Price is required" })}
          />
          <p>{errors.price?.message}</p>

          <Box sx={{ width: "95%", mx: 3 }}>
            <Typography variant="h6" sx={{ textAlign: "left" }}>
              Color
            </Typography>
            <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
              {["white", "black", "brown", "purple"].map((color) => (
                <FormControlLabel
                  key={color}
                  control={<Checkbox {...register("colors")} value={color} />}
                  label={color.charAt(0).toUpperCase() + color.slice(1)}
                />
              ))}
            </FormGroup>
          </Box>

          <Box sx={{ width: "95%", mx: 3 }}>
            <Typography variant="h6" sx={{ textAlign: "left" }}>
              Size
            </Typography>
            <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
              {["s", "l", "xl", "xxl"].map((size) => (
                <FormControlLabel
                  key={size}
                  control={<Checkbox {...register("sizes")} value={size} />}
                  label={size.toUpperCase()}
                />
              ))}
            </FormGroup>
          </Box>

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
            {...register("image", { required: "Image is required" })}
          />
          <p>{errors.image?.message}</p>

          <Button type="submit" variant="outlined">
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateProduct;
