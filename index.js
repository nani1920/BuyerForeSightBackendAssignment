/** @format */
const { dbConnect } = require("./lib/db/dbConnect");
const userRoute = require("./src/routes/user");
const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const rateLimit = require("express-rate-limit");

app.use(express.json());
app.use(morgan("combined"));
app.use(cors());

app.use(helmet());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per window per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later",
  },
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

app.get("/", (req, res) => {
  res.send("server is running")
})

app.use("/api/", apiLimiter);

app.use("/api/user", userRoute);

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
