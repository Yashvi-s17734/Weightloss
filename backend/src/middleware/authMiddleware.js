const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("Auth Header:", authHeader);

  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];

  console.log("Extracted Token:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Decoded userId:", decoded.userId);

    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};
