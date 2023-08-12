import express from "express";

import slugify from "slugify";
import {
  deleteproductbyId,
  getProducts,
  insertProduct,
} from "../model/product/ProductModel.js";
import { newProductValidation } from "../middleware/joiValidation.js";
import multer from "multer";

const router = express.Router();

const imgFolderPath = "public/img/product";

//setup multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let error = null;
    //validate check
    cb(error, imgFolderPath);
  },
  filename: (req, file, cb) => {
    let error = null;
    // construct name file name
    const fullFileName = Date.now() + "_" + file.originalname;
    console.log(file.mimetype);
    cb(error, fullFileName);
  },
});

const upload = multer(storage);
//where do you want to store the file
// what name do you want to give to

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

router.post(
  "/",
  upload.array("images", 5),
  newProductValidation,
  async (req, res, next) => {
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
  }
);

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
