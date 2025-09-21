// src/api/routes/cardRoutes.js
const express = require("express");
const {
  createCard,
  getCardsByList,
  getCardById,
  updateCard,
  deleteCard,
} = require("../controllers/cardController");

// mergeParams is essential for accessing params from parent routers (:boardId, :listId)
const router = express.Router({ mergeParams: true });

router.route("/").post(createCard).get(getCardsByList);
router.route("/:cardId").get(getCardById).put(updateCard).delete(deleteCard);

module.exports = router;
