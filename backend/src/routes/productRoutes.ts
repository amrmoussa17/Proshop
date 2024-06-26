import { Router } from "express"
import { getProduct, getProducts } from "../controllers/productController"

const router = Router()

router.route("/").get(getProducts)
router.route("/:id").get(getProduct)

export default router
