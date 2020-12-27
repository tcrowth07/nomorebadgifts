import mongoose from "mongoose";
const Schema = mongoose.Schema;

const FriendListSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    FriendList: [
      {
        userId: {
          type: String,
          required: true,
        },
        friendAcceptedRequest: {
          type: Boolean,
          required: true
        }
      } 
    ],
  },
  { timestamps: true }
);

const FriendList = mongoose.model("FriendList", FriendListSchema);

export default FriendList;
