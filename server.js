import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import testRoutes from './routes/testRoutes.js';
import ContributorRoutes from './routes/contributorRoutes.js';
import noteRoutes from './routes/NoteRoutes.js';
import cookieParser from 'cookie-parser';
import { Server as SocketIOServer } from 'socket.io';
import http from 'http';
import cors from 'cors';
import chatApp from './utilis/chatApp.js';

dotenv.config();
connectDb();

const PORT = process.env.PORT || 5000;
const app = express();

// CORS configuration
const corsOptions = {
  origin: "https://final-project-kappa-dusky.vercel.app",
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));  // Allow preflight for all routes

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/test', testRoutes);
app.use('/api/contributor', ContributorRoutes);
app.use('/api/notes', noteRoutes);

// HTTP and WebSocket server
const server = http.createServer(app);

// Setup Socket.IO with CORS
const io = new SocketIOServer(server, {
  cors: {
    origin: "https://final-project-kappa-dusky.vercel.app",
    credentials: true,
  },
});

// Pass the `io` instance to the chat app function if needed
chatApp(io);

// Start server
server.listen(PORT, () => {
  console.log(`App is running on PORT ${PORT}`);
});

// Export `io` for other modules
export { io };
export default app;
