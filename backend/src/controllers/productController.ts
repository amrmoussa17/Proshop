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

/*
 @@ desc update product
 @@ Route PUT /api/products/:id/
 @@ Access private/admin
 */
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, category, brand, description, image, countInStock } =
    req.body
  const product = await Product.findById(req.params.id)
  if (product) {
    product.name = name
    product.category = category
    product.brand = brand
    product.image = image
    product.countInStock = countInStock
    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

export { getProducts, getProduct, createProduct, updateProduct }
