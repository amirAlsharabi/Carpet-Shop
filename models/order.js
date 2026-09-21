const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    carpet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Carpet",
      required: true,
    },
    orderType: {
      type: String,
      enum: ["custom_meter", "ready_made"],
      required: true,
    },
    length: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    totalArea: {
      type: Number,
      required: true,
    },
    installationNeeded: {
      type: Boolean,
      default: false,
    },
    edgingNeeded: {
      type: Boolean,
      default: false,
    },
    serviceFee: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Cutting/Preparing", "Out for Installation", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);