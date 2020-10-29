import mongoose from "mongoose";
const Schema = mongoose.Schema;

const giftSchema = new Schema({
    id: {
        type: String,
        required: true
    },
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
        required?
    },
    img: {
        type: String,
        required?
    },
    whereToBuy: {
        type: String,
        required?
    }
},{ timestamps: true });

const Gift = mongoose.model('Gift', giftSchema);

export default Gift;