import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import testRoutes from './routes/testRoutes.js';
import contributorRoutes from './routes/contributorRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import cookieParser from 'cookie-parser';
import { Server as SocketIOServer } from 'socket.io';
import http from 'http';
import cors from 'cors';
import chatApp from './utilis/chatApp.js';

// Initialize dotenv to load environment variables
dotenv.config();

// Connect to the database
connectDb();

// Server port setup
const PORT = process.env.PORT || 5000;

// Initialize express app
const app = express();

// Middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ['https://final-project-kappa-dusky.vercel.app', 'http://localhost:3000'],
    credentials: true, // Allow cookies to be sent across domains
  })
);

// Define API routes
app.use('/api/users', userRoutes);
app.use('/api/test', testRoutes);
app.use('/api/contributor', contributorRoutes);
app.use('/api/notes', noteRoutes);

// Setup HTTP server and Socket.IO server with CORS configuration
const server = http.createServer(app);
export const io = new SocketIOServer(server, {
  cors: {
    origin: 'https://final-project-kappa-dusky.vercel.app', // No trailing slash
    credentials: true,
  },
});

// Initialize chat application functionality (if required)
chatApp(io);

// Start server
server.listen(PORT, () => {
  console.log(`App is running on PORT ${PORT}`);
});

export default app;
