const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const Gallery = require("../models/Gallery");

/* CREATE UPLOAD FOLDER */

const uploadPath = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

/* STORAGE */

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },

    filename: function (req, file, cb) {

        const uniqueName =
            Date.now() + path.extname(file.originalname);

        cb(null, uniqueName);
    }

});

const upload = multer({ storage });

/* UPLOAD */

router.post("/upload", upload.single("image"), async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });

        }

        const newImage = new Gallery({

            image: req.file.filename,
            category: req.body.category

        });

        await newImage.save();

        res.json({
            success: true,
            message: "✅ Upload Successful"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "❌ Upload Failed"
        });

    }

});

/* GET IMAGES */

router.get("/images", async (req, res) => {

    try {

        const images = await Gallery.find();

        res.json(images);

    } catch (error) {

        res.status(500).json({
            success: false
        });

    }

});

module.exports = router;