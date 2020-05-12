const express = require("express");
const Datastore = require("nedb");
const socket = require("socket.io");
const app = express();
const port = process.env.PORT || 3000;

const server = app.listen(port, () => console.log("listening.."));

app.use(express.static("public"));
app.use(express.json({limit:"1mb"}));

const database = new Datastore("database.db");
database.loadDatabase();

app.get('/api',(request, response)=>{
    
});

//socket setup
const io = socket(server);

io.on("connection",(socket)=>{
    console.log("socket connection made...");
    socket.on("mapData", (data)=>{
        console.log("recieved data");
        const timestamp = Date.now();
        data.timestamp = timestamp;
        database.insert(data);
        database.find({},(error, mapdata)=>{
            io.sockets.emit("mapData", mapdata);
        })
        console.log("sending response");
    })

    socket.on('loadMap', ()=>{
        database.find({},(error, mapdata)=>{
            console.log("Loading Map");
            io.sockets.emit("mapData", mapdata);
        })
    })
});

