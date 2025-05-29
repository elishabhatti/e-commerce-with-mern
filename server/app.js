import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import { connectDb } from "./config/DB_CONNECTION.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

connectDb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRouter);
app.use(cookieParser());

app.listen(PORT);
