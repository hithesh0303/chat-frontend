const socket = io("https://subtriangulate-unstrained-risa.ngrok-free.dev", {
  transports: ["websocket"]
});

let username = "";

/* Screen Navigation */
function showScreen(id) {
  document.querySelectorAll(".screen")
    .forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function goToName() {
  showScreen("screen-name");
}

function goToChat() {
  username = document.getElementById("username").value || "Guest";
  showScreen("screen-chat");
}

function goToEnd() {
  showScreen("screen-end");
}

/* Chat Logic */
function sendMsg() {
  const input = document.getElementById("msg");
  const msg = input.value.trim();

  if (msg !== "") {
    socket.emit("message", {
      username: username,
      message: msg
    });
    input.value = "";
  }
}

/* Load Old Messages */
socket.on("oldMessages", (messages) => {
  messages.forEach(data => {
    const li = document.createElement("li");
    li.innerText = `${data.username}: ${data.message}`;
    document.getElementById("chat").appendChild(li);
  });
});

/* Receive New Message */
socket.on("message", (data) => {
  const li = document.createElement("li");
  li.innerText = `${data.username}: ${data.message}`;
  document.getElementById("chat").appendChild(li);
});
