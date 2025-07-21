import mongoose from 'mongoose';

const concert1Schema = new mongoose.Schema({
  artist: String,
  venue: String,
  date: String,
  time: String,
  genre: String,
  location: String,
  price: mongoose.Schema.Types.Mixed,
  availableTickets: Number,
  image: String
}, { timestamps: true });

const Concert1 = mongoose.model('Concert1', concert1Schema);
export default Concert1;
