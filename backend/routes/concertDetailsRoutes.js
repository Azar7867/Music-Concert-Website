import express from 'express';
import { getConcertDetails } from '../controllers/concertDetailsController.js';
const router = express.Router();

router.get('/', getConcertDetails);

export default router;