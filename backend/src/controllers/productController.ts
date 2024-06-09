import asyncHandler from "../middleware/asyncHandler"
import Product from "../models/productModel"

/*
 @@ desc fetch all products
 @@ Route GET /api/products
 @@ Access public 
 */
const getProducts = asyncHandler(async (_req, res) => {
  const products = await Product.find({})
  res.json(products)
})

/*
 @@ desc fetch a single product
 @@ Route GET /api/products/:id
 @@ Access public 
 */
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    res.status(404)
    throw new Error("Resource Not Found")
  }
  res.json(product)
})

export { getProducts, getProduct }
