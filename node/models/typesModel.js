import mongoose from "mongoose";
const Schema = mongoose.Schema;

const typeSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    introverted: {
        type: Boolean,
        required: true
    },
    observant: {
        type: Boolean,
        required: true
    },
    thinking: {
        type: Boolean,
        required: true
    },
    judging: {
        type: Boolean,
        required: true
    },
    description: {
        type: String,
        required: true
    },
},{ timestamps: true });

const Type = mongoose.model('Type', typeSchema);

export default Type;