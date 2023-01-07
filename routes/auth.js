const router = require('express').Router()
const User = require('../models/User')
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


//Regsiter

router.post('/register', async (req , res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
          ).toString(),
    });
    try {
        const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }    
})  



//Login

router.post('/login', async (req, res) => {
    try {
        console.log("this is login req");
        // console.log(req.body);
        const user = await  User.findOne({username: req.body.username})
        
        //  console.log(user);
        // !user &&  res.status(401).json("Wrong User Name");        
        if (!user){
            res.status(401).json("Wrong User Name")
            return;
        }
        
        const Originalpassword  = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
            ).toString(CryptoJS.enc.Utf8)
        const testPassword = CryptoJS.AES.decrypt(
            req.body.password ,
            process.env.PASS_SEC
            ).toString(CryptoJS.enc.Utf8)

        // const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        // Originalpassword !== req.body.password && 
        //     res.status(401).json('wrong pass')
        
            if(Originalpassword!== testPassword ){
                console.log('auth login')
                res.status(401).json('wrong pass')
                return
            }
            
        const accessToken = jwt.sign({
            id:user._id,            
            isAdmin: user.isAdmin,            
            isWholeSale: user.isWholeSale,   
                 
        },
            process.env.JWT_SEC, 
            {expiresIn:'3d'}
        )
        
        // console.log('acToken'); 
        // console.log(accessToken);
        //sending all info besides password
        const { password, ...others} = user._doc;
        
    res.status(200).json({...others, accessToken})
   
    } catch (err) {
        
       return res.status(500).json(err);
    }
   
})
module.exports = router 