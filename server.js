import express from "express";

import dotenv from "dotenv";
dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;

//middlewares
import morgan from "morgan";
import cors from "cors";
import mongoConnect from "./src/config/mongoConfig.js";

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

mongoConnect();

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Server running well",
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server is running at http://localhost:8000`);
});
