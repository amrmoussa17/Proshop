import users from "./users"
import products from "./products"
import User from "../models/userModel"
import Product from "../models/productModel"
import Order from "../models/orderModel"
import connectDb from "../config/db"

connectDb()

const importData = async () => {
  try {
    await User.deleteMany()
    await Product.deleteMany()
    await Order.deleteMany()

    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers[0]._id

    const sampleProducts = products.map((p) => ({ ...p, user: adminUser }))
    await Product.insertMany(sampleProducts)
    console.log("data imported")
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await User.deleteMany()
    await Product.deleteMany()
    await Order.deleteMany()
    console.log("data destroyed")
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === "-d") {
  destroyData()
} else {
  importData()
}
