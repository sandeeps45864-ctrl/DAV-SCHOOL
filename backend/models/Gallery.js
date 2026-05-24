const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({

    image: {
        type: String,
        required: true
    },

    category: {
        type: String,
        default: "gallery"
    }

});

module.exports = mongoose.model("Gallery", gallerySchema);