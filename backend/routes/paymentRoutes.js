// import express from 'express';
// import {
//   getPayments,
//   getPaymentById,
//   createPayment,
//   updatePayment,
//   deletePayment,
//   updatePaymentStatus
// } from '../controllers/paymentController.js';

// const router = express.Router();

// router.get("/", getPayments); // Handles /api/payments?status=pending ✅
// router.get("/:id", getPaymentById);
// router.post("/", createPayment);
// router.patch("/:id", updatePayment);
// router.delete("/:id", deletePayment);
// router.patch('/:id', updatePaymentStatus);


// export default router;
import express from 'express';
import {
  getPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment
} from '../controllers/paymentController.js';
const router = express.Router();
router.get('/', getPayments);
router.get('/:id', getPaymentById);
router.post('/', createPayment);
router.patch('/:id', updatePayment);
router.delete('/:id', deletePayment);
export default router;