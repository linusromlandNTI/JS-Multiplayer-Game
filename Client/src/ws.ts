let wsConnection: WebSocket;

//Connect to WebSocket server
async function wsConnect() {
  wsConnection = new WebSocket(url);

  //Send initial message (Currently unsused)
  wsConnection.onopen = () => {};

  //Log errors
  wsConnection.onerror = (error: any) => {
    console.log(`WebSocket error: ${error}`);
  };

  //Send message to index on new message
  wsConnection.onmessage = (e: any) => {
    onMessage(e.data);
  };

  //Wait for 1s to make sure connection is established
  //Doing this because it did not wait to connect, and that broke stuff (bad solution probably)
  await wait(1000);
}

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
