let wsConnection: WebSocket
async function wsConnect(){
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

  await resolveAfter2Seconds();
}

//Doing this because it did not wait to connect, and that broke stuff
//(bad solution probably)
function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 1000);
  });
}