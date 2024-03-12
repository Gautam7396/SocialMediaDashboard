const express=require("express");
const router=express.Router();

const register=require("./register")
const login=require("./login")
//const logout=require("./logout")
const  dashboard=require("./dashboard")
const createpost=require("./createpost")
const createcomment=require("./createcomment")


router.post("/register",register)
router.post("/login",login)
router.post("/dashboard",dashboard)
router.post("/createpost",createpost)
router.post("/createcomment",createcomment)
//router.get("/logout",logout)
//new demo file: // router.get("/logout",(req,res)=>{ logout})

module.exports=router