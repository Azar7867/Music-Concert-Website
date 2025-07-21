// // // backend/seeder/importData.js

// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const fs = require('fs');
// const path = require('path'); // ✅ Correct path module

// // Load environment variables
// dotenv.config();

// // MongoDB connection
// const connectDB = require('../config/db');

// // Models
// const Concert = require('../models/Concert');
// const PopularConcert = require('../models/PopularTamilConcert');
// const ConcertDetails = require('../models/ConcertDetails');
// const User = require('../models/User');
// const Admin = require('../models/Admin');
// const Booking = require('../models/Booking');
// const Payment = require('../models/Payment');

// // Read data.json from the same folder
// const dataPath = path.join('C:/MusicBookingApp/backend/seeder', 'data.json'); // ✅ Uses __dirname
// const concertsData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// // Connect to MongoDB
// connectDB();

// const importData = async () => {
//   try {
//     await Concert.deleteMany();
//     await PopularConcert.deleteMany();
//     await ConcertDetails.deleteMany();
//     await User.deleteMany();
//     await Admin.deleteMany();
//     await Booking.deleteMany();
//     await Payment.deleteMany();

//     await Concert.insertMany(concertsData.concerts);
//     await PopularConcert.insertMany(concertsData.popularTamilConcerts);
//     await ConcertDetails.insertMany(concertsData.concertDetails);
//     await User.insertMany(concertsData.users);
//     await Admin.insertMany(concertsData.admins);
//     await Booking.insertMany(concertsData.bookings1); // You may use bookings2 as needed
//     await Payment.insertMany(concertsData.payments);

//     console.log('✅ Data Imported Successfully!');
//     process.exit();
//   } catch (error) {
//     console.error('❌ Import Failed:', error);
//     process.exit(1);
//   }
// };

// importData();
// backend/seeder/importData.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from '../config/db.js';
import Concert from '../models/Concert.js';
import Concert1 from '../models/Concert1.js';
import PopularConcert from '../models/PopularTamilConcert.js';
import ConcertDetails from '../models/ConcertDetails.js';
import User from '../models/User.js';
import Admin from '../models/Admin.js';
import Booking from '../models/Booking.js';
import Booking2 from '../models/Booking2.js';
import Payment from '../models/Payment.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const dataPath = path.join(__dirname, 'data.json');
const concertsData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

connectDB();

const importData = async () => {
  try {
    console.log('🧹 Clearing old data...');
    await Promise.all([
      Concert.deleteMany(),
      Concert1.deleteMany(),
      PopularConcert.deleteMany(),
      ConcertDetails.deleteMany(),
      User.deleteMany(),
      Admin.deleteMany(),
      Booking.deleteMany(),
      Booking2.deleteMany(),
      Payment.deleteMany()
    ]);

    console.log('📥 Importing new data...');
    await Promise.all([
      Concert.insertMany(concertsData.concerts),
      Concert1.insertMany(concertsData.concerts1),
      PopularConcert.insertMany(concertsData.popularTamilConcerts),
      ConcertDetails.insertMany(concertsData.concertDetails),
      User.insertMany(concertsData.users),
      Admin.insertMany(concertsData.admins),
      Booking.insertMany(concertsData.bookings1),
      Booking2.insertMany(concertsData.bookings2),
      Payment.insertMany(concertsData.payments)
    ]);

    console.log('✅ Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Import Failed:', error);
    process.exit(1);
  }
};

importData();

