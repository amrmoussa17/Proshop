import asyncHandler from "../middleware/asyncHandler"
import Order from "../models/orderModel"

interface OrderItemType {
  _id: string
  name: string
  qty: number
  image: string
  price: number
}

/*
 @@ desc create order
 @@ Route POST /api/orders
 @@ Access private 
 */
export const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error("No order Items")
  } else {
    const order = new Order({
      user: req.user!._id,
      orderItems: orderItems.map((item: OrderItemType) => ({
        ...item,
        product: item._id,
      })),
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })
    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})

/*
 @@ desc get logged in user orders
 @@ Route GET /api/orders/mine
 @@ Access private 
 */
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user!._id })
  res.json(orders)
})

/*
 @@ desc get all orders
 @@ Route GET /api/orders
 @@ Access Admin
 */
export const getAllOrders = asyncHandler(async (req, res) => {
  res.send("get all orders")
})

/*
@desc    Get order by ID
@route   GET /api/orders/:id
@access  Private
*/
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  )
  if (!order) {
    res.status(404)
    throw new Error("order not found")
  } else {
    res.status(200).json(order)
  }
})

/*
 @@ desc update order to paid
 @@ Route Put /api/orders/:id/pay
 @@ Access Private
 */
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isPaid = true
    order.paidAt = new Date().toLocaleString()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }
    const updatedOrder = await order.save()
    res.status(200).json(updatedOrder)
  } else {
    res.status(404)
    throw new Error("Order Not Found")
  }
})
/*
 @@ desc update order to delivered
 @@ Route Put /api/orders/:id/deliver
 @@ Access Admin
 */
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("update order to delivered")
})
