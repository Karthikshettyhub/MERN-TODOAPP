const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

//sign up auth
router.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        
        const hashPassword = bcrypt.hashSync(password, 10);
        const user = new User({ email, username, password: hashPassword });
        await user.save();
        res.status(200).json({ user: user });
        
    } catch (err) {
        console.log("Registration error:", err); // Debug log
        if (err.code === 11000) {
            res.status(400).json({ message: "User already exists" });
        } else {
            res.status(400).json({ message: "Registration failed", error: err.message });
        }
    }
});

//SIGN IN
router.post("/signin", async (req, res) => {
    try {
       const user = await User.findOne({email: req.body.email});
       if(!user){
        return res.status(400).json({message: "user not found" });
       }
       const ispasswordCorrect = bcrypt.compareSync(req.body.password , user.password);
       if(!ispasswordCorrect){
        return res.status(400).json({message: "password is incorrect" });
       }
       const {password,...others} = user._doc;
       res.status(200).json({user: others});
    } catch (err) {
        console.log("Signin error:", err); // Debug log
        res.status(400).json({ message: "signin error" });
    }
});

module.exports = router;