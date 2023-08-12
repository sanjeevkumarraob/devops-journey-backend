//importing modules
const db = require("../Models");
const jwt = require("jsonwebtoken");
const config = require("config");
const authConfig = config.get("auth");
const userController = require("../Controllers/userController");

// Assigning users to the variable User
const Event = db.events;


console.log("Authconfig is ", authConfig.secretKey);
//signing a user up
//hashing users password before its saved to the database with bcrypt
const createEvent = async (req, res) => {
  try {
    const {
      eventName,
      eventDate,
      eventTime,
      createdBy,
      updatedBy,
      invitees,
      location,
      eventDetails,
      image_url,
      category,
      photos,
    } = req.body;
    console.log(req.body);
    const event = await Event.create(req.body);
    if (event) {
      return res.status(201).send(event);
    } else {
      return res.status(409).send("Details are not correct");
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllEvents = async (req, res) => {
  try {
    console.log("user is ",req.user);
    const events = await Event.findAll();
    console.log(events.every((event) => event instanceof Event)); // true
    return res.status(201).send(events);
    //   console.log("All events:", JSON.stringify(events, null, 2));
  } catch (error) {
    console.log(error);
  }
};

const getEventsByUser = async (req, res) => {
  try {
    console.log("user is ",req.user);
    const user = await userController.getUserDetails(req.user);
    if (user != "No User Found"){
         const events = await Event.findAll({
           where: {
             createdBy: user.userName,
           },
         });

         return res.status(201).send(events);
    }else {
         return res.status(409).send("No Events Found");
    }
   
    //   console.log("All events:", JSON.stringify(events, null, 2));
  } catch (error) {
    console.log(error);
  }
};

const updateEventById = async (req, res) => {
  try {
    console.log(req.user);
    const user = await userController.getUserDetails(req.user);
    if (user != "No User Found"){
         const events = await Event.update(req.body,{
           where: {
             createdBy: user.userName,
             id: req.params.eventId
           },
         });

         return res.status(201).send(events);
    }else {
         return res.status(409).send("No Events Found");
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteEventById = async (req, res) => {
  try {
    console.log(req.params.eventId);
    const user = await userController.getUserDetails(req.user);
    if (user != "No User Found"){
         const events = await Event.destroy({
           where: {
             createdBy: user.userName,
             id: req.params.eventId
           },
         });

         return res.sendStatus(200);
    }else {
         return res.status(409).send("No Events Found");
    }
  } catch (error) {
    console.log(error);
  }
};

const getSingleEventByUser = async (req, res) => {
  try {
    console.log(req.user);
    const user = await userController.getUserDetails(req.user);
    if (user != "No User Found"){
         const events = await Event.findOne({
           where: {
             createdBy: user.userName,
             id: req.params.eventId
           },
         });

         return res.status(201).send(events);
    }else {
         return res.status(409).send("No Events Found");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventsByUser,
  getSingleEventByUser,
  updateEventById,
  deleteEventById,
};
