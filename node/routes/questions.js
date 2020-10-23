import express from 'express';
import Question from '../models/questions.js'

const router = express.Router();

//Get all questions from DB
router.get("/", (req, res) => {
    Question.find()
        .then((results) => {
            res.send(results)
        })
        .catch((err) => {
            console.log(err)
        })
});

export default router;