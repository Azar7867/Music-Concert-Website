// // controllers/concertController.js
// import Concert from '../models/Concert.js';

// // GET all concerts
// export const getConcerts = async (req, res) => {
//   try {
//     const concerts = await Concert.find();
//     res.status(200).json(concerts);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching concerts', error });
//   }
// };

// // POST create new concert
// export const createConcert = async (req, res) => {
//   try {
//     const newConcert = new Concert(req.body);
//     const savedConcert = await newConcert.save();
//     res.status(201).json(savedConcert);
//   } catch (error) {
//     res.status(400).json({ message: 'Error creating concert', error });
//   }
// };

// // PUT update concert by ID
// export const updateConcert = async (req, res) => {
//   try {
//     const updatedConcert = await Concert.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!updatedConcert) {
//       return res.status(404).json({ message: 'Concert not found' });
//     }
//     res.status(200).json(updatedConcert);
//   } catch (error) {
//     res.status(400).json({ message: 'Error updating concert', error });
//   }
// };

// // DELETE concert by ID
// export const deleteConcert = async (req, res) => {
//   try {
//     const deletedConcert = await Concert.findByIdAndDelete(req.params.id);
//     if (!deletedConcert) {
//       return res.status(404).json({ message: 'Concert not found' });
//     }
//     res.status(200).json({ message: 'Concert deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting concert', error });
//   }
// };
// controllers/concertController.js
import Concert from "../models/Concert.js";

export const getConcerts = async (req, res) => {
  try {
    const concerts = await Concert.find();
    res.json(concerts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching concerts" });
  }
};

export const createConcert = async (req, res) => {
  try {
    const newConcert = new Concert(req.body);
    const saved = await newConcert.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Error creating concert" });
  }
};

export const updateConcert = async (req, res) => {
  try {
    const concert = await Concert.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!concert) return res.status(404).json({ message: "Concert not found" });
    res.json(concert);
  } catch (err) {
    res.status(400).json({ message: "Error updating concert" });
  }
};

export const deleteConcert = async (req, res) => {
  try {
    const deleted = await Concert.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Concert not found' });
    res.json({ message: 'Concert deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting concert' });
  }
};

