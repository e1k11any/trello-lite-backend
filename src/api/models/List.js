const mongoose = require("mongoose");
const { Schema } = mongoose;

const listSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "A list must have a name."],
      trim: true,
    },
    // This is the link to the parent Board document.
    board: {
      type: Schema.Types.ObjectId, // Stores a MongoDB document ID.
      ref: "Board", // Tells Mongoose this ID refers to a document in the 'Board' collection.
      required: true,
    },
  },
  { timestamps: true }
);

const List = mongoose.model("List", listSchema);

module.exports = List;
