import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = 'https://ecommerce-kboc.onrender.com';

const AdminChat = ({ token }) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io(SOCKET_URL, { auth: { token } });

    socketRef.current.on('connect_error', (err) => {
      console.error('Socket connect error:', err.message);
    });

    socketRef.current.on('new:message', ({ message, user }) => {
      setMessages(prev => [...prev, { ...message, senderName: user.username }]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [token]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Chat Messages</h2>
      <div className="flex flex-col space-y-3 border rounded p-4 max-h-[600px] overflow-y-auto bg-gray-50">
        {messages.map((msg, i) => (
          <div key={i} className="bg-white p-3 rounded shadow">
            <div className="font-semibold text-sm mb-1 text-gray-700">
              {msg.senderName || 'User'}
            </div>
            <div>{msg.text || msg.message}</div>
            <div className="text-xs text-gray-500 mt-1">
              {new Date(msg.createdAt || Date.now()).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminChat;
