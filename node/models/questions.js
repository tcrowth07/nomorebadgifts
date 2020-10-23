import mongoose from "mongoose";
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    questionNumber: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
},{ timestamps: true });

const Question = mongoose.model('Question', questionSchema);

export default Question;