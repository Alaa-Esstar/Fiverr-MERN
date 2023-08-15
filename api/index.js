const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const userRoute = require("./routes/user.route")
const gigRoute = require("./routes/gig.route")
const conversationRoute = require("./routes/conversation.route")
const reviewRoute = require("./routes/review.route")
const messageRoute = require("./routes/message.route")
const orderRoute = require("./routes/order.route")
const authRoute = require("./routes/auth.route")
const cookieParser = require("cookie-parser")
const cors = require("cors")

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

app.use(cors({ origin: process.env.ALLOWED_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/auth", authRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "something went wrong!"

    return res.status(errorStatus).send(errorMessage);
})

app.listen(8000, () => {
    connectToDataBase();
    console.log("bakend server is running on port 8000")
})