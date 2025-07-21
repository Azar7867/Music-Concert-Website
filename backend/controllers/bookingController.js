// // controllers/bookingController.js
// import Booking from '../models/Booking.js';

// // Get all bookings
// export const getBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find();
//     res.json(bookings);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching bookings' });
//   }
// };

// // Create a new booking
// export const createBooking = async (req, res) => {
//   try {
//     const newBooking = new Booking(req.body);
//     await newBooking.save();
//     res.status(201).json(newBooking);
//   } catch (error) {
//     res.status(400).json({ message: 'Error creating booking' });
//   }
// };

// // Delete a booking
// export const deleteBooking = async (req, res) => {
//   try {
//     const booking = await Booking.findByIdAndDelete(req.params.id);
//     if (!booking) return res.status(404).json({ message: 'Booking not found' });
//     res.json({ message: 'Booking deleted' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting booking' });
//   }
// };
import Booking from '../models/Booking.js';
export const getBookings = async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
};
export const createBooking = async (req, res) => {
  try {
    const {
      artist,
      venue,
      date,
      time,
      location,
      price,
      image,
      ticketCount
    } = req.body;

    if (!artist || !venue || !date || !time || !location || !price || !ticketCount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const totalPrice = ticketCount * price;

    const newBooking = await Booking.create({
      artist,
      venue,
      date,
      time,
      location,
      price,
      image,
      ticketCount,
      totalPrice
    });

    res.status(201).json(newBooking);
  } catch (error) {
    console.error("Booking creation error:", error);
    res.status(500).json({ message: "Server error while creating booking" });
  }
};
export const deleteBooking = async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.status(204).end();
};