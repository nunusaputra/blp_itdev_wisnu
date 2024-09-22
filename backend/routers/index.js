const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const todosRouter = require("./todos");

router.use("/auth", authRouter);
router.use("/todos", todosRouter);

module.exports = router;
