const socket = io("https://subtriangulate-unstrained-risa.ngrok-free.dev", {
  transports: ["websocket"]
});

function sendMsg() {
  const input = document.getElementById("msg");
  const msg = input.value.trim();

  if (msg !== "") {
    socket.emit("message", msg);
    input.value = "";
  }
}

socket.on("message", (msg) => {
  const li = document.createElement("li");
  li.innerText = msg;
  document.getElementById("chat").appendChild(li);
});