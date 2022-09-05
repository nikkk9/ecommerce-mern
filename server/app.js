import express from "express";
import "dotenv/config";

// app config
const app = express();
const port = process.env.PORT || 5000;

// database connection
import connectDB from "./config/db.js";
connectDB();

import cors from "cors";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user-route.js";
import productRoute from "./routes/product-route.js";
import orderRoute from "./routes/order-route.js";
import stripeRoute from "./routes/stripe-route.js";

// middlewares
app.use(cors());
app.use(express.json()); //it takes json file for testing api routes
app.use(cookieParser());

app.use(userRoute);
app.use(productRoute);
app.use(orderRoute);
app.use(stripeRoute);

// listen
app.listen(port, (req, res) => {
  console.log(`server is running at ${port}`);
});
