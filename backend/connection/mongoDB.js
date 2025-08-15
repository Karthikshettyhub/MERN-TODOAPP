


const mongoose = require('mongoose');

console.log("Trying to connect to MongoDB...");

const connection = async () => {
    try {
        await mongoose.connect(" add ur connection string here");
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log("MongoDB not connected:", err);
    }
};


connection();
