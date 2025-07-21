// import Payment from '../models/Payment.js';

// export const getPendingPayments = async (req, res) => {
//   try {
//     const payments = await Payment.find({ status: 'pending' });
//     res.json(payments);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching pending payments' });
//   }
// };

// export const getPaidPayments = async (req, res) => {
//   try {
//     const payments = await Payment.find({ status: 'paid' });
//     res.json(payments);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching paid payments' });
//   }
// };

// export const getPaymentById = async (req, res) => {
//   try {
//     const payment = await Payment.findById(req.params.id);
//     if (!payment) return res.status(404).json({ message: "Payment not found" });
//     res.json(payment);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching payment" });
//   }
// };
// export const updatePaymentStatus = async (req, res) => {
//   const { status, method } = req.body;

//   try {
//     const updated = await Payment.findByIdAndUpdate(
//       req.params.id,
//       { status, method },
//       { new: true }
//     );
//     res.json(updated);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to update payment" });
//   }
// };


// export const createPayment = async (req, res) => {
//   try {
//     const newPayment = new Payment(req.body);
//     await newPayment.save();
//     res.status(201).json(newPayment);
//   } catch (error) {
//     res.status(400).json({ message: 'Error creating payment' });
//   }
// };

// // controllers/paymentController.js
// export const updatePayment = async (req, res) => {
//   try {
//     const { status, method } = req.body;
//     const updated = await Payment.findByIdAndUpdate(
//       req.params.id,
//       { status, method },
//       { new: true }
//     );
//     res.json(updated);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating payment" });
//   }
// };


// export const deletePayment = async (req, res) => {
//   try {
//     await Payment.findByIdAndDelete(req.params.id);
//     res.json({ message: "Payment deleted" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting payment" });
//   }
// };

// export const getPayments = async (req, res) => {
//   try {
//     const { status } = req.query;
//     const query = status ? { status } : {};
//     const payments = await Payment.find(query);
//     res.json(payments);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching payments" });
//   }
// };
// export const createBooking2 = async (req, res) => {
//   try {
//     const booking = new Booking2(req.body);
//     await booking.save();
//     res.status(201).json(booking);
//   } catch (error) {
//     res.status(400).json({ message: 'Error creating booking', error });
//   }
// };

import Payment from '../models/Payment.js';
export const getPayments = async (req, res) => {
  const { status, bookingId } = req.query;
  const filter = status ? { status } : bookingId ? { bookingId } : {};
  const payments = await Payment.find(filter);
  res.json(payments);
};
export const getPaymentById = async (req, res) => {
  const payment = await Payment.findById(req.params.id);
  res.json(payment);
};
export const createPayment = async (req, res) => {
  const payment = await Payment.create(req.body);
  res.status(201).json(payment);
};
export const updatePayment = async (req, res) => {
  const updated = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};
export const deletePayment = async (req, res) => {
  await Payment.findByIdAndDelete(req.params.id);
  res.status(204).end();
};