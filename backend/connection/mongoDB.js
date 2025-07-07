


const mongoose = require('mongoose');

console.log("Trying to connect to MongoDB...");

const connection = async () => {
    try {
        await mongoose.connect("mongodb+srv://karthikashetty036:8546993820@cluster0.kvy4ulg.mongodb.net/");
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log("MongoDB not connected:", err);
    }
};

connection();