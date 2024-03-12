const jwt = require("jsonwebtoken");

const db = require("../routes/db-config");

const bcrypt = require("bcryptjs");


const createcomment = (req, res) => {
    const { postid, commentcontent } = req.body; 
    //console.log("Received postid:", postid);


    const sql = "INSERT INTO comment(postid, commentcontent) VALUES (?, ?);"; 
    const values = [postid, commentcontent]; 

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error creating comment:", err);
            return res.status(500).json({ status: "error", error: "Failed to create comment" });
        }

        console.log("Comment created successfully");
        res.status(200).json({ status: "success", success: "Comment created successfully" });
    });
};

module.exports = createcomment;


/*
const createcomment = (req, res) => {
    const {postId, commentcontent} = req.body; // Assuming postId is sent along with the comment

    const sql = "INSERT INTO comment(post_id, commentcontent) VALUES (?, ?)";
    const values = [postId, commentcontent];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error creating comment:", err);
            return res.status(500).json({status: "error", error: "Failed to create comment"});
        }

        console.log("Comment created successfully");
        res.status(200).json({status: "success", success: "Comment created successfully"});
    });
};

module.exports = createcomment;
*/



