// import Booking2 from '../models/Booking2.js';

// export const createBooking2 = async (req, res) => {
//   try {
//     const newBooking = new Booking2(req.body);
//     const savedBooking = await newBooking.save();
//     res.status(201).json(savedBooking);
//   } catch (error) {
//     res.status(400).json({ message: 'Error creating booking2', error });
//   }
// };

// export const getAllBookings2 = async (req, res) => {
//   try {
//     const bookings = await Booking2.find();
//     res.json(bookings);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching booking2 records' });
//   }
// };
// export const deleteBooking = async (req, res) => {
//   try {
//     const deleted = await Booking2.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ message: "Ticket not found" });
//     res.json({ message: "Ticket deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to delete ticket" });
//   }
// };

// import Booking2 from '../models/Booking2.js';

// // Get all bookings
// export const getAllBookings = async (req, res) => {
//   try {
//     const bookings = await Booking2.find();
//     res.json(bookings);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching bookings" });
//   }
// };

// // Get single booking
// export const getBookingById = async (req, res) => {
//   try {
//     const booking = await Booking2.findById(req.params.id);
//     if (!booking) return res.status(404).json({ message: "Booking not found" });
//     res.json(booking);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching booking" });
//   }
// };

// // Create booking
// export const createBooking = async (req, res) => {
//   try {
//     const newBooking = new Booking2(req.body);
//     await newBooking.save();
//     res.status(201).json(newBooking);
//   } catch (error) {
//     res.status(400).json({ message: "Error creating booking", error });
//   }
// };

// // Update booking
// export const updateBooking = async (req, res) => {
//   try {
//     const updated = await Booking2.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updated);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating booking" });
//   }
// };

// // Delete booking
// export const deleteBooking = async (req, res) => {
//   try {
//     await Booking2.findByIdAndDelete(req.params.id);
//     res.json({ message: "Booking deleted" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting booking" });
//   }
// };
import Booking2 from '../models/Booking2.js';
export const getBooking2 = async (req, res) => {
  const tickets = await Booking2.find();
  res.json(tickets);
};

export const createBooking2 = async (req, res) => {
  try {
    const {
      name,
      email,
      artist,
      venue,
      date,
      time,
      location,
      seatType,
      price,
      ticketCount,  
      totalPrice    
    } = req.body;

    if (!name || !email || !artist || !venue || !date || !time || !location || price === undefined) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const newBooking = await Booking2.create({
      name,
      email,
      artist,
      venue,
      date,
      time,
      location,
      seatType,
      price,
      ticketCount: ticketCount || 1,  
      totalPrice: totalPrice || price * (ticketCount || 1)  
    });

    res.status(201).json(newBooking);
  } catch (error) {
    console.error("Error creating booking2:", error);
    res.status(500).json({ message: "Server error creating booking." });
  }
};


export const deleteBooking2 = async (req, res) => {
  await Booking2.findByIdAndDelete(req.params.id);
  res.status(204).end();
};