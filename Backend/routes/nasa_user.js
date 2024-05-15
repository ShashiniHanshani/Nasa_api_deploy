const router = require("express").Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

let NasaUser = require("../models/Nasa_User");

//http://localhost:8070/NasaUser/add
router.route("/add").post(async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    if (!username || !email || !password) {
        res.status(400);
        res.json("All fields are mandatory");
    }
    const userAvailable = await NasaUser.findOne({ email });
    if (userAvailable) {
        res.status(400);
        res.json("NasaUser already registered!");
    }

    //hash password

    const hashedpassword = await bcrypt.hash(password, 10);
    //console.log("Hashed password: " + hashedpassword);

    const newUser = new NasaUser({
        username, email, password: hashedpassword
    })

    //javasript promise
    newUser.save().then(() => {
        res.json("New NasaUser Added to Database Successfully");
    }).catch((err) => {
        console.log(err);
    })
})

router.route("/login").post(asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        res.json("All fields are mandatory");
    }

    const foundUser = await NasaUser.findOne({ email });

    //checking the password
    if (foundUser && (await bcrypt.compare(password, foundUser.password))) {
        const accessToken = jwt.sign({
            foundUser: {
                username: foundUser.username,
                email: foundUser.email,

            },
        },
            process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" }
        );
        res.status(200).json({ accessToken });
    } else {
        res.status(401)
        res.json("Email and the password mismatch");
    }

}));

module.exports = router;