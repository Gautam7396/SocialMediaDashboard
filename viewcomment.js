const jwt = require("jsonwebtoken");
const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");



const viewComments = async (req, res) => {
    try {
        const postId = req.params.postId;

        const sql = "SELECT commentid, postid, commentcontent FROM comment WHERE postid = ?";
        const values = [postId];

        db.query(sql, values, (err, results) => {
            if (err) {
                console.error("Error fetching comments:", err);
                return res.status(500).json({ status: "error", error: "Failed to fetch comments" });
            }

            res.status(200).json({ status: "success", data: results });
        });
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ status: "error", error: "Failed to fetch comments" });
    }
};


module.exports = viewComments;
