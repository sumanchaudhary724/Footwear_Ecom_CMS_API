import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
    },
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      index: 1,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    sku: {
      type: text,
      unique: true,
      required: true,
    },
    salesPrice: {
      type: Number,
    },
    salesStartDate: {
      type: Date,
      default: null,
    },
    salesEndDate: {
      type: Date,
      default: null,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2048], // max length of a string in mongodb is 1
    },
  },
  { timestamps: true }
);
export default mongoose.model("products", ProductSchema);
