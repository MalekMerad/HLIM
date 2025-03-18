import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { SendIcon } from 'lucide-react';
import '../styles/Chat.scss';

// Connect to the backend server
const socket = io.connect("http://localhost:5000");

function Chat() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [socketID, setSocketID] = useState(null);
    const [users, setUsers] = useState([]);
    const [recipient, setRecipient] = useState("");

    useEffect(() => {
        // Capture socket connection ID
        socket.on("connect", () => {
            setSocketID(socket.id);
            console.log("Connected with ID:", socket.id);
        });

        // Receive private messages
        socket.on("receive_message", (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        // Receive list of online users
        socket.on("online_users", (userList) => {
            setUsers(userList.filter((id) => id !== socket.id));
        });

        return () => {
            socket.off("connect");
            socket.off("receive_message");
            socket.off("online_users");
        };
    }, []);

    const sendMessages = () => {
        if (!socketID || !recipient) {
            console.error("Socket ID or recipient is not available yet");
            return;
        }

        const messageData = {
            message,
            sender: socketID,
            recipient
        };

        socket.emit("send_private_message", messageData);

        setMessages((prevMessages) => [...prevMessages, messageData]);
    };

    return (
        <div className='chat-main-container'>
            <h2>Chat</h2>
            <div>
                <label>Select recipient:</label>
                <select onChange={(e) => setRecipient(e.target.value)} value={recipient}>
                    <option value="">Select User</option>
                    {users.map((user) => (
                        <option key={user} value={user}>{user}</option>
                    ))}
                </select>
            </div>

            <div className='chat-container'>
                {messages.map((msg, index) => (
                    <p key={index} className={msg.sender === socketID ? "recv" : "send"}>
                        <strong>{msg.sender === socketID ? "You" : msg.sender}</strong>: {msg.message}
                    </p>
                ))}
            </div>

            
            <div className='snd-message-container'>
                <input placeholder='Enter your message' onChange={(e) => setMessage(e.target.value)} />
                <button onClick={sendMessages}><SendIcon size={20} /></button>
            </div>
        </div>
    );
}

export default Chat;
