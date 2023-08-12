import express from "express";
import {
  addProduct,
  deleteProductById,
  getProducts,
} from "../model/product/ProductModel.js";
import slugify from "slugify";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await getProducts();
    res.json({
      status: "success",
      message: "Results received",
      result: [],
    });
  } catch (error) {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.name, { trim: true, lower: true });
    const obj = {
      title,
      slug: slugify(title, { lower: true, trim: true }),
    };
    const result = await addProduct(obj);
    result?._id
      ? res.json({
          status: "success",
          message: "New product Sucessfully added",
        })
      : res.json({
          status: "error",
          message: "Unable to add new category",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      error.statusCode = 400;
      error.message = "This title is already avilable in the database.";
    }
    next(error);
  }
});
// router.put("/", async (req, res, next) => {
//   try {
//     const { value, ...rest } = req.body;
//     const result = await updateCatagory(value, rest);
//     const { title, status } = result;
//     result?._id
//       ? res.json({
//           status: "success",
//           message: `${title} is ${status}`,
//         })
//       : res.json({
//           status: "error",
//           message: "Unable to add new category",
//         });
//   } catch (error) {
//     next(error);
//   }
// });
router.delete("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;
    console.log(_id);
    const result = await deleteProductById(_id);
    result?._id
      ? res.json({
          status: "success",
          message: result.title + " deleted.",
        })
      : res.json({
          status: "error",
          message: "Unable to delete",
        });
  } catch (error) {
    next(error);
  }
});
export default router;
