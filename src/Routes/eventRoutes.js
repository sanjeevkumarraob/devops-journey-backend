//importing modules
const express = require("express");
const eventController = require("../Controllers/eventController");
const {
  createEvent,
  getAllEvents,
  getEventsByUser,
  getSingleEventByUser,
  updateEventById,
  deleteEventById,
} = eventController;
const userAuth = require("../auth/auth");

const router = express.Router();

//events endpoint
//passing the middleware function to the signup
router.post("/", userAuth.validateUser, createEvent);

//login route
router.get("/all", userAuth.validateUser, getAllEvents);
router.get("/", userAuth.validateUser, getEventsByUser);
router.get(
  "/:eventId",
  userAuth.validateUser,
  getSingleEventByUser
);
router.put(
  "/:eventId",
  userAuth.validateUser,
  updateEventById
);
router.delete(
  "/:eventId",
  userAuth.validateUser,
  deleteEventById
);

module.exports = router;
