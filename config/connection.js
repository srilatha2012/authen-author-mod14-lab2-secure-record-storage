//Import mongoose package to connect with MongoDB
const mongoose = require("mongoose");

//Get MongoDB connection string from .env file
const MONGO_URI = process.env.MONGO_URI;

//Function to connect the application to MongoDB
async function dbConnection() {
    try {
       await mongoose.connect(MONGO_URI)
       console.log("Successfully connected to MongoDB");
           
    } catch(error) {
         console.log("Error connecting to MongoDB",error.message)
    }
 
}
module.exports = dbConnection;