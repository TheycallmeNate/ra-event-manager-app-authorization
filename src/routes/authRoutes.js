const express = require("express");
const router = express.Router();
const { registerNewUser } = require("../controllers/authController");
const { loginUser } = require("../controllers/authController");

router.post("/signup", registerNewUser);
router.post("/login", loginUser);

module.exports = router;
