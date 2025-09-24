const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // Import bcrypt

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true, // Each email must be unique
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// --- Mongoose Middleware for Password Hashing ---
// This function runs *before* a user document is saved to the database.
userSchema.pre("save", async function (next) {
  // We only want to hash the password if it's new or has been modified.
  if (!this.isModified("password")) {
    return next();
  }

  // Generate a 'salt' to add randomness to the hash
  const salt = await bcrypt.genSalt(10);
  // Hash the password with the salt
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// --- Mongoose Custom Method for Password Comparison ---
// We add a custom method to our schema to easily compare passwords during login.
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
