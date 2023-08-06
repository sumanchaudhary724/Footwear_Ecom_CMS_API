import express from "express";
import {
  deletePaymentbyId,
  getPayments,
  insertPayment,
  updatePaymentById,
} from "../model/payment/PaymentModel.js";
import { updatePaymentValidation } from "../middleware/joiValidation.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await getPayments();

    res.json({
      status: "success",
      message: " New payment has been added",
      result,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const result = await insertPayment(obj);

    result?._id
      ? res.json({
          status: "success",
          message: " New payment method has been added",
        })
      : res.json({
          status: "error",
          message: "Error, Unable to add new payment.",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      error.statusCode = 200;
      error.message =
        "The slug for the payment already exist, please change the payment name ans try again.";
    }
    next(error);
  }
});

router.put("/", updatePaymentValidation, async (req, res, next) => {
  try {
    const result = await updatePaymentById(req.body);

    result?._id
      ? res.json({
          status: "success",
          message: "The payment has been updated",
        })
      : res.json({
          status: "error",
          message: "Error, Unable to udpate new payment.",
        });
  } catch (error) {
    next(error);
  }
});
router.delete("/:_id", async (req, res, next) => {
  const { _id } = req.params;
  try {
    if (_id) {
      const result = await deletePaymentbyId(_id);
      result?._id &&
        res.json({
          status: "success",
          message: "The payment has been deleted",
        });

      return;
    }

    res.json({
      status: "error",
      message: "Error, Unable to process your request.",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
