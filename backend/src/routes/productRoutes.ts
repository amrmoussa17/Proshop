import { Router } from "express"
import {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController"
import { protect, admin } from "../middleware/auth"

const router = Router()

router.route("/").get(getProducts).post(protect, admin, createProduct)
router
  .route("/:id")
  .get(getProduct)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct)

export default router
