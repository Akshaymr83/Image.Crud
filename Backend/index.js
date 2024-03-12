// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser'); // Import body-parser
// const mongoose = require("mongoose");
// const cors = require("cors");
// const port = 2000;
// const userModel = require("./models/user");




// mongoose.connect("mongodb://localhost:27017/Emp")
//     .then(() => {
//         console.log("MongoDB is connected");
//     })
//     .catch((err) => {
//         console.log(err);
//     });
//     app.use(cors()); // Use cors() middleware
//     app.use(express.json());
// //////////////////////////////////////POST/////////////////////////////////////////////////

// app.post("/post", async (req, res) => {
//     try {
//         const { name, department, age, salary, image } = req.body; // Destructure data from req.body
//         const postdetail = await userModel.create({ name:name, department:department, age:age, salary:salary, image:image }); // Use destructured data
//         res.json(postdetail);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: "Internal Server Error" }); // Send an error response
//     }
// });

// app.get("/get", async (req, res) => {
//     try {
//         const user = await userModel.find();
//         res.json(user)
//     }
//     catch (err) {
//         console.log(err);
//     }
// })

// app.get('/getimage',(req,res)=>{
//     userModel.find()
//     .then(image => res.json(image))
//     .catch(err => res.json(err))
// })


// ///////////
// const upload=multer({
//     storage: storage
// })





//  app.post('/upload', upload.single('file'), (req, res) => {
//     userModel.create({ image: req.file.filename })
//         .then(result => {
//             console.log(req.file);
//             res.json(result); // Send JSON response after creating the image record
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({ error: err.message }); // Send error response with status code 500
//         });
// });



// app.get('/getimage',(req,res)=>{
//     userModel.find()
//     .then(image => res.json(image))
//     .catch(err => res.json(err))
// })



// app.listen(port, () => {
//     console.log(`Server is connected to ${port}`);
// });




// ////////////////////////////////////////


// server.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require('multer');

const port = 2000;
const userModel = require("./models/user");

app.use(cors());
app.use(express.json());
app.use(express.static('public'))

mongoose.connect("mongodb://localhost:27017/Emp")
    .then(() => {
        console.log("MongoDB is connected");
    })
    .catch((err) => {
        console.log(err);
    });

    const storage=multer.diskStorage({
        destination:(req,file,cb)=>{     //herre we provide path to the file ie, create afolder public and inside it should dispplay the image folder there only the image will be uploaded
            cb(null, 'public/images')    //in this callback function we create the path for store images, first null indicates error and next indicate the path for image
        },
        filename:(req, file, cb)=>{     //here specifies filename
            // here it specifies file and its field name and also date and its path name original 
            cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
        }
    })
    

const upload = multer({ storage: storage });

app.post("/post", async (req, res) => {
    try {
        const { name, department, age, salary, image } = req.body;
        const postdetail = await userModel.create({ name, department, age, salary, image });
        res.json(postdetail);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/get", async (req, res) => {
    try {
        const user = await userModel.find();
        res.json(user)
    }
    catch (err) {
        console.log(err);
    }
});

app.post('/upload', upload.single('file'), (req, res) => {
    userModel.create({ image: req.file.filename })
        .then(result => {
            console.log(req.file);
            res.json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err.message });
        });
});

app.listen(port, () => {
    console.log(`Server is connected to ${port}`);
});
