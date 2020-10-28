import express from 'express';
import Question from '../models/questions.js'
import cors from 'cors'

const router = express.Router();
router.use(cors());

//GET: /questions
// gets all questions from DB
router.get("/", (req, res) => {
    Question.find()
        .then((results) => {
            res.send(results)
        })
        .catch((err) => {
            console.log(err)
        })
});

//POST: /questions
//adds a single question to db
router.post("/", (req, res) => {
    const question = new Question({
        questionNumber: req.body.questionNumber,
        text: req.body.text,
        category: req.body.category
    });
    question.save()
        .then((result) => {
            console.log("Added question to DB")
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

export default router;