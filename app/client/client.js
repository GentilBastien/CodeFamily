const ws = new WebSocket('ws://localhost:8080/ws');

let sendMessage = function (msg) {
  ws.send(msg);
};

ws.onopen = function (e) {
  console.log('Client connected !');
};

ws.onmessage = function (e) {
  console.log('Client received a message !');
};

ws.onclose = function (e) {
  console.log('Client has closed the connection !');
};

ws.onerror = function (e) {
  console.log('Client got an error !');
};
