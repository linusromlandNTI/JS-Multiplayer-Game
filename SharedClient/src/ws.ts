const wsConnection = new WebSocket(url);

wsConnection.onopen = () => {
  //wsConnection.send("hej");
};

wsConnection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`);
};

wsConnection.onmessage = (e) => {};
