import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = 'https://ecommerce-kboc.onrender.com';

const AdminChat = ({ token }) => {
  const [messages, setMessages] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUsername, setSelectedUsername] = useState('');
  const [input, setInput] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io(SOCKET_URL, { auth: { token } });

    socketRef.current.on('connect_error', (err) => {
      console.error('Socket connect error:', err.message);
    });

    socketRef.current.on('new:message', ({ message, user }) => {
      setMessages(prev => [...prev, { ...message, senderName: user.username, senderId: user.id }]);
    });

    
    socketRef.current.on('message:sent', ({ message }) => {
      setMessages(prev => [...prev, { ...message, senderName: 'You' }]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [token]);

  
  const openChat = (userId, username) => {
    setSelectedUserId(userId);
    setSelectedUsername(username);
    setIsChatOpen(true);
  };

  const sendMessage = () => {
    if (!input.trim() || !selectedUserId) return;

    socketRef.current.emit('admin:message', { userId: selectedUserId, text: input });
    setInput('');
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Chat Messages</h2>
      <div className="flex flex-col space-y-3 border rounded p-4 max-h-[600px] overflow-y-auto bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className="bg-white p-3 rounded shadow cursor-pointer hover:bg-gray-100"
            onClick={() => openChat(msg.senderId, msg.senderName)}
          >
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

      {/* ჩატის ფანჯარა */}
      {isChatOpen && (
        <div className="fixed bottom-4 right-4 w-80 bg-white shadow-lg rounded-lg flex flex-col border border-gray-300 z-50">
          <div className="bg-blue-600 text-white px-4 py-2 cursor-pointer select-none rounded-t-lg flex justify-between items-center">
            <span>Chat with {selectedUsername}</span>
            <button
              onClick={() => setIsChatOpen(false)}
              className="font-bold hover:text-gray-300"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div className="flex-grow p-3 overflow-y-auto max-h-64 space-y-2">
            {messages
              .filter(m => m.senderId === selectedUserId || m.senderName === 'You')
              .map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-lg max-w-[75%] ${
                    msg.senderName === 'You' ? 'bg-green-200 self-end' : 'bg-gray-200 self-start'
                  }`}
                >
                  <div className="text-sm font-semibold">{msg.senderName}</div>
                  <div>{msg.text || msg.message}</div>
                  <div className="text-xs text-gray-500 text-right">
                    {new Date(msg.createdAt || Date.now()).toLocaleTimeString()}
                  </div>
                </div>
              ))}
          </div>

          <div className="flex p-3 border-t border-gray-300">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Type your message..."
              className="flex-grow border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={sendMessage}
              className="ml-2 bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminChat;
