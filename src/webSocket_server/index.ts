import { WebSocketServer } from 'ws';

const PORT = 8080;
export const wss = new WebSocketServer({ port: PORT });
