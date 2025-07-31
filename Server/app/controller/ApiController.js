const Product = require("../model/product");
const fs = require('fs')
class ApiController {
  //create Product
  async createProduct(req, res) {
    console.log(req.body);

    try {
        let { name, price, brand, description, colors, sizes } = req.body;

       
        if (!Array.isArray(colors)) {
            colors = colors ? [colors] : [];
        }
        if (!Array.isArray(sizes)) {
            sizes = sizes ? [sizes] : [];
        }

        const data = new Product({
            name,
            price,
            brand,
            description,
            color: colors, 
            size: sizes,   
        });

        if (req.file) {
            data.image = req.file.path.replace("\\", "/");
        }

        const pData = await data.save();
        console.log(pData);

        if (pData) {
            return res.status(201).json({
                status: true,
                message: "Product created successfully",
                data: pData,
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message,
        });
    }
}

  //get Product
  async getProduct(req, res) {
    try {
      const getProduct = await Product.find();
      if (getProduct) {
        return res.status(200).json({
          status: true,
          message: "Product fetched successfully",
          total: getProduct.length,
          data: getProduct,
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  }
  //edit Product
  async editProduct(req, res) {
    try {
      const id = req.params.id;
      const editProduct = await Product.findById(id);
      if (editProduct) {
        return res.status(201).json({
          status: true,
          message: "Single Product fetched Successfully",
          data: editProduct,
        });
      } else {
        return res.status(400).json({
          status: false,
          message: "Inside else",
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  }
  //delete Product
 

  async deleteProduct(req, res) {
      try {
          const id = req.params.id;
          const product = await Product.findById(id);
          if (!product) {
              return res.status(404).json({
                  status: false,
                  message: "Product not found.",
              });
          }
  
         
          if (product.image) {
              const imagePath = product.image;
              fs.unlinkSync(imagePath);
          }
  
          await Product.findByIdAndDelete(id);
  
          return res.status(200).json({
              status: true,
              message: "Product and its image deleted successfully",
          });
  
      } catch (error) {
          return res.status(400).json({
              status: false,
              message: error.message,
          });
      }
  }
  
  //update Product
   async updateProduct(req, res) {
      try {
          const id = req.params.id;
          let { name, price, brand, description, colors, sizes } = req.body;
  
          const existingProduct = await Product.findById(id);         
          const updateData = { 
              name, 
              price, 
              brand, 
              description, 
              color: Array.isArray(colors) ? colors : (colors ? [colors] : []), 
              size: Array.isArray(sizes) ? sizes : (sizes ? [sizes] : []) 
          };
  
          if (req.file) {
              if (existingProduct.image) {
                  fs.unlinkSync(existingProduct.image); // 
              }
              updateData.image = req.file.path.replace("\\", "/"); 
          }
          const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
  
          return res.status(200).json({
              status: true,
              message: "Product updated successfully.",
              data: updatedProduct,
          });
  
      } catch (error) {
          return res.status(400).json({
              status: false,
              message: error.message,
          });
      }
  }
  

// srearch product
  async search(req, res) {
    try {
      let query = {};
      if (req.body.search) {
        const search = req.body.search;
        query = {
          $or: [{ name: { $regex: search, $options: "i" } }],
        };
      }
      const pro = await Product.find(query);
      return res.status(200).json({
        status: true,
        message: "product search",
        data: pro,
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  }

  //filter by price
  async filterByPrice(req, res) {
    try {
      let query = {};

      if (req.body.priceRange) {
        const { minPrice, maxPrice } = req.body.priceRange;
        query = {
          price: { $gte: minPrice, $lte: maxPrice },
        };
      }

      const products = await Product.find(query);

      return res.status(200).json({
        status: true,
        message: "Products filtered by price fetched successfully.",
        data: products,
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  }
  // filter by size
  async filterbySize(req, res) {
    try {
      const sizeParam = req.query.size;

      const sizes = sizeParam
        .split(",")
        .map((size) => size.trim())
        .filter((size) => size);
        console.log(sizes);
        
      const query = {
        size: { $in: sizes },
      };

      const filteredProducts = await Product.find({
        ...query,
      });

      return res.status(200).json({
        message: "Data fetched successfully",
        totalCount: filteredProducts.length,
        data: filteredProducts,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  // filter by brand
  async filterbyBrand(req, res) {
    try {
      const brandParam = req.query.brand;

      const brands = brandParam
        .split(",")
        .map((brand) => brand.trim())
        .filter((brand) => brand);
        console.log(brands);
        
      const query = {
        brand: { $in: brands },
      };

      const filteredProducts = await Product.find({
        ...query,
      });

      return res.status(200).json({
        message: "Data fetched successfully",
        totalCount: filteredProducts.length,
        data: filteredProducts,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  // filter by color
  async filterbyColors(req, res) {
    try {
      const colorParam = req.query.color;

      const colors = colorParam
        .split(",")
        .map((color) => color.trim())
        .filter((color) => color);
        console.log(colors);
        
      const query = {
        color: { $in: colors },
      };

      const filteredProducts = await Product.find({
        ...query,
      });

      return res.status(200).json({
        message: "Data fetched successfully",
        totalCount: filteredProducts.length,
        data: filteredProducts,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}

module.exports = new ApiController();
