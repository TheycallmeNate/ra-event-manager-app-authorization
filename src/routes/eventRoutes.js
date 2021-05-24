const express = require("express");
const router = express.Router();
const {
  createNewEvent,
  fetchEvents,
  fetchSingleEvent,
  updateEntireEvent,
  deleteSingleEvent,
} = require("../controllers/eventControllers");

router.post("/events", createNewEvent);

router.get("/events", fetchEvents);

router.get("/events/:id", fetchSingleEvent);

router.put("/events/:id", updateEntireEvent);

router.delete("/events/:id", deleteSingleEvent);

module.exports = router;
