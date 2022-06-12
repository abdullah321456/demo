const {User} = require("./models");

const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();


require('dotenv').config()

app.use(express.json());


app.use(cors());

const sampleUser = {
    ID: 98989,
    Name: "Satti",
    Father_Name: "khan",
    Gender: "Male",
    Email: "mm@mail.com",
    Semester: 8,
    Address: "Pindi",
    Admission_Date: "08/09/2020",
    Registration_NO: 3423423432,
    Image_URL: "https://localhost/xsxsa/dasdsad.jpg"
}


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(process.env.MONGODB_URL, options).then(() => {
    console.log("Connected to MongoDB")
    app.listen(process.env.PORT || 8080, () => {
        console.log(`Listening to port ${process.env.PORT || 8080}`);
    });
});

app.post("/init", async (req, res) => {
    const numOfRecordsToInsert = req.body.numberOfRecords;
    if (numOfRecordsToInsert && numOfRecordsToInsert > 0) {
        let data = []
        for (let i = 0; i < numOfRecordsToInsert; i++) {
            data.push(sampleUser)
        }
        try {
            await User.insertMany(data);
            res.status(200).json({msg: "data inserted successfully"});
        } catch (e) {
            res.status(500).json({msg: e});
        }
    } else {
        res.status(400).json({msg: "invalid request"});
    }
})


app.post("/", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json({user});
    } catch (e) {
        res.status(500).json({msg: e});
    }
})


app.get("/:page/:perPage/:requireTotalPages", async (req, res) => {
    try {
        const perPage = req.params.perPage,
            requireTotalPages = req.params.requireTotalPages,
            page = req.params.page;
        const users = await User.find().limit(perPage).skip(perPage * page).sort({Name: 'asc'});
        if (requireTotalPages == "true") {
            const totalPages = await User.count();
            res.status(200).json({users, totalPages})
        } else {
            res.status(200).json({users})
        }
    } catch (e) {
        res.status(500).json({msg: e});
    }
})


app.post('/search', async (req, res) => {
    const perPage = req.params.perPage,
        page = req.params.page;
    let search = req.body.search;
    let filteredSearch = {};
    for (const property in search) {
        if (search[property] && search[property].length > 0) {
            filteredSearch = {...filteredSearch, [property]: search[property]};
        }
    }
    try {
        const users = await User.find(filteredSearch).limit(perPage).skip(perPage * page).sort({Name: 'asc'});
        const totalPages = await User.find(filteredSearch).count();
        res.status(200).json({users,totalPages});
    } catch (e) {
        res.status(500).json({msg: e});
    }
})

