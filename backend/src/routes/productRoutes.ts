import { Router } from "express"
import {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productController"
import { protect, admin } from "../middleware/auth"

const router = Router()

router.route("/").get(getProducts).post(protect, admin, createProduct)
router.route("/top").get(getTopProducts)
router
  .route("/:id")
  .get(getProduct)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct)
router.route("/:id/reviews").post(protect, createProductReview)

export default router
