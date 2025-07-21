import mongoose from 'mongoose';

const popularTamilConcertSchema = new mongoose.Schema({
  artist: String,
  venue: String,
  date: String,
  time: String,
  genre: String,
  location: String,
  price: mongoose.Schema.Types.Mixed,
  availableTickets: Number,
  image: String 
});

const PopularTamilConcert = mongoose.model('PopularTamilConcert', popularTamilConcertSchema);
export default PopularTamilConcert;
