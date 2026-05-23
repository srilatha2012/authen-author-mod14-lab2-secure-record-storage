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


//Create Express application
const app = express();

//define the PORT number from environment variables
const PORT = process.env.PORT;


//MIDDLEWARE


//ROUTES
//PORT