import express from 'express';
import { getPopularTamilConcerts } from '../controllers/popularTamilConcertController.js';
const router = express.Router();

router.get('/', getPopularTamilConcerts);

export default router;