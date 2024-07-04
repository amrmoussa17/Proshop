import { Router } from "express"
import {
  createProduct,
  getProduct,
  getProducts,
} from "../controllers/productController"
import { protect, admin } from "../middleware/auth"

const router = Router()

router.route("/").get(getProducts).post(protect, admin, createProduct)
router.route("/:id").get(getProduct)

export default router
