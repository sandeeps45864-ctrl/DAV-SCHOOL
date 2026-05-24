const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const path = require("path");

require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(
    "/uploads",
    express.static(
        path.join(__dirname,"uploads")
    )
);

mongoose.connect(process.env.MONGO_URI)

.then(()=>{

    console.log("MongoDB Connected");

})

.catch((error)=>{

    console.log(error);

});





const AdmissionSchema =
new mongoose.Schema({

    name:String,

    email:String,

    phone:String,

    className:String,

    message:String

});

const Admission =
mongoose.model(
    "Admission",
    AdmissionSchema
);





app.post(
    "/api/admission",

    async(req,res)=>{

        try{

            const newAdmission =
            new Admission({

                name:req.body.name,

                email:req.body.email,

                phone:req.body.phone,

                className:req.body.className,

                message:req.body.message

            });

            await newAdmission.save();

            res.json({

                success:true,

                message:
                "Form Submitted Successfully"

            });

        }catch(error){

            console.log(error);

            res.status(500).json({

                success:false,

                message:"Server Error"

            });

        }

});





const galleryRoutes =
require("./routes/galleryRoutes");

app.use(
    "/api/gallery",
    galleryRoutes
);





app.get("/",(req,res)=>{

    res.send("Server Running");

});





const PORT =
process.env.PORT || 5000;

app.listen(PORT,()=>{

    console.log(
        `Server running on ${PORT}`
    );

});