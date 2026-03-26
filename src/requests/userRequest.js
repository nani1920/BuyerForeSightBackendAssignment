/** @format */

const { body } = require("express-validator");
const { param } = require("express-validator");
const { query } = require("express-validator");
const validateRequest = require("../middleware/validateRequests");

const userPostRequest = [
  body("name")
    .exists()
    .bail()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("email")
    .exists()
    .bail()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid")
    .normalizeEmail(),
  body("phone")
    .exists()
    .bail()
    .withMessage("Phone is required")
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone must be 10 characters")
    .isMobilePhone()
    .withMessage("Phone is invalid"),
  body("company")
    .exists()
    .bail()
    .withMessage("Company is required")
    .isLength({ min: 3 })
    .withMessage("Company must be at least 3 characters"),
  validateRequest,
];

const userIdValidation = [
  param("id")
    .exists()
    .bail()
    .withMessage("Id is required")
    .isInt({ allow_leading_zeroes: false })
    .bail()
    .withMessage("Id must be a number"),
  validateRequest,
];

const userUpdateValidation = [
  body("name")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters")
    .custom((value, { req }) => {
      req.updatedData = req.updatedData || {};
      req.updatedData.name = value;
      return true;
    }),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Email is invalid")
    .normalizeEmail()
    .custom((value, { req }) => {
      req.updatedData = req.updatedData || {};
      req.updatedData.email = value;
      return true;
    }),
  body("phone")
    .optional()
    .isLength({ min: 10 })
    .withMessage("Phone must be at least 10 characters")
    .isMobilePhone()
    .withMessage("Phone is invalid")
    .custom((value, { req }) => {
      req.updatedData = req.updatedData || {};
      req.updatedData.phone = value;
      return true;
    }),
  body("company")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Company must be at least 3 characters")
    .custom((value, { req }) => {
      req.updatedData = req.updatedData || {};
      req.updatedData.company = value;
      return true;
    }),
  validateRequest,
];

const getUsersFilterValidation = [
  query("search").optional(),
  query("order")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Order must be either asc or desc"),
  query("sort").optional(),
  query("limit")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Limit must be a positive integer")
    .toInt(),
  query("offset")
    .optional()
    .isInt({ gt: -1 })
    .withMessage("Offset must be a positive integer")
    .toInt(),
  validateRequest,
];

module.exports = {
  userPostRequest,
  userIdValidation,
  userUpdateValidation,
  getUsersFilterValidation,
};
