import express from "express";

import dotenv from "dotenv";
dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;

//middlewares
import morgan from "morgan";
import cors from "cors";
import mongoConnect from "./src/config/mongoConfig.js";
import path from "path";

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

mongoConnect();

const _dirname = path.resolve();
console.log(_dirname);

app.use(express.static(path.join(_dirname, "/public")));

// api
import adminRouter from "./src/router/adminRouter.js";
import categoryRouter from "./src/router/categoryRouter.js";
import paymentOptionRouter from "./src/router/paymentOptionRouter.js";
import productRouter from "./src/router/productRouter.js";
import { auth } from "./src/middleware/authMiddleware.js";
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/category", auth, categoryRouter);
app.use("/api/v1/payment-option", auth, paymentOptionRouter);
app.use("/api/v1/product", auth, productRouter);

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Server running well",
  });
});

app.use((error, req, res, next) => {
  console.log(error);
  const code = error.statusCode || 500;
  res.status(code).json({
    status: "error",
    message: error.message,
    code,
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server is running at http://localhost:${PORT}`);
});
