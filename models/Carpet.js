const mongoose = require("mongoose");

const carpetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["custom_meter", "ready_made"],
      required: true,
    },
    origin: {
      type: String,
      required: true,
      trim: true,
    },
    thickness: {
      type: Number,
      required: true,
      min: 1,
    },
    material: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    fixedLength: {
      type: Number,
      default: 0,
    },
    fixedWidth: {
      type: Number,
      default: 0,
    },
    imageUrl: {
      type: String,
      default: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80",
    },
    stockQuantity: {
      type: Number,
      default: 10,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Carpet", carpetSchema);