import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = 'https://ecommerce-kboc.onrender.com';

const Chat = ({ userId }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(true);
    const socketRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        
if (!token) {
  console.error("No token found");
} else {
  socketRef.current = io(SOCKET_URL, {
    auth: { token },
    transports: ['websocket'],
    autoConnect: false
  });
}

        socketRef.current.connect();

        socketRef.current.on('connect_error', (err) => {
            console.error('Socket connect error:', err.message);
        });

        socketRef.current.on('message:received', ({ message }) => {
            setMessages((prev) => [...prev, message]);
        });

        socketRef.current.on('message:sent', ({ message }) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    const sendMessage = () => {
        if (!input.trim()) return;
        socketRef.current.emit('user:message', { text: input });
        setInput('');
    };

    return (
        <div className="fixed bottom-4 right-4 w-80 bg-white shadow-lg rounded-lg flex flex-col border border-gray-300">
            <div
                className="bg-blue-600 text-white px-4 py-2 cursor-pointer select-none rounded-t-lg"
                onClick={() => setIsOpen(!isOpen)}
            >
                Support Chat {isOpen ? '▲' : '▼'}
            </div>
            {isOpen && (
                <>
                    <div className="flex-grow p-3 overflow-y-auto max-h-64 space-y-2 flex flex-col">
                        {messages.map((msg, i) => {
                            const isSender = String(msg.sender) === String(userId);
                            return (
                                <div
                                    key={i}
                                    className={`p-2 rounded-lg max-w-[75%] ${isSender ? 'bg-green-200 self-end' : 'bg-gray-200 self-start'
                                        }`}
                                >
                                    <div className="text-sm font-semibold">{isSender ? 'You' : 'Admin'}</div>
                                    <div>{msg.text || msg.message}</div>
                                    <div className="text-xs text-gray-500 text-right">
                                        {new Date(msg.createdAt || Date.now()).toLocaleTimeString()}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex p-3 border-t border-gray-300">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
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
                </>
            )}
        </div>
    );
};

export default Chat;
