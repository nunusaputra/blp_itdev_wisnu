const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const { checkValidation } = require("../middleware/validationChecker");
const {
  register,
  login,
  logout,
  refreshToken,
  me,
} = require("../controllers/auth");
const { checkToken } = require("../middleware/validationToken");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please enter a valid email!"),
    body("password")
      .notEmpty()
      .withMessage("Column password cannot be empty!")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters!")
      .matches(/[A-Z]/g)
      .withMessage("Password must have at least one uppercase letter")
      .matches(/[a-z]/g)
      .withMessage("Password must have at least one lowercase letter")
      .matches(/[0-9]/g)
      .withMessage("Password must have at least one digit number")
      .not()
      .matches(/\s/g)
      .withMessage("Please don't use white space!"),
  ],
  checkValidation,
  register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email!"),
    body("password").notEmpty().withMessage("Column password cannot be empty!"),
  ],
  checkValidation,
  login
);

router.delete("/logout", logout);
router.get("/token", refreshToken);
router.get("/me", checkToken, me);

module.exports = router;
