import { httpServer } from './http_server/index.js';
import WebSocket from 'ws';
import { wss } from './web_socket_server/index.js';
import { requestHandler } from './request-handler.js';
import { EOL } from 'node:os';
import { handleErrorMessage } from './utils/utils.js';

const HTTP_PORT = 8181;

httpServer.listen(HTTP_PORT);
console.log(`Start static http server on the ${HTTP_PORT} port!`);

wss.on('connection', (ws: WebSocket) => {
  try {
    const parameters = wss.address() as WebSocket.AddressInfo;
    console.log(`Start webSocket Server!`);
    console.log(`Websocket parameter: address: ${parameters.address}; port: ${parameters.port}`);

    ws.on('message', (chank: string) => {
      const response = requestHandler(chank, ws);
      const result = JSON.stringify(response);
      console.log(`Result: ${result}`);
    });
  } catch (err) {
    const errMessage = handleErrorMessage(err);
    console.log(errMessage);
  }
});

process.on('SIGINT', async () => {
  wss.close();
  httpServer.close();
  console.log(`${EOL}Server closed!`);
});
