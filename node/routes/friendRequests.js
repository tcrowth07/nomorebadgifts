import express from "express";
import FriendRequestList from "../models/friendRequestListModel.js";

const router = express.Router();

//GET: /FriendRequest/{userId}
// gets specific friend request list from DB
router.get("/:userId", (req, res) => {
  let userId = req.params.userId;
  FriendRequestList.findOne({ userId: userId })
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      console.log(err);
    });
});

//POST: /FriendRequest/{userId}
//adds a single friend request to a specific user's friend request list
router.post("/", async (req, res) => {
  let requesterUserId = req.body.requesterUserId;
  let recieverUserId = req.body.recieverUserId;

  FriendRequestList.findOneAndUpdate(
    { userId: recieverUserId },
    { $push: { friendRequestList: requesterUserId } },
    {new: true}
  )
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        let newFriendRequestList = new FriendRequestList({
          userId: recieverUserId,
          friendRequestList: [requesterUserId]
        });
        newFriendRequestList
          .save()
          .then((result) => {
            console.log("Added new FriendRequestList to DB");
            res.send(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

//DELETE: /FriendRequest/{userId}
// deletes specific friend from friend request list
router.delete("/:userId", (req, res) => {
  let userId = req.params.userId;
  let friendUserId = req.body.friendId
  FriendRequestList.findOneAndUpdate(
    { userId: userId },
    {
      $pull: { friendRequestList: friendUserId },
    },
    {new: true}
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

export default router;
