// here path is first index.js --> DB connection --> app initliazation --> router -->
import {connectDB} from "./db/index.js"
import {app} from "./app.js"
import dotenv from 'dotenv';
import { Server as SocketIOServer } from "socket.io";
import http from "http";



dotenv.config({
    path: './env'
})


// creating a http server
const server = http.createServer(app)
const io = new SocketIOServer(server, {
    cors: {
        origin: '*',
        methods: ['GET', "POST"]
    }
});


connectDB()
.then(() => {
    server.listen(process.env.PORT || 3000, () => {
        console.log(`server is listening on port : ${process.env.PORT || 3000}`)
    })
})
.catch((error) => {
    console.error("MongoDB connection failed!  : " + error)
})




io.on('connection', (socket) => {
    // console.log("A user connected");

    socket.on("joinRoom", ({roomId, user}) => {
        socket.join(roomId)
        socket.to(roomId).emit("userJoin", user)
        // console.log(user, "conencted")
        // console.log(`user joined in room : ${roomId}`)
    })

    socket.on("up_location", (payload) => {
        const {locationData, roomId} = payload
        // console.log(locationData)
        io.to(roomId).emit("down_location", locationData)
        // console.log(`locationData send to ${roomId}, data : `, locationData)
    })

    socket.on("leaveRoom", ({roomId, user}) => {
        socket.leave(roomId)
        socket.to(roomId).emit("userLeave", user)
    })

    socket.on("up_message", (payload) => {
        // console.log(payload)
        const {roomId, data} = payload;
        io.to(roomId).emit("down_message", data)
        // console.log("message send to ", roomId)
    })

    socket.on('disconnect', () => {
        // console.log('User disconnected');
    });
});





