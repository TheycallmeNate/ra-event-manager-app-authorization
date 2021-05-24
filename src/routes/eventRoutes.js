const express = require("express");
const router = express.Router();
const {
  createNewEvent,
  fetchEvents,
  fetchSingleEvent,
  updateEntireEvent,
  deleteSingleEvent,
} = require("../controllers/eventControllers");
const {
  authenticateUser,
  checkIfAdmin,
} = require("../middlewares/authentication");

router.post("/events", authenticateUser, createNewEvent);

router.get("/events", authenticateUser, fetchEvents);

router.get("/events/:id", authenticateUser, fetchSingleEvent);

router.put("/events/:id", authenticateUser, checkIfAdmin, updateEntireEvent);

router.delete("/events/:id", authenticateUser, checkIfAdmin, deleteSingleEvent);

module.exports = router;
