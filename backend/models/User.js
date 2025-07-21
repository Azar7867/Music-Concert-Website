import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  venue: String,
  date: String,
  time: String
});

const User= mongoose.model('User', userSchema);
export default User;