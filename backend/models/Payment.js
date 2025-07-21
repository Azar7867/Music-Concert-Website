// import mongoose from 'mongoose';

// const paymentSchema = new mongoose.Schema({
//   name: String,
//   concert: String,
//   location: String,
//   venue: String, // ✅ Add this if missing
//   date: String,
//   time: String,
//   seat: String,
//   price: Number,
//   method: String,
//   status: {
//     type: String,
//     enum: ['pending', 'paid'],
//     default: 'pending'
//   }
// });


// const Payment = mongoose.model('Payment', paymentSchema);
// export default Payment;
import mongoose from 'mongoose';
const paymentSchema = new mongoose.Schema({
  concertTitle: String,
  venue: String,
  date: String,
  time: String,
  location: String,
  amount: Number,
  method: String,
  count: {
    type: Number,
    default: 1
  },
  status: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending'
  },
  bookingId: mongoose.Schema.Types.ObjectId
}, { timestamps: true });
export default mongoose.model('Payment', paymentSchema);
