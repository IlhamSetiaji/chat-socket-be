import express from "express";
import { userRoutes } from "./interfaces/http/routes/user-routes";
import dotenv from "dotenv";
import { messageRoutes } from "./interfaces/http/routes/message-routes";
import amqp from 'amqplib';
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();
const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.json());
app.use("/users", userRoutes);
app.use("/messages", messageRoutes);

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

async function startConsumer() {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  const queue = "messages";

  await channel.assertQueue(queue, {
    durable: false,
  });

  channel.consume(queue, (msg) => {
    if (msg !== null) {
      const message = JSON.parse(msg.content.toString());
      io.to(`user_${message.receiverId}`).emit(process.env.SOCKET_QUEUE ?? "new_message", message);
      channel.ack(msg);
    }
  });
}

startConsumer().catch(console.error);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
