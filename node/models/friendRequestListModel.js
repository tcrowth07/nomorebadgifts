import mongoose from "mongoose";
const Schema = mongoose.Schema;

const friendRequestListSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    friendRequestList: [
        {
          type: String,
          required: true,
        },
    ],
  },
  { timestamps: true }
);

const friendRequestList = mongoose.model("friendRequestList", friendRequestListSchema);

export default friendRequestList;
