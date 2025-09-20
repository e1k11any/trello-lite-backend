const express = require("express");
const router = express.Router();

const { createBoard, getAllBoards } = require("../controllers/boardController");

router.get("/", getAllBoards);

router.post("/", createBoard);

module.exports = router;
