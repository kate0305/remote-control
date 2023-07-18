import { WebSocketServer } from 'ws';

const PORT = 3000;
export const wss = new WebSocketServer({ port: PORT, clientTracking: true });
