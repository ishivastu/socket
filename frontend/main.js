import { io } from "https://cdn.socket.io/4.7.2/socket.io.esm.min.js";

const socket = io("http://localhost:8000");

socket.on("connect", () => {
  console.log("socketid", socket.id);
});

const input = document.getElementById("data");
const button = document.getElementById("button");
const shivastu = document.getElementById("shivastu");
const shraddha = document.getElementById("shraddha");

let content = "";

let caption="";

// when message comes from other frontend (via backend)
socket.on("receive-message", (text) => {
  console.log(text);
  content += "SENDER: "+text + "\n";
  shivastu.innerText = content; // 👈 update UI here
});

button.addEventListener("click", () => {
  const msg = input.value;
  input.value = "";

  socket.emit("send-message", msg);

  caption += "Me: " + msg + "\n";
  shraddha.innerText = caption; // 👈 update UI here
});
