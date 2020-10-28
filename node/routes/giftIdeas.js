import express from 'express';
import Gift from '../models/gifts.js'

const router = express.Router();

//Get all gifts from DB
router.get("/", (req, res) => {
    Gift.find()
        .then((results) => {
            res.send(results)
        })
        .catch((err) => {
            console.log(err)
        })
});

//GET: /questions/add
//adds one gift to db
router.get("/add", (req, res) => {
    const question = new Question({
        questionNumber: 4,
        text: "You regularly stand up for your beliefs when they are challenged",
        category: "EI"
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