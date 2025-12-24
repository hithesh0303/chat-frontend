const socket = io("https://subtriangulate-unstrained-risa.ngrok-free.dev", {
  transports: ["websocket"]
});

/* ---------- Screen Navigation ---------- */

function showScreen(id) {
  document.querySelectorAll(".screen")
    .forEach(screen => screen.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function goToName() {
  showScreen("screen-name");
}

function goToChat() {
  showScreen("screen-chat");
}

function goToEnd() {
  showScreen("screen-end");
}

/* ---------- Chat Logic ---------- */

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
