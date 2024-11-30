import http from 'http';
import { app } from './app.js';

const port = process.env.port || 3000;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Sever is running at ${port} PORT`)
})
