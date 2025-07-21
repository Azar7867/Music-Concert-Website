import express from 'express';
import {
  getConcerts,
  createConcert,
  updateConcert,
  deleteConcert,
} from '../controllers/concertController.js';

const router = express.Router();

router.get("/", getConcerts);
router.post("/", createConcert);
router.put("/:id", updateConcert);
router.delete("/:id", deleteConcert);

export default router;
