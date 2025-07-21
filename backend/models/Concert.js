// import mongoose from 'mongoose';

// const concertSchema = new mongoose.Schema({
//   artist: String,
//   venue: String,
//   date: String,
//   time: String,
//   genre: String,
//   location: String,
//   ticketPrice: mongoose.Schema.Types.Mixed,
//   availableTickets: Number
// });

// const Concert = mongoose.model('Concert', concertSchema);
// export default Concert;
// models/Concert.js
import mongoose from 'mongoose';

const concertSchema = new mongoose.Schema({
  artist: String,
  venue: String,
  date: String,
  time: String,
  location: String,
  genre: String,
  price: mongoose.Schema.Types.Mixed,
  availableTickets: Number,
  image: String
});

const Concert = mongoose.model('Concert', concertSchema);
export default Concert;
