// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import mongoose from 'mongoose';
// Import routes
import concertRoutes from "./routes/concertRoutes.js";
import popularTamilRoutes from "./routes/popularTamilRoutes.js";
import concertDetailsRoutes from "./routes/concertDetailsRoutes.js";
import adminRoutes from "./routes/adminsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import bookings2Routes from './routes/bookings2Routes.js';
import concerts1Routes from './routes/concerts1Routes.js';
import emailRoutes from './routes/emailRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json()); 

app.use("/api/concerts", concertRoutes);
app.use("/api/popular-tamil", popularTamilRoutes);
app.use("/api/concert-details", concertDetailsRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/users", userRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use('/api/bookings2', bookings2Routes);
app.use('/api/concerts1', concerts1Routes);
app.use('/api/email', emailRoutes);


const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
