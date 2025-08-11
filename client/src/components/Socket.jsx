import { io } from 'socket.io-client';

const token = localStorage.getItem('token');

const Socket = io('https://ecommerce-kboc.onrender.com', {
  transports: ['websocket'],
  autoConnect: false,
  auth:{
    token: token
  },
});

if(token){
    Socket.connect();
  }

export default Socket;