//DEPENDENCIES

/*
Import dotenv package and load environment variables from the .env file.

dotenv reads the .env file and .config() loads those variables into process.env.

process.env is a built-in Node.js object used to store environment variables such as PORT, MONGO_URI, and JWT_SECRET 
*/
require("dotenv").config();

/* 
Import Node.js built-in DNS module.

The DNS module helps Node.js control how domain names  are resolved  into IP addresses.

Here, we set Google DNS servers to help resolve MongoDB Atlas connection strings correctly
*/

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

//Import express package
const express = require("express");
const mongoose = require("mongoose");
const jwtToken = require("jsonwebtoken");
const dbConnection = require("./config/connection");
const { json } = require("stream/consumers");

//Create Express application
const app = express();

//define the PORT number from environment variables
const PORT = process.env.PORT;

//Connect to MongoDB
//dbConnection();

//MIDDLEWARE
/*
Both middlewares put the final result into req.body, but each one knows how to convert a different format(application/x-www-form-urlencoded, application/json) into a JavaScript object

1: Form
username=sri&password=123
content-type:application/x-www-form-urlencoded

2: Json
Content-Type:application/json
{
  "username": "sri",
  "password": "123"
}
*/
app.use(express.urlencoded({ extended: true }));
//Parse incoming JSON request bodies and make the data available in req.body
app.use(express.json());

//ROUTES

/*
When request comes:

Request enters Express.
express.json() checks: “Is this JSON?”
express.urlencoded() checks: “Is this form data?”
Then the matching route runs: app.get, app.post, etc.

For a normal GET request, usually there is no body, so these middlewares do nothing.
For form submit with POST, this one reads it: express.urlencoded()
For JSON sent with POST, this one reads it: express.json()
*/



//PORT / SERVER LISTEN
/*
Here server means the HTTP server created using Node.js, with Express handling the routes and middleware
Node.js HTTP server = actual server listening for requests
Express = framework that helps handle routes, middleware, req, res
Start the Node.js HTTP server and listen for requests on the given PORT
HTTP Server:
The server is created when the code uses Node’s HTTP module (directly or indirectly through Express).
Express internally creates the HTTP server

Node.js = runtime environment
HTTP module = creates server
Express = framework that simplifies server code.
*/

dbConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🌍 Now Http server Listening on Localhost: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("Failed to connect to MongoDB and start server:", error.message);
    });




