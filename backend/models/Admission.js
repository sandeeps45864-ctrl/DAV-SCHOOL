const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    className: {
        type: String,
        required: true
    },

    message: {
        type: String
    }

});

module.exports = mongoose.model("Admission", admissionSchema);