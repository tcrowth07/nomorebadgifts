import mongoose from "mongoose";
const Schema = mongoose.Schema;

const giftListSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    giftList: [
      {
        giftId: {
          type: String,
          required: true,
        },
        giftName: {
          type: String,
          required: true,
        },
        description: {
          type: String,
        },
        price: {
          type: Number,
          required: true,
        },
        img: {
          type: String,
        },
        whereToBuy: {
          type: String
        },
        whoCanSee: {
          type: String
        },
      },
    ],
  },
  { timestamps: true }
);

const GiftList = mongoose.model("GiftList", giftListSchema);

export default GiftList;
