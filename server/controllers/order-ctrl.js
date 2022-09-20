import Order from "../models/order-model.js";
import Product from "../models/product-model.js";

// CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const order = await Order.create({
      userId: req.user._id,
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
    });

    if (!order) {
      return res.status(400).send("order is not created");
    }
    res.status(200).send(order);
  } catch (err) {
    console.log(err);
  }
};

// GET YOUR ALL ORDERS
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    if (!orders) {
      return res.status(400).send("orders are not found!");
    }
    res.status(200).send(orders);
  } catch (error) {
    console.log(error);
  }
};

// GET SINGLE ORDER
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "userId",
      "name email"
    );
    if (!order) {
      return res.status(400).send("order is not found!");
    }
    res.status(200).send(order);
  } catch (error) {
    console.log(error);
  }
};

// GET ALL ORDERS (ADMIN)
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    if (!orders) {
      return res.status(400).send("orders are not found!");
    }

    let totalAmt = 0;
    orders.forEach((order) => {
      totalAmt += order.totalPrice;
    });
    res.status(200).send({ orders, totalAmt });
  } catch (error) {
    console.log(error);
  }
};

// UPDATE ORDER
async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock -= quantity;
  await product.save();
}

export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(400).send("order is not found!");
    }
    if (order.orderStatus === "Delivered") {
      return res.status(400).send("You have already delivered this order");
    }

    if (req.body.orderStatus === "Shipped") {
      order.orderItems.forEach(async (o) => {
        await updateStock(o.pId, o.quantity);
      });
    }
    order.orderStatus = req.body.orderStatus;

    if (req.body.orderStatus === "Delivered") {
      order.deliveredAt = Date.now();
    }
    await order.save();

    res.status(200).send(order);
  } catch (error) {
    console.log(error);
  }
};

// DELETE ORDER (ADMIN)
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(400).send("order is not found!");
    }
    res.status(200).send("order is deleted!");
  } catch (error) {
    console.log(error);
  }
};
