const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [false, "Please enter product name"],
    trim: true,
    maxLength: [100, "Product name cannot exceed 100 characters"],
  },
 
  postImage : {
    data: String,
  },
});

module.exports = mongoose.model("Product", productSchema);

