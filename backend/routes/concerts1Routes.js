import express from 'express';
import {
  getConcerts1,
  getConcert1ById,
  updateConcert1,
  deleteConcert1
} from '../controllers/concert1Controller.js';
import upload from '../middleware/upload.js'; // 👈 this file
import { createConcert1 } from '../controllers/concert1Controller.js';
const router = express.Router();

router.get('/', getConcerts1);
router.get('/:id', getConcert1ById);
router.post('/', upload.single('image'), createConcert1); 
router.put('/:id', upload.single('image'), updateConcert1); 
router.delete('/:id', deleteConcert1);

export default router;
