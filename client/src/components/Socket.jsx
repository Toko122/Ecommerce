import { io } from 'socket.io-client';
const SOCKET_URL = 'https://ecommerce-kboc.onrender.com';

const Socket = io(SOCKET_URL, {
  transports: ['websocket'],
  auth: { token: localStorage.getItem('token') },
});

export default Socket;