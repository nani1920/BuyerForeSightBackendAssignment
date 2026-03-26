/** @format */

const userRepo = require("../repositories/userRepository");
const postUser = async (req, res) => {
  try {
    const data = req.body;
    const userExist = await userRepo.getProspectByMail(data.email);
    console.log("user:", userExist);
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "user already Exists with this Mail",
      });
    }
    const response = await userRepo.createProspect(data);
    if (response === undefined) {
      return res.status(400).json({
        success: false,
        message: "failed to create user, retry after sometime",
      });
    }
    res.status(201).json({
      success: true,
      data: "user created Successfully",
      user: response,
    });
  } catch (e) {
    console.log(e);
  }
};

const getUsers = async (req, res) => {
  try {
    const response = await userRepo.getAllProspects();
    if (response.length === 0 || response === undefined) {
      return res.status(400).json({
        success: false,
        message: "No users found",
      });
    }
    res.status(200).json(response);
  } catch (e) {
    console.log(e.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userRepo.getProspectById(id);
    if (user === undefined) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
    res.status(200).json(user);
  } catch (e) {
    console.log(e.message);
  }
};

const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.updatedData;
    if (updatedData === undefined) {
      return res.status(400).json({
        success: false,
        message: "No Data Provided to update",
      });
    }
    const userExist = await userRepo.getProspectById(id);
    if (userExist === undefined) {
      return res.status(400).json({ success: false, message: "No User Found" });
    }
    const data = {
      name: updatedData.name ? updatedData.name : userExist.name,
      email: updatedData.email ? updatedData.email : userExist.email,
      phone: updatedData.phone ? updatedData.phone : userExist.phone,
      company: updatedData.company ? updatedData.company : userExist.company,
    };
    const user = await userRepo.updateProspectById(id, data);
    if (user === undefined) {
      return res
        .status(400)
        .json({ success: false, message: "no user Updated" });
    }
    res.status(200).json({
      success: true,
      message: "User Updated Successfully",
      data: user,
    });
  } catch (e) {
    console.log(e);
  }
};

const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userRepo.getProspectById(id);
    console.log(user);
    if (user === undefined) {
      return res.status(400).json({ success: false, message: "No User Found" });
    }
    await userRepo.deleteProspectById(id);
    res.status(200).json({ success: true, data: "user Deleted Successfully" });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  postUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
