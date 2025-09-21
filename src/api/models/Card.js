const mongoose = require("mongoose");
const { Schema } = mongoose;

const cardSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Card name is required."],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    // Link to the parent List
    list: {
      type: Schema.Types.ObjectId,
      ref: "List",
      required: true,
    },
    // Link to the top-level Board    //find all cards on a board, regardless of their list
    board: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
  },
  { timestamps: true }
);

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
