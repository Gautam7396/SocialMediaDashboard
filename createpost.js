const jwt = require("jsonwebtoken");
const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save uploaded files to the 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); 
    }
});

const upload = multer({ storage: storage }).single('image');

const createpost = async (req, res) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            return res.status(500).json({ status: "error", error: "File upload failed" });
        } else if (err) {
            // An unknown error occurred when uploading.
            return res.status(500).json({ status: "error", error: "An unknown error occurred" });
        }

        // File upload successful, proceed to handle other data
        const { title, content } = req.body;
        const imagePath = req.file.path; // Full path of the uploaded image

        if (!title || !content || !imagePath) {
            return res.json({ status: "error", error: "Please provide title, content, and image" });
        }

        // Your database query to insert data (including imagePath) into the database goes here
        db.query('INSERT INTO post (title, content, imagePath) VALUES (?, ?, ?)', [title, content, imagePath], (error, results) => {
            if (error) {
                return res.json({ status: "error", error: "Failed to insert data into database" });
            }
            return res.json({ status: "success", success: "Post created successfully" });
        });
    });
};

module.exports = createpost;




/* // Original backup without image

const jwt = require("jsonwebtoken");

const db = require("../routes/db-config");

const bcrypt = require("bcryptjs");

const createpost= async (req, res) => {
    const {title, content} = req.body;
    if(!title || !content) return res.json({status: "error", error: "Please Enter your title and content both are neccessary"});
    else{
        console.log(title);
        db.query('SELECT  title FROM post WHERE title = ?',[title], async (err, result)=>{
            if(err) throw err;
            if(result[0])return res.json({ status: "error", error: "title has already been posted "});
            else{
                console.log(content);
                db.query( "insert into post SET ?",{title:title,content:content},(error,results)=>{
                    if(error) throw error;
                    return res.json({status: "success", success: "title and content has stored in the database "})
                })
            }
        })
    }
    
}

module.exports = createpost;

*/
