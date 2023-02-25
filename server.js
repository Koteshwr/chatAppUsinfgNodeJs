const express = require("express")
const { setUncaughtExceptionCaptureCallback } = require("process")
const app = express()
const http = require("http").createServer(app)
const port = process.env.PORT || 3000

app.use(express.static(__dirname+"/public"))
http.listen(port,()=>{
    console.log(`listening on port ${port}`)
})

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})


//socket config for server side
const users = {}
const io = require("socket.io")(http)

io.on("connection",(socket)=>{
    socket.on("new-user-joined",name=>{
        users[socket.id] = name;
        console.log("user joined " + name);
        socket.broadcast.emit("user-joined",name);
    })
    socket.on("outgoing",msg =>{
        socket.broadcast.emit("sendmsg",msg)
    })
})
