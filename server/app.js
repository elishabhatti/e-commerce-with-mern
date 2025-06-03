import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import contactRouter from "./routes/contact.routes.js";
import productRouter from "./routes/products.routes.js";
import cors from "cors"
import dotenv from "dotenv";
import { connectDb } from "./config/DB_CONNECTION.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/contact", contactRouter);
app.use("/api/products", productRouter);

app.listen(PORT);
