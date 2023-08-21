const mongoose = require("mongoose")
const { Schema } = mongoose;

const messageSchema = new Schema({
    conversationId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Message", messageSchema);