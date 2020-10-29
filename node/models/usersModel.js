import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    username: {
        type: String,
        required: true,
        min: 3,
        max: 15
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    birthDate: {
        type: Date
    }
},{ timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;