const db = require("../routes/db-config");

const bcrypt = require("bcryptjs");

const register = async(req, res) =>{
const {email,password: Npassword }=req.body
   /* const email = req.body.email
    const Npassword = req.body.password*/
    if(!email || !Npassword) return res.json({status:"error",error:"Please Enter your email and password  "});
    else {
        console.log(email);
        db.query('SELECT  email FROM users WHERE email = ?',[email], async (err, result)=>{
            if (err) throw err;
           if(result[0])return res.json({ status: "error", error: "Email has already been registered"});
           //if(result[0])return res.json({ status: "error", error: "user has  been registered"});
            else {
                const password = await bcrypt.hash(Npassword, 8);// await for his function in 54:55
                console.log(password)
                db.query("insert into users SET ?" ,{email:email, password:password},(error, results)=>{
                    if(error) throw error;
                    return res.json({status: "success", success: "User has been registered"})
                })
            }
        })
    } 
}

module.exports = register;