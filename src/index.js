const express = require("express");
const sequelize = require("sequelize");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
// const dbusers = require('./db')
const app = express();
const db = require("./Models");
const userRoutes = require("./Routes/userRoutes");
const eventRoutes = require("./Routes/eventRoutes");
//setting up your port
const PORT = process.env.PORT || 4000

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});
// app.get("/users", dbusers.getUsers);
// app.get("/users/:id", dbusers.getUserById);
// app.post("/users", dbusers.createUser);
// app.put("/users/:id", dbusers.updateUser);
// app.delete("/users/:id", dbusers.deleteUser);

//synchronizing the database and forcing it to false so we dont lose data
db.sequelize.sync({ force: false }).then(() => {
    console.log("db has been re sync")
})

//routes for the user API
app.use('/api/users', userRoutes)
app.use('/api/events', eventRoutes)

//listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`))