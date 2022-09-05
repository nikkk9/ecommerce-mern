import express from "express";
import {
  createAndUpdateReview,
  createProduct,
  deleteProduct,
  deleteReview,
  getAllProducts,
  getAllReviews,
  getProduct,
  updateProduct,
} from "../controllers/product-ctrl.js";
import { authRole, authToken } from "../middlewares/auth.js";
const router = express.Router();

router.post("/create-product", authToken, authRole("admin"), createProduct);

router.get("/products", getAllProducts);

router.get("/product/:id", getProduct);

router.put("/review", authToken, createAndUpdateReview);

router.put("/product/:id", authToken, authRole("admin"), updateProduct);

router.delete("/product/:id", authToken, authRole("admin"), deleteProduct);

router.get("/reviews", getAllReviews);

router.delete("/review", authToken, deleteReview);

export default router;
