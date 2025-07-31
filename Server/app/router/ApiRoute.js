const express = require("express");
const router = express.Router();
const ApiController = require("../controller/ApiController");
const ProductImage = require("../helper/productImage");

router.post("/create/product",ProductImage.single('image'), ApiController.createProduct);
router.get("/products", ApiController.getProduct);
router.get("/edit/:id", ApiController.editProduct);
router.delete("/delete/:id", ApiController.deleteProduct);
router.post("/update/product/:id",ProductImage.single('image'), ApiController.updateProduct);

router.post("/search", ApiController.search);
router.post("/filterByPrice",ApiController.filterByPrice)
router.get('/product/filter/size', ApiController.filterbySize);
router.get('/product/filter/brand', ApiController.filterbyBrand);
router.get('/product/filter/color', ApiController.filterbyColors);

module.exports = router;
