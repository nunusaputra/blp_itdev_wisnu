const express = require("express");
const { checkToken } = require("../middleware/validationToken");
const {
  fetchTodos,
  getAllTodos,
  getTodosByID,
  createTodos,
  updateTodos,
  deleteTodos,
} = require("../controllers/todos");
const router = express.Router();

router.get("/fetch-todos", checkToken, fetchTodos);
router.get("/", checkToken, getAllTodos);
router.get("/:id", checkToken, getTodosByID);
router.post("/", checkToken, createTodos);
router.patch("/:id", checkToken, updateTodos);
router.delete("/:id", checkToken, deleteTodos);

module.exports = router;
