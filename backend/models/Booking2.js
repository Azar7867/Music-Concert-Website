// import mongoose from 'mongoose';

// const booking2Schema = new mongoose.Schema({
//   name: String,
//   email: String,
//   artist: String,
//   venue: String,
//   date: String,
//   time: String,
//   location: String,
//   seatType: String,
//   price: Number
// }, { timestamps: true });

// const Booking2 = mongoose.model('Booking2', booking2Schema);
// export default Booking2;
// import mongoose from 'mongoose';

// const booking2Schema = new mongoose.Schema({
//   name: String,
//   email: String,
//   artist: String,
//   venue: String,
//   date: String,
//   time: String,
//   location: String,
//   seatType: String,
//   price: Number
// }, { timestamps: true });

// const Booking2 = mongoose.model('Booking2', booking2Schema);
// export default Booking2;
// import mongoose from "mongoose";

// const booking2Schema = new mongoose.Schema({
//   name: String,
//   email: String,
//   artist: String,
//   venue: String,
//   date: String,
//   time: String,
//   location: String,
//   seatType: String,
//   totalPrice:Number,
//   price: {
//     type: Number,
//     required: true,
//     default: 0
//   }
// }, {
//   timestamps: true
// });

// const Booking2 = mongoose.model("Booking2", booking2Schema);
// export default Booking2;
import mongoose from "mongoose";

const booking2Schema = new mongoose.Schema({
  name: String,
  email: String,
  artist: String,
  venue: String,
  date: String,
  time: String,
  location: String,
  seatType: String,
  ticketCount: {
    type: Number,
    required: true,
    default: 1
  },
    
  totalPrice: Number,
  price: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  timestamps: true
});

const Booking2 = mongoose.model("Booking2", booking2Schema);
export default Booking2;

