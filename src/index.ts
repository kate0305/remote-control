import { httpServer } from './http_server/index.js';
import WebSocket, { createWebSocketStream } from 'ws';
import { wss } from './webSocket_server/index.js';
import { commandHandler } from './commands/commandHandler.js';
import { IncomingMessage } from 'node:http';
import { EOL } from 'node:os';

const HTTP_PORT = 8181;
console.log(`Start static http server on the ${HTTP_PORT} port!`);

httpServer.listen(HTTP_PORT);

wss.on('connection', async (ws: WebSocket.WebSocket, req: IncomingMessage) => {
  const parameters = wss.address() as WebSocket.AddressInfo;
  console.log(`Start webSocket Server!`);
  console.log(`Websocket parameter: address: ${parameters.address}; port: ${parameters.port}`);
  console.log(req.socket.localAddress);

  const stream = createWebSocketStream(ws, { decodeStrings: false, encoding: 'utf-8' });
  stream.on('data', async (chank) => {
    const result = await commandHandler(chank);
    stream.write(result);
    console.log(`Result: ${result}`);
  });

  //console.log(stream.write("hgffd"))
  //stream.write();
  //console.log(await handler(ws));

  //stream.pipe(process.stdout);
  //process.stdin.pipe(stream);
});

process.on('SIGINT', async () => {
  console.log(`${EOL}Server closed!`);
  wss.close();
  httpServer.close();
});
