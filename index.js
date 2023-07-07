const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const authRouter = require("./routes/authRoutes");
const bodyparser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const port = process.env.PORT || 8001;
dbConnect();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use("/api/user", authRouter);
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
  console.log("Server is listening at port", port);
});
