// import express from 'express';
// import { createBooking2, getAllBookings2 ,deleteBooking} from '../controllers/booking2Controller.js';

// const router = express.Router();

// router.post('/', createBooking2);
// router.get('/', getAllBookings2);
// router.delete('/:id', deleteBooking);

// export default router;
// import express from 'express';
// import {
//   getAllBookings,
//   getBookingById,
//   createBooking,
//   updateBooking,
//   deleteBooking
// } from '../controllers/booking2Controller.js';

// const router = express.Router();

// router.get('/', getAllBookings);
// router.get('/:id', getBookingById);
// router.post('/', createBooking);
// router.put('/:id', updateBooking);
// router.delete('/:id', deleteBooking);

// export default router;
import express from 'express';
import { getBooking2, createBooking2, deleteBooking2 } from '../controllers/booking2Controller.js';
const router = express.Router();
router.get('/', getBooking2);
router.post('/', createBooking2);
router.delete('/:id', deleteBooking2);
export default router;
router.delete('/concert/:concertId', async (req, res) => {
  try {
    const result = await Booking2.deleteMany({ concertId: req.params.concertId });
    res.json({ message: "Related bookings deleted", count: result.deletedCount });
  } catch (error) {
    res.status(500).json({ message: "Error deleting related bookings", error });
  }
});
