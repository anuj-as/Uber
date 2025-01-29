import http from 'http';
import { app } from './app.js';
import { initializeSocket } from './socket.js'
const port = process.env.port || 3000;
const server = http.createServer(app);
initializeSocket(server);

server.listen(port, () => {
  console.log(`Sever is running at ${port} PORT`)
})
