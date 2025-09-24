import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import contactRouter from "./routes/contact.routes.js";
import productRouter from "./routes/products.routes.js";
import purchaseRouter from "./routes/purchase.route.js";
import adminRouter from "./routes/admin.routes.js";
import agentRouter from "./routes/agent.routes.js";
import cartRouter from "./routes/cart.routes.js";
import reviewRouter from "./routes/review.routes.js";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./config/DB_CONNECTION.js";
import { verifyAuthentication } from "./middlewares/verifyAuthentication.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: ["http://localhost:4173", "http://localhost:5173"],
    credentials: true,
  })
);

connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.locals.user = req.user;
  return next();
});

app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/uploads", express.static("uploads"));
app.use("/api/contact", verifyAuthentication, contactRouter);
app.use("/api/products", productRouter);
app.use("/api/admin", adminRouter);
app.use("/api/agent", agentRouter);
app.use("/api/purchase", verifyAuthentication, purchaseRouter);
app.use("/api/review", verifyAuthentication, reviewRouter);
app.use("/api/cart", verifyAuthentication, cartRouter);

app.listen(PORT);
