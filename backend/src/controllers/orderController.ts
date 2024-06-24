import asyncHandler from "../middleware/asyncHandler"

/*
 @@ desc create order
 @@ Route POST /api/orders
 @@ Access private 
 */
export const createOrder = asyncHandler(async (req, res) => {
  res.send("create order")
})

/*
 @@ desc get logged in user orders
 @@ Route GET /api/orders/mine
 @@ Access private 
 */
export const getMyOrders = asyncHandler(async (req, res) => {
  res.send("get my orders")
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
  res.send("get order by id")
})

/*
 @@ desc update order to paid
 @@ Route Put /api/orders/:id/pay
 @@ Access Private
 */
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("update order to paid")
})
/*
 @@ desc update order to delivered
 @@ Route Put /api/orders/:id/deliver
 @@ Access Admin
 */
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("update order to delivered")
})
