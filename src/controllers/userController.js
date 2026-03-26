/** @format */

const userRepo = require("../repositories/userRepository");
const postUser = async (req, res) => {
  try {
    const data = req.body;
    const userExist = await userRepo.getProspectByMail(data.email);

    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "user already Exists with this Mail",
      });
    }
    const response = await userRepo.createProspect(data);
    if (response === undefined) {
      return res.status(500).json({
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
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const { search, sort, order, limit, offset } = req.query;

    const data = {
      search: search ? search : "",
      sort: sort ? sort : "name",
      order: order ? order : "asc",
      limit: limit ? limit : 20,
      offset: offset ? offset : 0,
    };
    const response = await userRepo.getAllProspects(data);
    if (response.length === 0 || response === undefined) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }
    res.status(200).json({ success: true, data: response });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userRepo.getProspectById(id);
    if (user === undefined) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    res.status(200).json({ success: true, user });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ success: false, message: "internal server error" });
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
      return res.status(404).json({ success: false, message: "No User Found" });
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
        .status(500)
        .json({ success: false, message: "no user Updated" });
    }
    res.status(200).json({
      success: true,
      message: "User Updated Successfully",
      data: user,
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userRepo.getProspectById(id);

    if (user === undefined) {
      return res.status(404).json({ success: false, message: "No User Found" });
    }
    await userRepo.deleteProspectById(id);
    res
      .status(200)
      .json({ success: true, data: "user Deleted Successfully", user });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

module.exports = {
  postUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
