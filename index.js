const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const authRouter = require("./routes/authRoutes");
const bodyparser = require("body-parser");
const port = process.env.PORT || 8001;
dbConnect();
app.use(bodyparser());
app.use(bodyparser.urlencoded({ extended: false }));
app.use("/api/user", authRouter);
app.listen(port, () => {
  console.log("Server is listening at port", port);
});
