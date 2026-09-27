const express = require("express");
const router = express.Router();
const Carpet = require("../models/Carpet");
const isSignedIn = require("../middleware/is-signed-in");
const isAdmin = require("../middleware/is-admin");
const { model } = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const upload = require("../middleware/upload");
const order = require("../models/order");

router.get("/", isSignedIn, async (req, res) => {
    try {
        const myOrder = await order
            .find({ customer: req.session.user._id })
            .populate("carpet");
        res.render("ordersList.ejs", { myOrder });
    } catch (error) {
        console.error(error);
        res.send(error.message);
    }
});

router.post("/", isSignedIn, async (req, res) => {
    const foundCarpet = await Carpet.findById(req.body.carpet);
    if (!foundCarpet) {
        return res.send("Carpet not found");
    }
    const length = Number(req.body.length);
    const width = Number(req.body.width);
    const totalArea = length * width;
    let fixingPrice = 0;
    let edgingPrice = 0;
    const installationNeeded = req.body.installationNeeded === "on";
    const edgingNeeded = req.body.edgingNeeded === "on";

    if (installationNeeded) {
        fixingPrice = totalArea * 0.4;
    } if (edgingNeeded) {
        edgingPrice = (length + length) * 2;
    }

    let fee = fixingPrice + edgingPrice;
    const basePrice = foundCarpet.type === "custom_meter"
        ? totalArea * foundCarpet.price
        : foundCarpet.price;
    let price = basePrice + fee;

    try {
        const placeOrder = await order.create({
            customer: req.session.user._id,
            carpet: req.body.carpet,
            orderType: req.body.orderType,
            length: length,
            width: width,
            totalArea: totalArea,
            installationNeeded: req.body.installationNeeded === "on",
            edgingNeeded: req.body.edgingNeeded === "on",
            serviceFee: fee,
            totalPrice: price,
            deliveryAddress: req.body.deliveryAddress,
            phone: req.body.phone,

    });
    res.redirect("/orders");
    } catch (error) {
        console.error(error);
        res.send(error.message);
    }
});
module.exports = router;
