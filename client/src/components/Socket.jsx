import { io } from 'socket.io-client';

const token = localStorage.getItem('token');

const Socket = io('https://ecommerce-kboc.onrender.com', {
  transports: ['websocket'],
  auth:{
    token: token
  },
});

export default Socket;