import express from "express";
import FriendList from "../models/friendListModel.js";

const router = express.Router();

//Get all friends lists from DB
router.get("/", (req, res) => {
  FriendList.find()
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      console.log(err);
    });
});

//GET: /FriendLists/{userId}
// gets specific friend list from DB
router.get("/:userId", (req, res) => {
  let userId = req.params.userId;
  FriendList.findOne({ userId: userId })
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      console.log(err);
    });
});

//POST: /FriendLists/
//adds a single friend to a specific user's friend list
router.post("/", async (req, res) => {
  let requesterUserId = req.body.requesterUserId;
  let recieverUserId = req.body.recieverUserId;

  FriendList.findOneAndUpdate(
    { userId: requesterUserId },
    {
      $push: {
        FriendList: { userId: recieverUserId, friendAcceptedRequest: false },
      },
    },
    { new: true }
  )
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        let newFriendList = new FriendList({
          userId: requesterUserId,
          FriendList: [
            {
              userId: recieverUserId,
              friendAcceptedRequest: false,
            },
          ],
        });
        newFriendList
          .save()
          .then((result) => {
            console.log("Added new FriendList to DB");
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

//POST: /FriendLists/accept
//called to accept a friend request
router.post("/accept/:userId", async (req, res) => {
  let userId = req.params.userId;
  let accepterUserId = req.body.accepterUserId;
  console.log("userId", userId);
  console.log("accepterUserId", accepterUserId);

  //change friendAcceptedRequest to true for given friend
  FriendList.findOneAndUpdate(
    { userId: userId, "FriendList.userId": accepterUserId },
    { $set: { "FriendList.$.friendAcceptedRequest": true } },
    { new: true }
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
    
    //add friend to user's own friend list
    FriendList.findOneAndUpdate(
      { userId: accepterUserId },
      {
        $push: {
          FriendList: { userId: userId, friendAcceptedRequest: true },
        },
      },
      { new: true }
    )
      .then((result) => {
        if (result) {
          res.send(result);
        } else {
          let newFriendList = new FriendList({
            userId: accepterUserId,
            FriendList: [
              {
                userId: userId,
                friendAcceptedRequest: true,
              },
            ],
          });
          newFriendList
            .save()
            .then((result) => {
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

//DELETE: /FriendLists/{userId}
// deletes specific friend from friend list
router.delete("/:userId", (req, res) => {
  //name, description, price, whoCanSee, whereToBuy
  let userId = req.params.userId;
  FriendList.findOneAndUpdate(
    { userId: userId },
    {
      $pull: { FriendList: { friendId: req.body.friendId } },
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
