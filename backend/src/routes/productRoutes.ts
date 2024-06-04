import asyncHandler from "../middleware/asyncHandler"
import { Router } from "express"
import Product from "../models/productModel"

const router = Router()

router.get(
  "/",
  asyncHandler(async (_req, res) => {
    const products = await Product.find({})
    res.json(products)
  })
)
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
      res.status(404)
      throw new Error("Resource Not Found")
    }
    res.json(product)
  })
)

export default router
