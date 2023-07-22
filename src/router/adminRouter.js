import express from "express";

import { insertAdmin } from "../model/admin/AdminModel.js";
import { hashPassword } from "../helper/bcrypt.js";
import { newAdminValidation } from "../middleware/joiValidation.js";
import { accountVerificationEmail } from "../helper/nodemailer.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.post("/", newAdminValidation, async (req, res, next) => {
  try {
    const { password } = req.body;
    req.body.password = hashPassword(password);
    req.body.verificationCode = uuidv4();
    const user = await insertAdmin(req.body);
    if (user?._id) {
      res.json({
        status: "success",
        message: "New Account Created. Verify your Email",
      });
      const link = `${process.env.WEB_DOMAIN}/admin-verification?c=${user.verificationCode}&&e=${user.email}`;
      await accountVerificationEmail({ user, link });
      return;
    }

    // res.json({
    //   status: "error",
    //   message: "Account Creating not Successfull",
    // });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      error.statusCode = 400;
      error.message =
        "An account already exist with this email.Please try another.";
    }
    next(error);
  }
});

export default router;
