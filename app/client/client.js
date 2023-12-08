let ws = new WebSocket('ws://localhost:8080/ws');

ws.onopen = function (e) {
  console.log('You are connected !');
};

ws.onmessage = function (e) {
  console.log('You received a message !', e.data);
};

ws.onclose = function (e) {
  console.log('The server has closed the connection with you!');
};

ws.onerror = function (e) {
  console.log('You got an error !', e);
};

function connect() {
  const inputName = document.getElementById('pseudo').value;
  let a = JSON.stringify({ code: 1000, field01: inputName });
  sendMessage(a);
}

let sendMessage = function (objToSend) {
  if (ws) {
    ws.send(objToSend);
  } else {
    throw Error('Websocket Server is not available');
  }
};
