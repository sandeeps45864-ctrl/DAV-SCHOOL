const express = require("express");

const router = express.Router();

const multer = require("multer");

const path = require("path");

const Gallery = require("../models/Gallery");

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, path.join(__dirname, "../uploads"));

    },

    filename: (req, file, cb) => {

        cb(
            null,
            Date.now() + "-" + file.originalname
        );

    }

});

const upload = multer({ storage });





router.post(
    "/",
    upload.single("image"),

    async (req, res) => {

        try {

            if (!req.file) {

                return res.status(400).json({

                    success: false,
                    message: "No Image Uploaded"

                });

            }

            const newImage = new Gallery({

                image: req.file.filename

            });

            await newImage.save();

            res.json({

                success: true,
                message: "Image Uploaded Successfully"

            });

        } catch (error) {

            console.log(error);

            res.status(500).json({

                success: false,
                message: "Server Error"

            });

        }

    }
);





router.get("/", async (req, res) => {

    try {

        const images = await Gallery.find();

        res.json(images);

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false

        });

    }

});

module.exports = router;