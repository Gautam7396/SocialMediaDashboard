const jwt = require("jsonwebtoken");
const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");





const dashboard = async (req, res) => {
    db.query('SELECT postid, title, content, imagePath FROM post', async (err, result) => {
        if (err) {
            return res.json({ status: "error", error: "Error fetching data from the database" });
        }
        if (result.length > 0) {
            return res.json({ status: "success", data: result });
        } else {
            return res.json({ status: "error", error: "No posts found" });
        }
    });
}

//yee chal raha tha
/*
const dashboard = async (req, res) => {
    db.query('SELECT p.title, p.content, p.createdAt, c.commentcontent FROM post p LEFT JOIN comment c ON p.postid = c.postid', async (err, result) => {
        if (err) {
            return res.json({ status: "error", error: "Error fetching data from the database" });
        }
        if (result.length > 0) {
            // Grouping comments by post
            const posts = {};
            result.forEach(row => {
                const postId = row.postid;
                if (!posts[postId]) {
                    posts[postId] = {
                        title: row.title,
                        content: row.content,
                        createdAt: row.createdAt,
                        comments: []
                    };
                }
                if (row.commentcontent) {
                    posts[postId].comments.push({ commentcontent: row.commentcontent });
                }
            });
            const postsArray = Object.values(posts);
            return res.json({ status: "success", data: postsArray });
        } else {
            return res.json({ status: "error", error: "No posts found" });
        }
    });
}
*/

/*
const dashboard = async (req, res) => {
    db.query('SELECT p.title, p.content, p.createdAt, c.commentcontent FROM post p LEFT JOIN comment c ON p.postid = c.postid', async (err, result) => {
        if (err) {
            return res.json({ status: "error", error: "Error fetching data from the database" });
        }
        if (result.length > 0) {
            const postsWithComments = result.reduce((acc, curr) => {
                const postId = curr.postid;
                if (!acc[postId]) {
                    acc[postId] = {
                        title: curr.title,
                        content: curr.content,
                        createdAt: curr.createdAt,
                        comments: []
                    };
                }
                if (curr.commentcontent) {
                    acc[postId].comments.push(curr.commentcontent);
                }
                return acc;
            }, {});
            const posts = Object.values(postsWithComments);
            return res.json({ status: "success", data: posts });
        } else {
            return res.json({ status: "error", error: "No posts found" });
        }
    });
}

*/



module.exports = dashboard;

