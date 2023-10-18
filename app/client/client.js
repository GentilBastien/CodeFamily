const ws = new WebSocket('ws://localhost:8080/ws');

let sendMessage = function (msg) {
  ws.send(msg);
};

ws.onopen = function (e) {
  console.log('You are connected !');
};

ws.onmessage = function (e) {
  console.log('You received a message !', e);
};

ws.onclose = function (e) {
  console.log('The server has closed the connection with you!');
};

ws.onerror = function (e) {
  console.log('You got an error !', e);
};
