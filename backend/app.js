const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const FileUploads = require("express-fileupload");
const mainRouter = require("./routers");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(FileUploads());
app.use(express.static("public"));
app.use(mainRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
