import mongoose from 'mongoose';

const concertDetailSchema = new mongoose.Schema({
  artist: String,
  venue: String,
  location: String,
  date: String,
  time: String,
  genre: String,
  description: String,
  seatTypes: [
    {
      type: { type: String },
      price: Number
    }
  ]
});

const ConcertDetail = mongoose.model('ConcertDetail', concertDetailSchema);
export default ConcertDetail;
