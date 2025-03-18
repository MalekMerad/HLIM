module.exports = (io) => {
    let onlineUsers = []; 

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);
        onlineUsers.push(socket.id);

        // Send updated user list to all clients
        io.emit("online_users", onlineUsers);

        // Handle private messages
        socket.on("send_private_message", (data) => {
            console.log(`Private message from ${data.sender} to ${data.recipient}: ${data.message}`);

            // Send message only to the intended recipient
            io.to(data.recipient).emit("receive_message", data);
        });

        // Handle disconnection
        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
            onlineUsers = onlineUsers.filter((id) => id !== socket.id);
            
            // Update the user list for all clients
            io.emit("online_users", onlineUsers);
        });
    });
};
