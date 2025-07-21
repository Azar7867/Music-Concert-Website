import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Booking2 from '../models/Booking2.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://mohamedazardeen7867:Pass%40123@cluster0.mdxpbyv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('MongoDB connected!');
  } catch (err) {
    console.error('Connection failed:', err);
    process.exit(1);
  }
};

const fixBookings = async () => {
  try {
    const bookings = await Booking2.find();

    for (const booking of bookings) {
      let updated = false;

      if (!booking.venue || booking.venue === 'Venue Not Provided') {
        booking.venue = 'Madurai';
        updated = true;
      }
      if (!booking.time || booking.time === '7:00 PM') {
        booking.time = '19:00';
        updated = true;
      }
      if (!booking.price || booking.price === 0) {
        booking.price = 2000;
        updated = true;
      }

      if (updated) await booking.save();
    }

    console.log('✅ Booking2 data updated!');
    process.exit();
  } catch (error) {
    console.error('Error fixing bookings:', error);
    process.exit(1);
  }
};

// Run it
(async () => {
  await connectDB();
  await fixBookings();
})();
