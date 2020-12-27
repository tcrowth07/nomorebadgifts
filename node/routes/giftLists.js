import express from "express";
import GiftList from "../models/giftListsModel.js";

const router = express.Router();

//Get all gift lists from DB
router.get("/", (req, res) => {
  GiftList.find()
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      console.log(err);
    });
});

//GET: /giftLists/{userId}
// gets specific gift list from DB
router.get("/:userId", (req, res) => {
  let userId = req.params.userId;
  GiftList.findOne({ userId: userId })
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      console.log(err);
    });
});

//POST: /giftLists/{userId}
//adds a single gift to a specific user's gift list
router.post("/:userId", async (req, res) => {
  let userId = req.params.userId;

  const newGiftList = {
    giftName: req.body.giftName,
    description: req.body.description,
    price: req.body.price,
    img: req.body.img,
    whereToBuy: req.body.whereToBuy,
    whoCanSee: req.body.whoCanSee,
  };
  GiftList.findOneAndUpdate(
    { userId: userId },
    { $push: { giftList: newGiftList } }
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//DELETE: /giftLists/{userId}
// deletes specific gift item from gift list
router.delete("/:userId", (req, res) => {
  //name, description, price, whoCanSee, whereToBuy
  let userId = req.params.userId;
  GiftList.findOneAndUpdate(
    { userId: userId },
    {
      $pull: { giftList: { giftName: req.body.name } },
    }
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

export default router;
