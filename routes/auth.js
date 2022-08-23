const router = require('express').Router()
const TodoUser = require('../models/TodoUser')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

//Register a new User

router.post("/register", async (req, res) => {
    const newUser = new TodoUser({
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    })

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
        
    } catch (err) {
        res.status(500).json(err)
    }
    
})

//Login a User

router.post("/login", async (req, res) => {
    try {
        const user = await TodoUser.findOne({ username: req.body.email})

    //    !user && res.status(401).json("Wrong credentials!")

        const hashedPassword = CryptoJS.AES.decrypt( user.password, "fergus")
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
        originalPassword !== req.body.password && res.status(401).json("Wrong Credentials!")

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_SEC,
            { expiresIn: "3d" }
        )
        //removing password to show all other user information other than the password
        //MongoDB stores all the documents in a folder _doc, so use _doc whan passing user
        const { password, ...others } = user._doc;

        res.status(200).json({...others, accessToken})
    }catch (err){
        res.status(500).json(err)
    }
})

module.exports = router