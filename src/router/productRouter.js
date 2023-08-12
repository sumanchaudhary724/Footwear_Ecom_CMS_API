import express from "express";

import slugify from "slugify";
import {
  deleteproductbyId,
  getProducts,
  insertProduct,
} from "../model/product/ProductModel.js";
import { newProductValidation } from "../middleware/joiValidation.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const products = await getProducts();

    res.json({
      status: "success",
      message: "Here are the products",
      products,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", newProductValidation, async (req, res, next) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.name, { trim: true, lower: true });

    const result = await insertProduct(req.body);

    result?._id
      ? res.json({
          status: "success",
          message: "The new product has been added successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to add new product, try again later",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.statusCode = 200;
      error.message =
        "The product slug or sku alread related to another product, change name and sku and try agin later.";
    }
    next(error);
  }
});

router.delete("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;

    const result = await deleteproductbyId(_id);

    result?._id
      ? res.json({
          status: "success",
          message: "The  product has been deleted successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to delete the product, try again later",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
