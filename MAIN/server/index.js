import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/product.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/order.js";
import paymentRoutes from "./routes/payment.js";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import Brand from "./models/Brand.js";
import Cart from "./models/cart.js";
import Category from "./models/Category.js";
import Order from "./models/Order.js";
import Payment from "./models/Payment.js";
import Product from "./models/Product.js";
import User from "./models/User.js";
import contactRoutes from "./routes/contact.js"
import * as AdminJSMongoose from "@adminjs/mongoose";
import Contact from "./models/Contact.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
const DATABASE = process.env.DATABASE;

mongoose
  .connect(DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected!"))
  .catch((err) => console.log(`Error Occurred: ${err}`));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(
  cors({
    origin: [
      "http://localhost:4000",
      "http://localhost:3000",
      "http://192.168.1.5:3000",
      "http://localhost:3001",
      "http://127.0.0.1:5500"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Origin",
      "X-Requested-With",
      "Accept",
      "x-client-key",
      "x-client-token",
      "x-client-secret",
      "Authorization",
      "Set-Cookie",
    ],
    credentials: true,
  })
);
AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});
app.get("/", (req, res) => {
  res.send("Welcome to my marketplace app");
});
const start = async () => {
  const admin = new AdminJS({
    resources: [Brand, Cart, Category, Order, Payment, Product, User, Contact],
    rootPath: "/admin",
  });

  const adminRouter = AdminJSExpress.buildRouter(admin);

  app.use(admin.options.rootPath, adminRouter);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

start();


// SignIn/SignUp Routes
app.use("/auth", authRoutes);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);
app.use("/order", orderRoutes);
app.use("/payment", paymentRoutes);
app.use("/contact", contactRoutes);

