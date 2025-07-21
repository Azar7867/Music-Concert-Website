import express from 'express';
import { sendTicketEmail } from '../controllers/emailController.js';

const router = express.Router();
router.post('/send-ticket', sendTicketEmail);

export default router;
