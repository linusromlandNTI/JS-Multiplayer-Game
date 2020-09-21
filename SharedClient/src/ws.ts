let wsConnection: WebSocket
function wsConnect(){
  wsConnection = new WebSocket(url);

  wsConnection.onopen = () => {
    //wsConnection.send("hej");
  };
  
  wsConnection.onerror = (error: any) => {
    console.log(`WebSocket error: ${error}`);
  };
  
  wsConnection.onmessage = (e: any) => {
    onMessage(e.data)
  }
}
