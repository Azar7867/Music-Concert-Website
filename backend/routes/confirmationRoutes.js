import express from 'express';
const router = express.Router();

router.get('/', getConfirmation);

export default router;