import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app=express();

const server=createServer(app);

app.use(cors({
  origin:"*"
}))

const io=new Server(server,{
  cors:{
    origin:"*"
  }
})


io.on("connection",(socket)=>{
  console.log("user connected ",socket.id);


socket.on("send-message", (msg) => {
  console.log("Got:", msg);

  socket.broadcast.emit("receive-message",msg);
});


socket.on("disconnect", () => {
  console.log(`server disconneted ${socket.id}`);
});


})
server.listen(8000,()=>{
  console.log("server started .....")
})


