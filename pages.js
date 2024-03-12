 const { application } = require("express");
const express = require("express");
const loggedIn=require("../controllers/loggedIn");
const logout=require("../controllers/logout");
const profile=require("../controllers/profile");// for my profile 
const dashboard=require("../controllers/dashboard");
const createpost=require("../controllers/createpost");
const createcomment=require("../controllers/createcomment");
// for uploading of images
const viewComments = require("../controllers/viewcomment");

// for chatting 

const multer = require("multer");

const storage = multer.diskStorage({ //storage engine
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); 
    }
});

const upload = multer({ storage: storage });//instance of multer middleware

const router = express.Router();

router.post("/createpost", upload.single('image'), createpost);

router.get("/",loggedIn,(req,res)=>{
    if(req.user){
        res.render("index",{status:"loggedIn",user:req.user});
    }
    else{
        res.render("index",{status:"no",user:"nothing"});
    }
})

router.get("/register",(req,res)=>{
    res.sendFile("register.html", {root: "./public"});
})
// which serves the register.html form the public directory
router.get("/login",(req,res)=>{
    res.sendFile("login.html", {root: "./public/"});
})

router.get("/logout",logout)

// for profile
router.get("/profile",profile)

router.get("/dashboard",(req,res)=>{
    res.sendFile("dashboard.html",{root:"./public/"});
})


router.get("/createpost",(req,res)=>{
    res.sendFile("createpost.html",{root:"./public/"});
})


router.get("/createcomment",(req,res)=>{
    res.sendFile("createcomment.html",{root:"./public/"});
})



// route for fetching comments
router.get("/api/comments/:postId", viewComments);


//chatting purpose 


////// comment yaha tak  chatting 


module.exports = router;