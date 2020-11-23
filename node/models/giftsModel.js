import mongoose from "mongoose";
const Schema = mongoose.Schema;

const giftSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    whereToBuy: {
        type: String,
    },
    category1: {
        type: String,
    },
    category2: {
        type: String,
    },
    category3: {
        type: String,
    }
},{ timestamps: true });

const Gift = mongoose.model('Gift', giftSchema);

export default Gift;