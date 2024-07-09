import { Router } from "express"
import {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/productController"
import { protect, admin } from "../middleware/auth"

const router = Router()

router.route("/").get(getProducts).post(protect, admin, createProduct)
router.route("/:id").get(getProduct).put(protect, admin, updateProduct)

export default router
