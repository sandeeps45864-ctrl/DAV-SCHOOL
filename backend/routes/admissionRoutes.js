const express = require("express");

const router = express.Router();

const Admission = require("../models/Admission");

router.post("/", async (req, res) => {

    try {

        const newAdmission = new Admission(req.body);

        await newAdmission.save();

        res.json({
            success: true
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false
        });

    }

});

module.exports = router;