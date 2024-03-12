const express = require('express');
const db = require('./routes/db-config');

const app = express();
const cookie = require('cookie-parser');
/// for uploading images
const multer = require("multer");
///

const PORT = process.env.PORT || 5000;

app.use("/js",express.static(__dirname+"/public/js"));
app.use("/css",express.static(__dirname+"/public/css"));

// for image uploading
app.use('/uploads', express.static('uploads'));

app.set("view engine", "ejs");
app.set("views","./views");
app.use(cookie());
app.use(express.json());





// for chatting purpose 
const http = require('http').createServer(app)



http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/chat.html')
})

// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})

///////////
db.connect((err)=>{
    if(err) throw err;
        console.log("database connected")
});

app.use("/", require("./routes/pages"));
app.use("/api", require("./controllers/auth"))
//app.listen(PORT, () => console.log('Server Started at PORT:'+PORT));