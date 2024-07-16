import asyncHandler from "../middleware/asyncHandler"
import Product from "../models/productModel"

/*
 @@ desc fetch all products
 @@ Route GET /api/products
 @@ Access public 
 */
const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? { name: { $regex: req.query.search, $options: "i" } }
    : {}
  const pageSize = 8
  const page = Number(req.query.pageNumber) || 1
  const count = await Product.countDocuments({ ...keyword })
  const pages = Math.ceil(count / pageSize)
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.json({ products, page, pages })
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
    product.price = price
    product.countInStock = countInStock
    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await Product.deleteOne({ _id: product._id })
    res.json({ message: "Product removed" })
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})
// @desc    create a product review
// @route   DELETE /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { comment, rating } = req.body
  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) =>
        review.user.toString() === (req.user!._id as string).toString()
    )
    if (alreadyReviewed) {
      res.status(400)
      throw new Error("product already reviewed")
    }

    const review = {
      user: req.user?._id,
      name: req.user!.name,
      comment,
      rating: Number(rating),
    }
    product.reviews.push(review)

    product.numReviews = product.reviews.length
    product.rating =
      product.reviews.reduce((acc, review) => review.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: "Review added" })
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

export {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
}
