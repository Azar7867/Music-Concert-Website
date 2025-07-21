import Concert1 from '../models/Concert1.js';

export const getConcerts1 = async (req, res) => {
  try {
    const concerts = await Concert1.find();
    res.json(concerts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching concerts' });
  }
};

export const getConcert1ById = async (req, res) => {
  try {
    const concert = await Concert1.findById(req.params.id);
    if (!concert) return res.status(404).json({ message: 'Concert not found' });
    res.json(concert);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching concert' });
  }
};

export const createConcert1 = async (req, res) => {
  try {
    const concertData = {
      ...req.body,
      image: req.file ? `/uploads/${req.file.filename}` : null 
    };

    const concert = new Concert1(concertData);
    await concert.save();

    res.status(201).json(concert);
  } catch (error) {
    res.status(400).json({ message: 'Error creating concert' });
  }
};

export const updateConcert1 = async (req, res) => {
  try {
    const updatedData = { ...req.body };
    if (req.file) updatedData.image = `/uploads/${req.file.filename}`;
    const updated = await Concert1.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updated) return res.status(404).json({ message: 'Concert not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Error updating concert' });
  }
};

export const deleteConcert1 = async (req, res) => {
  try {
    const deleted = await Concert1.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Concert not found' });
    res.json({ message: 'Concert deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting concert' });
  }
};
