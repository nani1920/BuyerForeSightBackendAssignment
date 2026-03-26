/** @format */
const { dbConnect } = require("./lib/db/dbConnect");
const userRoute = require("./src/routes/user");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());

app.use("/user", userRoute);

const initializeServer = async () => {
  try {
    await dbConnect();
    app.listen(process.env.PORT, () => {
      console.log(`server running at localhost: ${process.env.PORT}`);
    });
  } catch (e) {
    console.log("server initialization Error :", e.message);
    process.exit(1);
  }
};

initializeServer();
