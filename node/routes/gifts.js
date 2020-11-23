import express from 'express';
import Gift from '../models/giftsModel.js'

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

//GET: /gifts/add
//adds one gift to db
router.get("/add", (req, res) => {
    const gift = new Gift({
        name: "A picnic lunch",
        description: "The chance to get away and spend time with your favorite person",
        price: 0,
        img: "https://bostonglobe-prod.cdn.arcpublishing.com/resizer/UNFVQe8OFNkTh28qbw46ZyaKMC8=/1440x0/cloudfront-us-east-1.images.arcpublishing.com/bostonglobe/DQVTIEF5Q5G6FL7MGTPTTYAQ7E.jpg",
        whereToBuy: "",
        category1: "Experience",
        category2: "Romantic",
        category3: ""
    });
    gift.save()
        .then((result) => {
            console.log("Added gift to DB")
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

export default router;