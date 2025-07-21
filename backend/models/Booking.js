// import mongoose from 'mongoose';

// const bookingSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   artist: String,
//   venue: String,
//   date: String,
//   time: String,
//   location: String,
//   seatType: String,
//   price: Number,
//   image: String // ✅ Added image field
// });

// const Booking = mongoose.model('Booking', bookingSchema);

// export default Booking;
import mongoose from 'mongoose';
const bookingSchema = new mongoose.Schema({
  artist: String,
  venue: String,
  date: String,
  time: String,
  location: String,
  price: Number,
  image: String,
  ticketCount: Number,
  totalPrice: Number
}, { timestamps: true });
export default mongoose.model('Booking', bookingSchema);