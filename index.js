const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const authRouter = require("./routes/authRoutes");
const productRouter = require("./routes/productRoutes");
const blogRoutes = require("./routes/blogRoutes");
const bodyparser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const port = process.env.PORT || 8001;
dbConnect();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRoutes);
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
  console.log("Server is listening at port", port);
});
