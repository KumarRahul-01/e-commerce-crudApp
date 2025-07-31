const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "please enter your name"],
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price must  be a positive number"],
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: [String],
      required: [true, "Brand is required"],
    },
    color: {
      type: [String],
      required: [true, "Brand is required"],
    },
    size: {
      type: [String],
      required: [true, "Brand is required"],
    },
    
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [500, "Description should not exceed 500 characters"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ProductModel = mongoose.model("product", ProductSchema);
module.exports = ProductModel;
