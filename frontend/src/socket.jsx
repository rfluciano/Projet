import { io } from 'socket.io-client';

const socket = io('http://localhost:8000', {
  transports: ['websocket'],
  withCredentials: true,
});

console.log('Connecting to WebSocket server at: http://localhost:8000');

socket.on('connect', () => {
  console.log('Connected to WebSocket server');
});

socket.on('response2', (data) => {
  console.log("Message de response:",data);
});

socket.on('disconnect', () => {
  console.log('Disconnected from WebSocket server');
});

socket.on('testEvent', (data) => {
  console.log('Received testEvent from server:', data);
});

socket.on("nva", (data)=> {
  console.log("ty le data:",data)
});

export default socket;