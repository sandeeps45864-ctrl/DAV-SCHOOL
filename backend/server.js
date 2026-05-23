require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Admission = require("./models/Admission");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)

.then(() => {

    console.log("✅ MongoDB Connected");

})

.catch((err) => {

    console.log("❌ MongoDB Error:", err);

});



app.get("/", (req, res) => {

    res.send("✅ Backend Running Successfully");

});



app.post("/admission", async (req, res) => {

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

            message: "✅ Admission Form Submitted Successfully"

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "❌ Server Error"

        });

    }

});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`🚀 Server Running On Port ${PORT}`);

});