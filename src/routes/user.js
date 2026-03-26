/** @format */
const userController = require("../controllers/userController");
const userRequestValidator = require("../requests/userRequest");
const express = require("express");

const Router = express.Router();

Router.post("/", userRequestValidator.userPostRequest, userController.postUser);
Router.get("/", userController.getUsers);

Router.get(
  "/:id",
  userRequestValidator.userIdValidation,
  userController.getUserById,
);
Router.put(
  "/:id",
  userRequestValidator.userIdValidation,
  userRequestValidator.userUpdateValidation,
  userController.updateUserById,
);
Router.delete(
  "/:id",
  userRequestValidator.userIdValidation,
  userController.deleteUserById,
);

module.exports = Router;
