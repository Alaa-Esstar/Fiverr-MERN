import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderSchema = new Schema({
    gigId: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    sellerId: {
        type: String,
        required: true
    },
    BuyerId: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    payment_intent: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export default mongoose.model("Order", orderSchema);