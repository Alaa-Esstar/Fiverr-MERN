import mongoose from 'mongoose';
const { Schema } = mongoose;

const conversationSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    sellerId: {
        type: String,
        required: true
    },
    buyerId: {
        type: String,
        required: true
    },
    readdBySeller: {
        type: Boolean,
        required: true
    },
    readdByBuyer: {
        type: Boolean,
        required: true
    },
    lastMessage: {
        type: String,
        required: false
    },
}, {
    timestamps: true
});

export default mongoose.model("Conversation", conversationSchema);