const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  // Check if the Authorization header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 1. Get token from header (e.g., "Bearer eyJhbGciOi...")
      token = req.headers.authorization.split(" ")[1];

      // 2. Verify the token using our secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Find the user by the ID that was in the token
      //    and attach the user object to the request (excluding the password)
      req.user = await User.findById(decoded.id).select("-password");

      // 4. Move on to the next function (the actual route controller)
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
