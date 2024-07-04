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

/*
 @@ desc create a single product
 @@ Route POST /api/products/
 @@ Access private/admin
 */
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    user: req.user!._id,
    name: "sample name",
    category: "sample category",
    brand: "sample brand",
    description: "sample description",
    image: "/images/sample.jpg",
  })
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

export { getProducts, getProduct, createProduct }
