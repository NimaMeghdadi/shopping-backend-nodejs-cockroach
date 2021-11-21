const express = require("express");
const router = express.Router();
const {
  getProducts,
  createProduct,
  deleteProduct,
  getSingleProduct,
  updateProduct,
  getUserProgressingProducts,
  
} = require("../controllers/Products.controller");

router.get("/", getProducts).post("/", createProduct).put("/", updateProduct);
router.get("/:id", getSingleProduct).delete("/:id", deleteProduct);
router.get("/userProgressingProducts/:username", getUserProgressingProducts);
module.exports = router;