const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ MongoDB Connected");
})
.catch((err) => {
    console.log("❌ MongoDB Error");
    console.log(err);
});

const AdmissionSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    className: String,
    message: String
});

const Admission = mongoose.model("Admission", AdmissionSchema);

app.post("/api/admission", async (req, res) => {

    try {

        const newAdmission = new Admission({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            className: req.body.className,
            message: req.body.message
        });

        await newAdmission.save();

        res.status(200).json({
            success: true,
            message: "Form Submitted Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on ${PORT}`);
});