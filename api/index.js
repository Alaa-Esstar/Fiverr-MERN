const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")

dotenv.config();
const app = express();

const connectToDataBase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Conneted to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB :", error)
    }
}

app.listen(8000, () => {
    connectToDataBase();
    console.log("bakend server is running on port 8000")
})