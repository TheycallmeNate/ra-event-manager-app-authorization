const jwt = require("jsonwebtoken");

const secret = "bcrypt0rbcryptJS";

exports.authenticateUser = (req, res, next) => {
  if (!req.headers.authorization)
    return res.status(401).json({ message: "Authorization header required" });

  if (!req.headers.authorization.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization format is: Bearer <token>" });
  }

  let token = req.headers.authorization.replace("Bearer ", "");

  jwt.verify(token, secret, (error, decodedToken) => {
    if (error) return res.status(500).json({ error });

    if (!decodedToken) {
      return res
        .status(401)
        .json({ message: "Invalid authorization token. Please login" });
    }

    req.user = decodedToken;

    next();
  });
};

exports.checkIfAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(401)
      .json({ message: "This route is restricted to admin users" });
  }

  return next();
};
