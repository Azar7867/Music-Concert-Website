// import express from 'express';
// import { getPopularTamilConcerts } from '../controllers/popularTamilConcertController.js';
// const router = express.Router();

// router.get('/', getPopularTamilConcerts);

// export default router;
import express from 'express';
import multer from 'multer';
import {
  getPopularTamilConcerts,
  getPopularTamilConcertById,
  createPopularTamilConcert,
  updatePopularTamilConcert,
  deletePopularTamilConcert
} from '../controllers/popularTamilConcertController.js';

const router = express.Router();

// Multer config for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Routes
router.get('/', getPopularTamilConcerts);
router.get('/:id', getPopularTamilConcertById);
router.post('/', upload.single('image'), createPopularTamilConcert);
router.put('/:id', upload.single('image'), updatePopularTamilConcert);
router.delete('/:id', deletePopularTamilConcert);

export default router;
